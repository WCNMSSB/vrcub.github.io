import React from 'react';
import Layout from '@theme/Layout';
import {useLocation, useHistory} from '@docusaurus/router';
import Link from '@docusaurus/Link';

function QQJoinPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const qqId = params.get('QQID');

  return (
    <Layout
      title={`加入QQ群: ${qqId || ''}`}
      description={`请通过QQ搜索群号 ${qqId || ''} 加入群聊`}>
      <main style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', flexDirection: 'column'}}>
        {qqId ? (
          <h1>
            请通过QQ搜索群号 <span style={{color: 'var(--ifm-color-primary)'}}>{qqId}</span> 加入群聊
          </h1>
        ) : (
          <h1>
            请在URL中提供QQID参数，例如: /qq-join?QQID=123456
          </h1>
        )}
        <div style={{marginTop: '20px', display: 'flex', gap: '10px'}}>
          <Link className="button button--secondary button--lg" to="/">
            返回首页
          </Link>
          <button
            className="button button--secondary button--lg"
            onClick={() => window.history.back()}>
            返回上一页
          </button>
        </div>
      </main>
    </Layout>
  );
}

export default QQJoinPage;