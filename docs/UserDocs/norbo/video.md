---
id: 16
sidebar_position: 16
title: 16.播放器 VideoPlayer
sidebar_label: 16.播放器 VideoPlayer
---

import Link from '@docusaurus/Link';

# 播放器 VideoPlayer


:::warning 关于模组的配备
您如果还在使用老的客户端，你需要手动添加此模组

点击下方链接下载

（PS：遇到链接失效，请在群内 @dream_pep）
<Link className="button button--secondary button--lg" href="https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/all/CnP9b2Le9oa0bmxkIT6cB8BYnEe/?mount_node_token=ML1tdW9ywoFYYpxfWZlcK7oRnDc&mount_point=docx_file" style={{ height: 47, marginBottom: 20}}>
    下载 播放器 VideoPlayer 必要组件
</Link>
:::

## 有什么用？

VideoPlayer是松鼠为VRCub开发的视频播放Mod，允许玩在领地内创建属于自己的屏幕，并支持解析B站视频，直播源。
同时VideoPlayer还支持主屏幕和镜像屏幕两种模式，主屏幕可以播放视频内容，镜像屏幕则可以镜像指定主屏幕的画面。实现多屏效果。

## 玩家命令

1. 播放视频 - /vlc play （B站视频/B站直播链接）
2. 投票跳过当前视频 - /vlc skip 
3. 调整音量 - /vlc volume 0-100
4. 播放列表 - /vlc list
5. 重新加载 - /vlc sync

## 创建/删除屏幕区域

### 创建

只有进入指定的屏幕区域，才能显示出相应屏幕的画面，屏幕需要创建在屏幕区域内，删除区域也会同时删除屏幕
1. 和领地类似，首先你需要确认一个立方体区域的对角线坐标。建议用箭左键和右键查看坐标位置。
[图片]
2. 以步骤1为例，使用命令/vlc createArea 17 -52 12 0 -59 3 ktv1，创建一个名字叫ktv1的观影区域。
[图片]

### 删除

在屏幕区域内，输入 /vlc removeArea 区域名字 即可删除

## 创建/删除屏幕

屏幕是最终显示画面的区域，
1. 选择一个平面，按照逆时针的顺序记录屏幕四个角的的坐标。
2. 需要四个坐标而不是两个坐标是因为屏幕Mod支持斜向放置屏幕。

[图片]

[图片]

[图片]

3. 以上面截图为例，使用命令/vlc createScreen ktv1 ktv1_screen1 12 -53 12 12 -57 12 4 -57 12 4 -53 12 "" (注意最后的两个""也需要保留)
4. 注意镜像屏幕需要在观影区域内，如果你操作正确的话，此时屏幕应该已经创建完成
5. 屏幕创建后，可以使用 /vlc play B站视频/直播链接 进行播放，如果使用命令后没有看到视频或者无法播放，请尝试离开视频区域后重新进入

创建镜像屏幕
镜像屏幕需要连接到主屏幕上，简单来说你需要先创建一个主屏幕才能创建镜像屏幕，镜像屏幕会复制主屏幕的内容，实现多屏幕播放的效果。

[图片]

确定镜像屏幕的坐标后，可以使用 /vlc createScreen 区域名字 镜像屏幕名字 12 -53 12 12 -57 12 4 -57 12 4 -53 12 "主屏幕(源头)"来创建镜像屏幕，镜像屏幕会和连接的主屏幕画面保持一致。

:::info 例子
在ktv1区域中以屏幕ktv1_screen为源创建ktv1_mirrorscreen1的镜像屏幕
/vlc createScreen ktv1 ktv1_mirrorscreen1 12 -53 12 12 -57 12 4 -57 12 4 -53 12 "ktv1_screen"
删除
在屏幕区域内，输入 /vlc removeScreen 区域名字 即可删除
:::

## 设置默认视频

在屏幕区域内使用/vlc idleplay B站视频/B站直播链接命令，可以设置屏幕区域的默认视频，当屏幕没有视频播放的时候，播放默认视频。默认视频的进度不会和其他玩家同步。

## 强力牌子拓展

我们还为屏幕Mod增加了PowerSign菜单，在在屏幕区域创建一个牌子，

将第一行修改为[cinema]并点击完成。即可创建屏幕控制菜单。

右键创建成功的PowerSign即可调整音量，跳过视频和播放视频。
