import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

const SERVER_ADDRESS = 'play.vrcub.net';

function ServerStatusPage() {
  const [serverData, setServerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api.mcsrvstat.us/3/${SERVER_ADDRESS}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setServerData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch server status:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <Layout
      title={`服务器状态 - ${SERVER_ADDRESS}`}
      description={`查看Minecraft服务器 ${SERVER_ADDRESS} 的在线状态和玩家人数`}>
      <main style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column', padding: '20px'}}>
        <h1>VRCub正式服在线状态</h1>
        
        {loading && (
          <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', padding: '20px', border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: 'var(--ifm-global-radius)', boxShadow: 'var(--ifm-global-shadow-lw)'}}>
            <p style={{fontSize: '1.2em'}}>正在通过接口加载服务器数据...</p>
            {/* You can add a spinner icon here if you have one from a library */}
          </div>
        )}
        
        {error && (
          <div style={{padding: '20px', border: '1px solid var(--ifm-alert-border-color, var(--ifm-color-danger))', borderRadius: 'var(--ifm-global-radius)', backgroundColor: 'var(--ifm-alert-background-color, #f8d7da)', color: 'var(--ifm-alert-color, var(--ifm-color-danger-dark))', boxShadow: 'var(--ifm-global-shadow-lw)'}}>
            <h3 style={{color: 'var(--ifm-alert-heading-color, var(--ifm-color-danger-darker))'}}>获取服务器状态失败</h3>
            <p>{error}</p>
            <p>请稍后再试，可能服务器拒绝了访问。</p>
          </div>
        )}

        {serverData && (
          <div style={{width: '100%', maxWidth: '600px', padding: '20px', border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: 'var(--ifm-global-radius)', boxShadow: 'var(--ifm-global-shadow-md)', backgroundColor: 'var(--ifm-card-background-color)'}}>
            {serverData.online ? (
              <>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '15px'}}>
                  <span style={{fontSize: '2em', marginRight: '10px', color: 'var(--ifm-color-success)'}}>√</span>
                  <h2 style={{color: 'var(--ifm-color-success)', margin: 0}}>服务器稳定运行</h2>
                </div>
                <p><strong>在线玩家:</strong> {serverData.players.online} / {serverData.players.max}</p>
                {serverData.protocol && serverData.protocol.name && <p><strong>协议版本:</strong> {serverData.protocol.name} ({serverData.protocol.version})</p>}
              </>
            ) : (
              <div style={{display: 'flex', alignItems: 'center', marginBottom: '15px'}}>
                <span style={{fontSize: '2em', marginRight: '10px', color: 'var(--ifm-color-danger)'}}>❌</span>
                <h2 style={{color: 'var(--ifm-color-danger)', margin: 0}}>服务器掉线</h2>
              </div>
            )}
          </div>
        )}
      </main>
    </Layout>
  );
}

export default ServerStatusPage;