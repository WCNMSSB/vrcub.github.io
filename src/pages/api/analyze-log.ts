import type { NextApiRequest, NextApiResponse } from 'next';

const SILICONFLOW_API_ENDPOINT = 'https://api.siliconflow.cn/v1/chat/completions';

interface SiliconFlowMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface SiliconFlowRequestBody {
  model: string;
  messages: SiliconFlowMessage[];
  stream?: boolean;
  max_tokens?: number;
  // 根据硅基流动 API 文档，可以添加更多参数
  temperature?: number;
  top_p?: number;
}

// 假设硅基流动 API 的成功响应体结构
interface SiliconFlowChoice {
  index: number;
  message: SiliconFlowMessage;
  finish_reason: string;
}

interface SiliconFlowResponseUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

interface SiliconFlowResponseBody {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: SiliconFlowChoice[];
  usage: SiliconFlowResponseUsage;
  error?: {
    message: string;
    type: string;
    param: string | null;
    code: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const apiKey = process.env.SILICONFLOW_API_KEY;

  if (!apiKey) {
    console.error('SiliconFlow API key is not configured.');
    return res.status(500).json({ error: 'AI service API key not configured on the server.' });
  }

  const { logContent, geetestChallenge, geetestValidate, geetestSeccode } = req.body;

  if (!logContent) {
    return res.status(400).json({ error: 'logContent is required in the request body.' });
  }

  // TODO: 在此处集成极验服务端验证逻辑
  // 1. 从环境变量中获取您的极验 ID 和 KEY
  // const GEETEST_ID = process.env.GEETEST_ID;
  // const GEETEST_KEY = process.env.GEETEST_KEY;
  // 2. 调用极验的 SDK 进行验证
  // if (!geetestChallenge || !geetestValidate || !geetestSeccode) {
  //   return res.status(400).json({ error: 'Geetest validation parameters are missing.' });
  // }
  // const geetestValidated = await verifyGeetestCaptcha(GEETEST_ID, GEETEST_KEY, geetestChallenge, geetestValidate, geetestSeccode, req.ip);
  // if (!geetestValidated) {
  //   return res.status(403).json({ error: 'Geetest validation failed.' });
  // }

  const systemPrompt = `你是 Minecraft 技术支持专家。请分析以下 Minecraft 日志内容，并提供一份简洁的分析报告。报告应包括：

1.  **主要错误/问题**: 明确指出日志中反映的核心问题是什么（例如，NullPointerException, OutOfMemoryError, Ticking Entity, Mod冲突等）。
2.  **可能的原因**: 根据错误信息和上下文，推测导致该问题的常见原因。
3.  **建议的解决方案**: 提供针对性的解决步骤或排查方向。
4.  **涉及的关键信息**: (如果日志中包含)
    *   Minecraft 版本
    *   Forge/Fabric 版本
    *   Mod 列表 (特别是可能引起冲突的 Mod)
    *   Java 版本或参数

请以清晰、结构化的方式呈现分析结果。`;

  try {
    const requestBody: SiliconFlowRequestBody = {
      model: 'Qwen/Qwen2-7B-Instruct', // 您可以根据需要选择合适的模型，例如 Qwen/Qwen-32B
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `以下是日志内容：\n\n${logContent}` },
      ],
      stream: false,
      max_tokens: 1024, // 根据需要调整
      temperature: 0.7, // 根据需要调整
    };

    const aiResponse = await fetch(SILICONFLOW_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`, // 假设使用 Bearer Token 授权
      },
      body: JSON.stringify(requestBody),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error(`SiliconFlow API error: ${aiResponse.status} ${errorText}`);
      return res.status(aiResponse.status).json({ error: `AI service error: ${errorText}` });
    }

    const result: SiliconFlowResponseBody = await aiResponse.json();

    if (result.error) {
      console.error('SiliconFlow API returned an error:', result.error);
      return res.status(500).json({ error: `AI analysis failed: ${result.error.message || 'Unknown error from AI service'}` });
    }

    if (result.choices && result.choices.length > 0 && result.choices[0].message && result.choices[0].message.content) {
      return res.status(200).json({ analysis: result.choices[0].message.content });
    } else {
      console.error('Unexpected response structure from SiliconFlow API:', result);
      return res.status(500).json({ error: 'AI service returned an unexpected response structure.' });
    }

  } catch (error) {
    console.error('Error calling SiliconFlow API:', error);
    return res.status(500).json({ error: 'Internal server error while contacting AI service.' });
  }
}