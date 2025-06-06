---
sidebar_position: 2
title: 2.创建并管理领地
sidebar_label: 2.创建并管理领地
---

# 创建并管理领地

:::warning
**注意**：
这篇文档翻译自领地插件的官方wiki，可能版本不是最新的，建议前往官方wiki查看（需要很好的英语阅读能力，如果你开翻译器当我没说）
:::

## 前言:

创建一个领地是非常简单的，并且你还可以通过修改一些选项进行更多的配置。如果你浏览完以下内容后仍然无法理解，请前往SpigotMC帖内了解更多内容。

## 创建一个领地:

- 创建领地是非常简单的，你首先需要使用圈地工具(VRCub使用“箭”来圈地)选取两个点确定一块你想保护的区域。
- 或者你也可以通过使用指令 /res select [x] [y] [z] 选取区域。
- 如果你想将领地的高度扩大为天空至基岩(即无限高度), 输入 /res select vert 指令。
- 你也可以通过朝向你想扩张的方向并输入 /res select expand 指令进行扩张。
- 当你完成了所有设置时, 输入 /res create 指令创建你的领地。

## 参数说明:

- 「residence」 - 代表你想要编辑的领地的名称。
- 「player」 - 代表你想要操作的玩家的名称。
- 「group」 - 代表你想要操作的权限组的名称。
- 「flag」 - 代表你想要操作的标志(flag)的名称。
- 「true/false/remove」 - 可以设置为true或者false,改变一个flag的生效状态。False代表禁用, True代表启用。
    - True = 将会允许某个事件生效，比如如果fire标志为true,火焰就可以扩散。如果build标志为true,玩家就可以在领地上放置方块。
    - False = 将会禁止某个事件生效，比如如果pvp标志为false,玩家就不能互相攻击。
    - Remove = 将会将这个flag移除出领地或者玩家的设置。

### 标志说明:

- 以下是有关领地标志(flag)的一些介绍。
- 用棕色标记的条目仅适用于领地，不适用于玩家。
- 除非另有说明，所有的flag的默认值为true。
- 这里的flag不完整，请查看完整的flag列表
- 「admin」 - 允许或禁止玩家在为领地设置flag。 True =允许，false =不允许。默认为false。该flag仅适用于玩家。
- 「animals」 - 允许或禁止动物生成。 True =允许生成，false =禁止生成。也包括外部命令，例如/spawnmob。动物包括：鸡，牛，猪，羊，狼，兔，马。
- 「animalkilling」 - 允许或禁止玩家杀死动物。
- 「brew」 - 允许或禁止玩家使用酿造台。
- 「bed」 - 允许或禁止玩家使用床。
- 「button」 - 允许或禁止玩家使用按钮。
- 「burn」 - 允许或禁止领地中的怪物燃烧。
- 「build」 - 控制建筑权限(放置和破坏方块)，也可以防止践踏农作物。True =允许建筑，false =禁止建筑。
- 「cake」 - 允许或禁止玩家吃蛋糕。
- 「craft」 - 提供:table, enchant, brew权限.
- 「container」 - 控制使用任何与GUI界面有关的物品的能力，包括：箱子，发射器，熔炉，还有唱片机。 True =允许使用，false =禁止使用。
- 「creeper」 - 控制苦力怕爆炸。True=苦力怕爆炸并且会破坏地形，False=苦力怕不会对玩家或方块造成伤害。不会阻止苦力怕生成。
- 「damage」 - 控制领地中对玩家造成的任何伤害。True =正常伤害，false =防止伤害。
- 「destroy」 - 允许或禁止破坏方块，会覆盖build标志。
- 「diode」 - 允许或禁止玩家使用红石中继器。
- 「door」 - 允许或禁止玩家使用门和活板门。
- 「enchant」 - 允许或禁止玩家附魔。
- 「firespread」 - 允许或禁止火焰蔓延。True=允许火焰蔓延，False=禁止火焰蔓延。
- 「flow」 - 允许或禁止液体流动。 True =允许，false =禁止。
- 「healing」 - 控制区域是否自动治愈玩家。 True =每秒回复半点血量，False=正常服务器规则。
- 「hiden」 - 从 /list 或 /listall 指令中隐藏该领地。
- 「ignite」 - 允许或禁止点火。True=允许点火，False=防止点火。
- 「lavaflow」 - 允许或禁止熔浆流动，覆盖flow标志。
- 「leash」 - 允许或禁止拴绳。
- 「lever」 - 允许或禁止玩家使用拉杆。
- 「monsters」 - 控制怪物生成。 True =允许生成，false =防止生成。包括外部命令，例如/spawnmob。怪物包括：苦力怕，巨人，骷髅，蜘蛛，僵尸(猪人)。
- 「mobkilling」 - 允许或禁止杀死怪物。
- 「move」 - 控制玩家或权限组是否可以在领地内移动。 True =允许移动，false =禁止移动。
- 「note」 - 允许或禁止玩家使用音符盒。
- 「nofly」 - 允许或禁止在领地内飞行。覆盖residence.fly.override权限节点。
- 「place」 - 允许或禁止方块的放置，覆盖build标志。
- 「piston」 - 允许或禁止使用活塞。 True =允许使用，false =禁止活塞移动。不控制放置或破坏活塞。
- 「pvp」 - 控制PVP。 True =允许PVP，false =玩家不能攻击其他玩家或驯服的狼。
- 「pressure」 - 允许或禁止玩家使用压力板。
- 「redstone」 - 提供lever, diode, button, pressure, note权限。
- 「subzone」 - 允许或禁止创建子领地。 True =允许，false =不允许。默认为false。
- 「shear」 - 允许或禁止剪羊毛。
- 「tnt」 - 控制TNT爆炸。True= TNT会爆炸且会破坏方块，False= TNT不会对玩家或方块造成伤害。不阻止TNT放置或破坏。
- 「trusted」 - 将玩家添加至领地的信任列表并提供以下权限：use，tp，build，container，bucket，move，leash，animalkilling，mobkilling，shear。
- 「tp」 - 控制领地中的传送。 True =允许传送，false =阻止传送。
- 「use」 - 控制在领地中使用对物品的权限。 True =正常服务器规则，False =拒绝使用。包括门，箱子，熔炉，发射器，拉杆等。如果为True，覆盖container标志。
- 「vehicledestroy」 - 允许或禁止破坏载具。
- 「waterflow」 - 允许或禁止水流，覆盖flow标志。
- 「command」 - 允许或禁止在领地中使用指令。
- 「nomobs」 - 禁止怪物进入领地。

### 为你的领地设置标志(flags):

- 你可以为你创建的领地添加若干个标志来保护它。

## 领地标志

使用以下指令为你的领地设置标志:

**/res set 「true/false」**

**例子:**

**/res set area1 build false** - 这将会禁止除拥有者以外的其他玩家在领地 'area1'上建筑。

**/res set area1 move false** - 这将会禁止除拥有者以外的其他玩家在领地 'area1'上移动。

## 权限组标志

如果你想为一个权限组添加标志,使用以下指令:

**/res gset 「true/false」**

**例子:**

/res gset area1 ops move true - 这将会允许所有OP在领地 'area1'上移动, 也包括领地的拥有者。

## 玩家标志

一些标志同样适用于玩家。 你可以使用pset指令为玩家设置标志权限.

/res pset 「true/false」

**例子:**

**/res pset area1 danjames build true** 这个指令意味着即使领地的权限设置BUILD标志为FALSE，玩家danjames也能够在领地上建筑。当玩家试图在领地内做某事时，他们的玩家标志会首先被检查，如果没有找到，则检查权限组标志，最后检查最终标志。

如果你拥有residence.admin权限节点，你将可以绕过任何标志。（但这不可能拥有，这是沈权，我们碰不到）

