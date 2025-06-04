---
id: 2
sidebar_position: 2
sidebar_label: 2.领地命令的使用
---

# 第二节：领地命令的使用

#### 领地的神奇力量

:::info

  本服选点工具为“箭”，分别用其左键右键方块选择第一个第二个点形成空间长方体，再结合以下命令即可画出领地

:::

### 总命令

/res ? [页数] – 显示帮助，不写页数则显示第一页.

/resadmin – 在使用管理命令时使用

---

### 选择命令

/res select [x] [y] [z] – 选择领地的长方体区域，X Y 和Z 都是从你当前位置为中心的距离，你也可以用一个工具（默认是木斧）来选择地块。

/res select chunk – 选取一整个chunk。

/res select expand [格数] – 向你的前方延伸选区。

/res select size – 显示已选择区域的尺寸。

/res select shift [格数] – 向你的前方移动选区。

/res select vert – 把选区延伸到从天顶到地底。

---

### 创建命令

/res area [add/remove/replace] 领地名 [区域id] – 向叫做[领地名]的领地增加(add)、从其中去除(remove)或是替换 (replace) 区域。可与同一领地内的区域重合。

/res create [领地名] – 选择好区域后创建一个叫做[领地名]的领地

/res remove [领地名] – 移除一个叫[领地名]的领地

/res removeall – 移除所有领地

/res subzone 领地名 [子区域名] – 在领地内创建一块子区域，你必须是所有者才行。

---

### 信息命令

/res area list [领地名] – 列出某领地的所有区域

/res area listall [领地名] – 列出某领地的所有区域以及他们的坐标

/res current – 显示你所在的领地

/res info 领地名 – 得到某领地的信息

/res list – 显示你拥有的领地

/res listall – 显示所有领地

/res limits – 显示重要的权限

/res sublist – 显示你所在领地的所有子区域

/res version – 显示插件版本

---

### 权限命令

/res gset 领地名 [群组名] [权限] [true/false/remove] – 设置某领地对于某群组的权限

/res lset 领地名 [黑名单/忽略名单] [材质] – 从某领地的黑名单/忽略名单中增加/移除某材质

/res lset 领地名 info – 显示某领地的黑名单/忽略名单设置

/res pset 领地名 [玩家名] [权限] [true/false/remove] – 设置某领地对于某玩家的权限

/res set 领地名 [权限] [true/false/remove] – 设置某领地的权限

---

### 其他命令

/res default [领地名] – 重置某领地的权限设置

/res give [领地名] [玩家名] – 将某领地赠与某玩家，你必须是领主且被赠予玩家在线

/res lists – 预定领地许可清单的详细信息

/res message [领地名] [enter/leave] [信息] – 设置进入/退出某领地时候显示的信息

/res message [领地名] remove [enter/leave] – 移除进入/退出某领地时候的信息

/res mirror [源领地名] [目标领地名] – 复制源领地的权限设置至目标领地

/res rename – [旧名称] [新名称] 重命名领地.对于子空间旧名称必须全名，新名称可以只写子空间名

/res renamearea [领地名] [旧名称] [新名称] – 重命名某领地中某区域的名称

/res tp [领地名] – 传送至某领地

/res tpset – 设置当前领地的传送点为你站立的地方

/res unstuck – 将你从当前领地移出

---

### 交易命令

/res lease [renew/cost] [领地名] – 更新/显示 更新一个领地的费用（？意义不明）

/res market list – 显示在售的所有领地

/res market info [领地名] – 显示在售的某领地的信息

/res market sell [领地名] [价格] – 将某领地出售

/res market unsell [领地名] – 将某领地下架

/res market buy [领地名] 购买某领地

/res market rentable [领地名] [价格] [天数] [repeat:t/f](repeat:t/f) – 将某领地以[价格]/[天数]出租并设置可否自动续期

/res market rent [领地名] [repeat:t/f](repeat:t/f) – 设置某领地出租手否可自动续期

/res market release [领地名] – 解除某领地的出租

---

### 管理命令

/resadmin lease set [领地名] [#天数/infinite] – 设置领地的时间限制或不限时

/resadmin removeall [玩家名] – 移除某玩家的所有领地

/resadmin setowner [领地名] [玩家名] – 将某领地以交给某玩家

/resadmin server [领地名] – 将某领地设置为服务器领地

/resload – 载入领地插件. *注* 在res.yml的任何改变都不会被还原. 你可以再更改过res.yml后想立即将新设置生效的时候使用此命令

/rereload – 重载领地插件. *注* 将会还原res.yml为初始状态. 如果你在res.yml更改过设置请不要使用此命令

注：以上命令不写领地名则为当前所在的领地

---

### 权限表：

admin：领地的全权管理权限，仅能给与某玩家

container：是否能使用箱子，发射器等

bucket：设置是否能使用桶

ignite：点火的权限

piston：活塞是否能使用

build：建造权限（包括destroy和place）

destroy：毁坏权限

place：放置权限

move：进入权限

tp：传送权限

use：使用权限（工作台，炉子等）

subzone：是否能设置子空间

tnt：设置tnt是否有效

creeper：设置JJ怪是否有效（设置F的话JJ怪就废了）

damage：设置领地内是否能造成伤害（不能防止被挤死）

monsters：设置是否刷新怪物

animals：设置是否刷新动物

firespread：火是否能蔓延

flow：液体流动，包括waterflow和lavaflow

waterflow：水的流动

lavaflow：岩浆流动

healing：设置是否能恢复生命

pvp：设置是否能pvp