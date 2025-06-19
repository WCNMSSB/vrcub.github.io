import React from 'react';
import Layout from '@theme/Layout';
import LogAnalyzer from '@site/src/components/LogAnalyzer';

export default function LogAnalyzerPage(): JSX.Element {
  return (
    <Layout
      title="日志分析器"
      description="本地 Minecraft 崩溃日志分析工具">
      <LogAnalyzer />
    </Layout>
  );
}