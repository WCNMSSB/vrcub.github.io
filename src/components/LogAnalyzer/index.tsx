import React, { useState, useCallback, useEffect, useRef } from 'react';
import Head from '@docusaurus/Head'; // 虽然在这个组件中可能不是直接用，但保留以防未来需要或Docusaurus特定功能
import useIsBrowser from '@docusaurus/useIsBrowser';
import styles from './styles.module.css';

export default function LogAnalyzer(): JSX.Element {
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string>('');
  const [isAiAnalyzing, setIsAiAnalyzing] = useState<boolean>(false);
  const [aiAnalysisError, setAiAnalysisError] = useState<string>('');
  const [logContent, setLogContent] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [isGeetestReady, setIsGeetestReady] = useState(false);
  const geetestCaptchaRef = useRef(null); // 用于挂载极验验证码的DOM元素
  const isBrowser = useIsBrowser();

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setLogContent(text);
        analyzeLog(text);
      };
      reader.readAsText(file);
    }
  }, []);

  const analyzeLog = (log: string) => {
    // 在这里实现本地日志分析逻辑
    // 这是一个非常基础的示例，你可以根据需要扩展它
    let result = "分析结果:\n";
    if (log.includes("java.lang.NullPointerException")) {
      result += "- 检测到空指针异常 (NullPointerException)。这通常意味着代码试图使用一个未初始化或不存在的对象。\n";
    }
    if (log.includes("OutOfMemoryError")) {
      result += "- 检测到内存不足错误 (OutOfMemoryError)。尝试分配更多的内存给 Minecraft。\n";
    }
    if (log.includes("Failed to connect to the server")) {
      result += "- 检测到连接服务器失败。请检查你的网络连接和服务器地址是否正确。\n";
    }
    if (log.includes("ModLoadingException")) {
      result += "- 检测到 Mod 加载异常 (ModLoadingException)。可能是一个或多个 Mod 不兼容或损坏。\n";
    }
    if (log.includes("crashed while rendering overlay")) {
      result += "- 检测到渲染覆盖层时崩溃。这可能与 OptiFine 或其他渲染相关的 Mod 有关。\n";
    }

    if (result === "分析结果:\n") {
      result = "未在日志中检测到明确的常见错误模式。请尝试搜索特定的错误信息。";
    }

    setAnalysisResult(result);
  };

  const handleAiAnalyze = async () => {
    if (!logContent) {
      setAiAnalysisError('没有日志内容可供AI分析。');
      return;
    }
    setIsAiAnalyzing(true);
    setAiAnalysisResult('');
    setAiAnalysisError('');

    if (isBrowser && !(window as any).initGeetest) {
      setAiAnalysisError('人机验证组件加载失败，请刷新页面或检查网络。');
      setIsAiAnalyzing(false);
      return;
    }

    // 关键：确保环境变量已定义，否则提示用户配置
    let geetestId: string | undefined = undefined;
    if (typeof process !== 'undefined' && process.env) {
      geetestId = process.env.DOCUSAURUS_GEETEST_ID || process.env.NEXT_PUBLIC_GEETEST_ID;
    }

    if (isBrowser && !geetestId) {
        console.error('Geetest ID is not configured. Please ensure DOCUSAURUS_GEETEST_ID (recommended for Docusaurus) or NEXT_PUBLIC_GEETEST_ID is set in your .env file (e.g., .env.local) and the development server has been restarted.');
        setAiAnalysisError('人机验证服务服务失效，请联系管理员');
        setIsAiAnalyzing(false);
        return;
    }

    if (isBrowser && (window as any).initGeetest) {
      setIsAiAnalyzing(true); // 开始分析过程，显示加载状态
      // @ts-ignore
      (window as any).initGeetest({
        gt: geetestId, 
        // challenge: '', // challenge 由后端API在预处理时生成并返回给前端，这里暂时留空或由后端处理
        offline: false,
        new_captcha: true,
        lang: 'zh-cn',
        product: 'popup', // 使用popup模式
        width: '300px',
        // 对于popup模式，不需要appendTo，它会自动处理
      }, function (captchaObj) {
        // @ts-ignore
        geetestCaptchaRef.current = captchaObj;
        // @ts-ignore
        captchaObj.onReady(function () {
          // @ts-ignore
          captchaObj.verify(); // 显示验证码
        });
        // @ts-ignore
        captchaObj.onSuccess(async function () {
          // @ts-ignore
          const result = captchaObj.getValidate();
          // 验证成功后，才真正调用AI分析接口
          await fetchAiAnalysis(logContent, result.geetest_challenge, result.geetest_validate, result.geetest_seccode);
        });
        // @ts-ignore
        captchaObj.onError(function (error) {
          console.error('Geetest error:', error);
          setAiAnalysisError('人机验证过程中发生错误，请重试。');
          setIsAiAnalyzing(false);
        });
        // @ts-ignore
        captchaObj.onClose(function() {
          // 用户关闭了验证码，也应该停止AI分析状态
          if (isAiAnalyzing) { // 仅当之前是分析中状态时才重置
             setIsAiAnalyzing(false);
          }
        });
      });
    } else if (!isBrowser) {
        setAiAnalysisError('人机验证只能在浏览器环境中使用。');
        setIsAiAnalyzing(false);
    } else {
        // Fallback or error if Geetest is not available for some reason
        console.warn('Geetest not available. Proceeding without human verification (NOT FOR PRODUCTION).');
        fetchAiAnalysis(logContent); // 开发时可以暂时跳过，生产环境必须验证
    }
  };

  const fetchAiAnalysis = async (currentLogContent: string, geetest_challenge?: string, geetest_validate?: string, geetest_seccode?: string) => {
    // setIsAiAnalyzing(true); // 移到 handleAiAnalyze 开始处，确保验证码弹出时也是loading状态
    setAiAnalysisResult('');
    setAiAnalysisError('');
    try {
      const response = await fetch('/api/analyze-log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          logContent: currentLogContent, // 使用传入的日志内容
          geetestChallenge: geetest_challenge,
          geetestValidate: geetest_validate,
          geetestSeccode: geetest_seccode,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `AI分析服务错误: ${response.status}`);
      }
      const data = await response.json();
      setAiAnalysisResult(data.analysis || 'AI未能提供分析结果。');
    } catch (error) {
      setAiAnalysisError(error.message || '请求AI分析时发生未知错误。');
    } finally {
      setIsAiAnalyzing(false);
    }
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setLogContent(text);
        analyzeLog(text);
      };
      reader.readAsText(file);
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  useEffect(() => {
    if (isBrowser) {
      // 检查脚本是否已加载，避免重复加载
      if (!document.querySelector('script[src="https://static.geetest.com/static/tools/gt.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://static.geetest.com/static/tools/gt.js';
        script.async = true;
        script.onload = () => {
          // console.log('Geetest script loaded.');
          // 脚本加载后，可以设置一个状态，但实际初始化在点击按钮时
        };
        script.onerror = () => {
          console.error('Failed to load Geetest script.');
          // 可以在这里设置一个错误状态，提示用户检查网络或刷新
        };
        document.head.appendChild(script);

        // 清理函数：组件卸载时移除脚本
        return () => {
          const existingScript = document.querySelector('script[src="https://static.geetest.com/static/tools/gt.js"]');
          if (existingScript) {
            document.head.removeChild(existingScript);
          }
        };
      }
    }
  }, [isBrowser]);

  return (
    <div className={styles.container}>
      <h1>Minecraft 日志分析器</h1>
      <p>分析您的 Minecraft 崩溃日志。我们不会将您的日志上传到任何服务器。（使用ai除外）</p>
      <div className={`${styles.analysisResultItem} ${styles.errorResult}`}>
         <p><strong>注意：</strong>本分析器处于BETA状态，可能会出现错误，同时因为其性能问题，只能做简单参考</p>
      </div>
      
      <div 
        className={styles.dropZone}
        onClick={() => document.getElementById('fileInput')?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver} // 使用相同的处理函数来简化
      >
        <input 
          type="file" 
          id="fileInput"
          accept=".log,.txt,.zip" 
          onChange={handleFileChange} 
          style={{ display: 'none' }} 
        />
        {fileName ? (
          <p>已选择文件: {fileName}</p>
        ) : (
          <p>点击此处选择或拖拽 .log, .txt, 或 .zip 文件到这里</p>
        )}
      </div>

      {logContent && (
        <div className={styles.logPreviewContainer}>
          <h2>日志预览 (前5000字符):</h2>
          <pre className={styles.logPreview}>{logContent.substring(0, 5000)}</pre>
        </div>
      )}

      {analysisResult && (
        <div className={styles.analysisResultContainer}>
          <h2>本地分析结果:</h2>
          <pre className={styles.analysisResult}>{analysisResult}</pre>
          {/* 极验验证码容器，可以根据需要调整位置和样式 */} 
          <div id="geetest-captcha-container" style={{ marginBottom: '20px', display: isAiAnalyzing && !(geetestCaptchaRef.current && (geetestCaptchaRef.current as any).visible) ? 'block' : 'none' }}></div>
          {/* AI分析按钮和结果展示区 */}
          <div className={styles.aiAnalysisSection}>
            <button 
              onClick={handleAiAnalyze} 
              disabled={isAiAnalyzing || !logContent}
              className={styles.aiButton}
            >
              {isAiAnalyzing ? 'AI分析中...' : '使用 AI 介入分析'}
            </button>
            {isAiAnalyzing && <div className={styles.loader}></div>}
            {aiAnalysisError && (
              <div className={`${styles.analysisResultItem} ${styles.errorResult}`}>
                <p><strong>AI 分析错误:</strong> {aiAnalysisError}</p>
              </div>
            )}
            {aiAnalysisResult && (
              <div className={styles.analysisResultItem}>
                <h3>AI 分析结果:</h3>
                <pre className={styles.aiAnalysisContent}>{aiAnalysisResult}</pre>
              </div>
            )}
          </div>
        </div>
      )}
      {/* 如果本地分析没有结果，也允许AI分析 */} 
      {!analysisResult && logContent && (
         <div className={styles.aiAnalysisSectionOnly}>
            <button 
              onClick={handleAiAnalyze} 
              disabled={isAiAnalyzing || !logContent}
              className={styles.aiButton}
            >
              {isAiAnalyzing ? 'AI分析中...' : '使用 AI 介入日志'}
            </button>
            {isAiAnalyzing && <div className={styles.loader}></div>}
            {aiAnalysisError && (
              <div className={`${styles.analysisResultItem} ${styles.errorResult}`}>
                <p><strong>AI 分析错误:</strong> {aiAnalysisError}</p>
              </div>
            )}
            {aiAnalysisResult && (
              <div className={styles.analysisResultItem}>
                <h3>AI 分析结果:</h3>
                <pre className={styles.aiAnalysisContent}>{aiAnalysisResult}</pre>
              </div>
            )}
          </div>
      )}
    </div>
  );
}