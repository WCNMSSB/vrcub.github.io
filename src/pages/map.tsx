import React from 'react';

const MinecraftMapPage = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <iframe
        src="http://account.vrcub.net/"
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="VRCub Minecraft 在线地图"
        allowFullScreen
      />
    </div>
  );
};

export default MinecraftMapPage;