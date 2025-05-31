import React from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './about.module.css';

export default function About() {
  const [hostMessage, setHostMessage] = React.useState('');

  React.useEffect(() => {
    const hostname = window.location.hostname;
    
    if (hostname === 'docs.vrcub.net') {
      setHostMessage('你访问的是GithubPage站点，在国内可能无法打开');
    } else if (hostname === 'vrcub.dream-pep.cn') {
      setHostMessage('你访问的是国内加速站，由dream_pep提供加速支持');
    } else if (hostname === 'localhost') {
      setHostMessage('您正在本地运行，请切换为正式版本');
    } else {
      setHostMessage('您正在访问的网站不在信用列表内，请尝试使用官方链接访问');
    }
  }, []);

  return (
    <Layout title="关于" description="关于VRCub文档">
      <main className={styles.container}>
        <div className={clsx(styles.content, 'shadow--md')}>
          <h1 className={styles.title}>关于VRCub文档</h1>
          
          <div className={styles.card}>
            <p className={styles.description}>本文档使用Docusaurus构建，由VRCub文档编辑部专业维护与技术支持</p>
            <div className={styles.logoContainer}>
              <img 
                src="/vrcub-logo/VRCub-black@svg.svg" 
                alt="VRCub Logo" 
                className={styles.logo}
              />
            </div>
          </div>
          
          {hostMessage && (
            <div className={clsx(styles.alert, 'alert alert--warning')}>
              <p className={styles.alertText}>{hostMessage}</p>
            </div>
          )}
          
          <div className={styles.opensource}>
            <h2 className={styles.subtitle}>使用的开源技术</h2>
            <ul className={styles.techList}>
              <li>Docusaurus - 现代化的文档网站生成器</li>
              <li>React - 用于构建用户界面的JavaScript库</li>
              <li>TypeScript - JavaScript的超集</li>
              <li>MDX - 支持JSX的Markdown扩展</li>
            </ul>
          </div>
        </div>
      </main>
    </Layout>
  );
}