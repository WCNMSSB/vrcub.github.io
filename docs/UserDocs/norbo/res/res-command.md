---
sidebar_position: 1
title: 1.领地的基础指令
sidebar_label: 1.领地的基础指令
---

# 领地的基础指令

完整命令列表和有关命令用法的说明如下所述。 [ ] 括号表示要提供的附加参数. 不要包括括号本身（例如我想创建一个领地要输入/res create [领地名],我需要输入的是/res create 2333 而不是/res create [2333]) 如果想要以管理身份使用指令, 输入 **/resadmin** 而不是 **/res**

## **基本指令**

**/res ?** [*页数*] - 显示帮助. 输入页数来换页. 默认从第一页开始.

**/resadmin** - 当你想用管理员权限来使用领地插件，你随时都可以使用这个指令来替换/res。

## **选择指令**

**/res select** [*x y z*] - 选择要保护的长方体区域，使用选择工具（默认为木斧）或指定由你站着的位置的X，Y和Z点作为距中心点的区域选择。栗子: **/res select 10 5 10** 将会选择一个 宽21 x 高11 x 长21 的领地，也就说是说两倍你的选择的xyz点，再加上你现在站着的那一格，所以就是10x2+1 5x2+1 10x2+1,也就是 21x11x21的大小。

**/res select chunk** - 选择整个区块进行保护。

**/res select auto** - 启动自动选择过程。

**/res select expand** [*amount*] - 按照您的朝向来选择

**/res select size** - 显示已选择区域的价值

**/res select shift** [*amount*] - 向您的朝向移动您的区域

**/res select vert** - 将选择范围从天空扩展到基岩。

**/res select sky** - 将选择范围扩展到天空。

**/res select bedrock** - 扩展基岩的选择。

**/res select worldedit** - 使用WorldEdit来选择区域

**/res select coords** - 显示选定的坐标。

**/res select residence** - 选择您目前所在的领地

## **创建指令**

**/res create** [*领地名*] - 创建一个领地。使用选择工具或/res选择[x y z]指令来选择起始[x y z]点和结束[x y z]点后使用。

**/res area** [*add*/*remove*/*replace*] [*areaID*] - 添加或删除领地区域。这些可以与同一个领地区域重叠。

**/res auto** [*ResidenceName*] [*radius*] - 使用groups.yml文件中的最大允许设置创建领地，MaxEastWest，MaxNorthSouth，MaxUpDown和MaxHeight所设置的值来作为住宅的大小。

**/res remove** [*ResidenceName*] - 按名称来删除领地.

**/res removeall** -删除你所有的领地.

**/res setmain** [*ResidenceName*] - 将领地设置为聊天的前缀，表明您的主要领地。注意。应在** Optimizations - > GlobalChat - > Enabled **部分的配置文件中来启用此功能。

**/res subzone** [*SubZoneName*] - 为您的领地创建一个子领地，您必须是领地的所有者才可以执行此操作。

## **信息指令**

**/res area list** [*residence*] - 列出领地区域

**/res area listall** [*residence*] - 列出领地区域以及其坐标

**/res current** - 显示你目前所在的领地 (从插件版本 2.3.3 开始).

**/res info** - 获取领地信息，留下来查看您所领地的信息。当您居住在包含子领地的领地时，“子领地：##（##）”将出现在底部。这表示领地中有多少个子领地，（##）提供多级子领地计数。

**/res list** - 列出您所拥有的领地

**/res listall** - 列出所有领地

**/res limits** - 列出所有重要限制

**/res sublist** [*residence*] - 列出当前领地的子领地及其所有者。在领地内时，不需要提供领地名。要向前或向后翻页，请使用底部的上一页和下一页。通过单击结果中的名称，可以单击子领地直接传送玩家。

**/res tool** - 这为玩家提供了在标记起始和结束位置时选择工具用于领地插件。将返回两行： **- 选择工具:**WOOD_HOE (或一些其他的工具)

**- 休息工具:** STRING 这不会给玩家增加任何值, 如果有什么可以改变方块ID: #0290. The # associated with the tool itself. 与工具本身有关

**/res version** - 列出插件版本信息。

## **实用指令**

**/res command** [*ResidenceName*] [*allow/block/list*] - 允许或阻止使用领地中使用的命令的另一个安全级别。 使用 **/res command list** 指令将显示领地允许或阻止的所有命令。貌似需要使用 **/res command list** 指令以获取列表。这不遵循上面的参数或使玩家能够检查另一个领地的命令而不实际存在。还没有需要的删除选项，验证不应该允许和阻止相同的命令（但他目前有）。有一个选项来查看正在验证的命令将会是一个奖励。

**/res compass** [*ResidenceName*] - 将指南针设置为指向领地。如果你拿着指南针，它会引导你回到你的领地？或者这是完全不同的做法？我也不确定？

**/res current** - 告诉你你所居住的领地。 跟 **/res info** 差不多, 但是这只显示 "你目前所在的领地的领地名".

**/res confirm** - 用于某些操作需要确认/批准才能继续的情况。与删除计算机中的文件非常相似（你要删除你计算机内的1TB种子吗？(Y/N))，它会提示您确定要删除它，因为操作无法撤消。

**/res expand** [*amount*] - 使用现有的领地向您所面向的方向按照指定金额扩展领地。同样适用于多个页面的 **/res select expand** [*amount*] , 点击上一页或者下一页来换页.

**/res contract** [*amount*] - 按照指定金额合同现有领地。同样对于多个页面适用于 **/res select contract**[*amount*],请单击上一页或下一页。要传送到子领地，请将鼠标悬停在名称上并单击。

**/res default** [*residence*] - 将领地恢复为默认标志

**/res gui** - 这类似于在某些键盘上按下escape以关闭聊天窗口，显示您之前输入的命令。并非所有操作系统都能识别按下键盘上的Esc按钮。此命令有助于此方案。

**/res give** [*residence*] [*player*] - 将一个领地给予另外一个玩家。玩家必须在线，您必须拥有该领地。

**/res material** [*Material*] - 这似乎没有啥卵用，只返回“无效的材料......”。如果有适用的特定类型的材料，我们需要提供一个列表来显示它，或者更好地解释它的用途和原因。

**/res message** [*residence*] [*enter*/*leave*] [*message*] - 设置进入或离开领地消息。如果您站在领地中，可以省略[*residence*]参数。

**/res message** [*residence*] **remove** [*enter*/*leave*] - 删除进入或离开消息。

**/res mirror** [*source*] [*target*] - 从一个领地镜像复制到另一个领地的权限。您必须是两个领地的所有者才能执行此操作。

**/res rename** [*OldName*] [*NewName*] - 重命名领地。如果是子领地，OldName必须是全名（parent.subzone），而NewName只是新名称

**/res renamearea** [*residence*] [*OldName*] [*NewName*] - 重命名附属于领地的物理区域。

**/res show [*ResidenceName*] - 将显示概述所提供领地的视觉效果。如果站在领地内，则不需要_ResidenceName_。

**/res signconvert** - 这将尝试从第三方插件转换保存的标志数据。我不确定这里的用法是什么，或者是什么时候/为什么有人需要使用这个命令的例子。

**/res tp** [*residence*] - 传送到领地。首先使用 ** /res tpset ** 设置玩家将要TP位置。

**/res tpconfirm** - 当传送点不安全时，将玩家传送到领地。

**/res tpset** - 设置您领地的确切传送位置，包括您所面对的位置。

**/res unstuck** - 当你无法移动时，将你移到你所在的领地之外。

## **聊天指令**

聊天频道是私人聊天会话，只有加入“该频道”的人才能看到/回复其中的消息。 不在聊天频道中的所有用户都看不到对话。

**/res rc** [*ResidenceName*] - 加入当前或者是其他领地的聊天频道

**/res rc leave** - 离开当前的领地聊天频道

**/res rc setcolor** [*ColorCode*] - 设置领地内聊天频道的文本颜色

**/res rc setprefix** [*NewName*] - 设置领地聊天频道的前缀

**/res rc kick** [*PlayerName*] - 把玩家踢出领地聊天频道

## **市场 / 经济 指令**

**/res lease** [*renew*/*cost*] [*residence*] - 更新/显示续订领地费用。 成本设定将只适用于iConomy插件。

**/res market list** - 查看待售的领地列表

**/res market info** [*residence*] - 查看待售领地的信息

**/res market sell** [*residence*] [*amount*] - 出售领地

**/res market unsell** [*residence*] - 停止出售领地

**/res market buy** [*residence*] - 购买之前添加到购物清单中的领地

**/res market rentable** [*residence*] [*cost*] [*days*] **repeat:** [*t*/*f*] - 使用[*费用*]时以[*天*]为单位进行领地租赁

**/res market rent** [*residence*] **repeat:**[*t*/*f*] - 租一个领地，当设置为"true"时，领地将会在租赁者到期时自动重新出租

**/res market release** [*residence*] - 将领地从正在出租或者可出租状态中移除

## **商店指令**

**/res shop** - 显示用于创建，商店和投票的商店命令列表。这提供了世界范围内“已批准”购物区的列表，使其比仅仅的一个标志更明显。

**/res shop list** - 查看世界中已批准的商店列表。

**/res shop createboard** [*Place*]w- 创建一个商店列表板，可以列出所有商店。

**/res shop vote** [*ResidenceName*] [*Amount*] - 允许玩家在商店的受欢迎程度或支持率上投出1-10的票数。

**/res shop like** [*ResidenceName*] - 允许玩家“Like”一家商店。类似于在QQ空间给喜欢的说说点赞。

**/res shop votes** [*ResidenceName*] [*PageNumber*] - 如果存在多个页面，则显示可用分页的领地的所有投票。

**/res shop likes** [*ResidenceName*] [*PageNumber*] - 如果存在多个页面，则显示所有可用分页的领地。

**/res shop setdesc** [*Text*] - 为商店设置文字信息/说明。支持颜色代码和多行（使用 /n 表示新行）。

## **Residence Bank Commands**

**/res bank** [*deposit/withdrawal*] [*ResidenceName*] [*Amount*] - 存入或取出领地银行的款项。 住所必须将 ** bank ** 标志设置为"true"。

**/res resbank** [*deposit/withdrawal*] [*Amount*] - 存入或取出领地银行的款项。 住所必须将** bank **标志设置为"true"，您必须站在领地内。

## **管理员指令**

**/resadmin lease set** [*residence*] [*#days*/*infinite*] - 设置领地租约在＃天到期或永不过期(则是infinite)。

**/resadmin removeall** [*player*] - 删除玩家拥有的所有领地。

**/resadmin setowner** [*residence*] [*player*] - 将领地所有者更改为其他玩家。

**/resadmin server** [*residence*] - 将领地设置为服务器所有。

**/resadmin signupdate** - 此命令更新标志（标志更新），而不是（注册日期）。这个只在市场上有效。

**/resload** - 加载领地插件。注意res.yml中的任何更改都不会被覆盖。如果您最近添加/更改了res.yml并希望将更改推送到服务器，请使用该指令。

**/resreload** - 重新加载住宅插件。注意将覆盖res.yml中的任何更改为最初使用插件/服务器加载的设置。如果您在res.yml中添加/更改了任何内容，请不要使用该指令。请改用** / resload **指令。

**/resworld remove** [*world*] - 删除世界上的每个领地。注意：请务必小心，因为它将删除在指定世界中保存的所有领地·，并且无法撤消。无法撤销！无法撤销！（重要的事情说三遍）

## **Console Commands**

**res listall -a** - 提供所有没有分页的领地的完整列表。 注意：如果您的世界有数千个领地，那么在列表完成之前可能会导致轻微延迟、卡顿。

**res listall** - 提供所有具有分页的领地的完整列表。 在游戏中，每页将有六（6）个领地，在控制台中，每页将有二十（20）个领地。 每个页面都会在每个页面的顶部显示你目前所在###页。

**res removeworld [*WorldName*] - 从定义的世界中移除所有领地。

## **区域指令**

区域命令用于标记领地的部分并命名它们。 例如，如果您有一个包含多个项目的Super Store(超级商店)，您可以创建名为SuperStore的领地，并使用** /res area add SuperStore FoodDept **来显示食品部门在住所内的位置。 您必须首先为**added**或**replaced**的区域选择主坐标和辅助坐标。 您需要在住宅区内创建区域。

**/res area add** [*ResidenceName*] [*AreaName*] - 为住宅领地一个子领地。 不能重叠多个领地。

**/res area list** [*ResidenceName*] [*PageNumber*] - 列出领地的所有区域名称。 如果定义了超过6个子领地，则可以使用分页。

**/res area listall** [*ResidenceName*] [*PageNumber*] - 列出领地的所有子领地名称，坐标和大小。 如果定义了超过6个区域，则可以使用分页。

**/res area remove** [*ResidenceName*] [*AreaName*] - 从领地内移除/删除子领地名称。

**/res renamearea** [*ResidenceName*] [*oldAreaName*] [*newAreaName*] - 将领地的现有的子领地重命名为新名称。

**/res area replace** [*ResidenceName*] [*AreaName*] - 用新坐标替换现有的子领地名称。
