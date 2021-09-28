/*
 * @Description: 场景配置
 * @Author: 吴锦辉
 * @Date: 2021-09-27 10:23:38
 * @LastEditTime: 2021-09-28 14:10:55
 */

// 场景资源

// 资源jason图示

/*
    ***********场景预设值解释**************8
{
  sceneImage        // 场景图片
  width             // 场景宽度
  height            // 场景高度
  itemList          // 资源列表
    [{
      index         // 物品id
      disabled      // 是否可点击
      isHighLight: true, // 是否高亮显示
      image         // 物品图片
      info          // 每个物品图片的配置信息
       {
        plist [
          "0 0",    // 图片精灵图片的位置，数组为0的必须为默认
        ],
        unAnimation: [0, 1, 2, 3, 4, 8, 9, 10], // 有红包物品动画流程
        inAnimation: [0, 1, 2, 3, 4, 5, 6, 7], // 无红包物品动画流程
        istyle: {left: '690rpx',      // 物品附加的样式
                 top: '676rpx',},
        width        // 物品宽度
        height       // 物品高度
        rwidth       // 真实图片宽度
        rheight      // 真实图片高度
        cstyle: `width:220rpx;      //配置事件的范围
                 height:46rpx;
                 position:absolute;
                 left:224rpx;
                 top:326rpx;
                 transform:skew(0deg, 30deg);
                 z-index: 2`,

        // 显示金额气泡的样式（比起计算位置去显示还是直接配置来得要高效）

        popoverClass: "" // popover-left-top 气泡左上，以此类推
        popoverStyle: `` // 气泡位置
      },
      currentPlist // 当前物品的状态 通过改变物品的状态实现动画
    }]
  itemNomalList     //无点击的默认的图片列表
  [
    // 数组中置入一个样式信息即可
    `width:79rpx; height:43rpx;
    background: url(@img/fangjian/other.png}),
    background-position: 0 0;
    background-size: 249rpx 358rpx;
    left: 780rpx;
    top: 790rpx;
    position:absolute;`,
  ]
}

*/
export default // 私房钱 场景id 为 0
{
  sceneId: '100',
  sceneImage: require('@img/fangjian/scene.png'), // 场景图片
  width: 1811, // 场景宽度
  height: 2002, // 场景高度
  scrollX: 0,
  scrollY: 0,
  _scrollX: 600,
  _scrollY: 300,
  itemList: [
    // 桌子
    {
      id: 1000, // 物品id
      disabled: false, // 是否可点击
      isHighLight: true, // 是否高亮显示
      image: require('@img/fangjian/zhuozi.png'), // 物品图片
      highLight: require('@img/faguang/zhuozi.png'),
      info: {
        // 图片的配置
        plist: [
          [0, 0],
          [-669, 0],
          [-1338, 0],
          [-2007, 0],
          [-2676, 0],
          [-3345, 0],
          [0, -574],
          [-669, -574],
          [-1338, -574],
          [-2007, -574],
          [-2676, -574],
          [-3345, -574],
        ],
        unAnimation: [0, 1, 2, 3, 8, 9, 10, 11], // 有红包物品动画流程
        inAnimation: [0, 1, 2, 3, 4, 5, 6, 7], // 无红包物品动画流程
        istyle: { left: '720rpx', top: '676rpx' },
        width: 669, // 物品宽度
        height: 574, // 物品高度
        rwidth: 4014, // 真实图片宽度
        rheight: 1148, // 真实图片高度

        cstyle: `width:220rpx;
                         height:46rpx;
                         position:absolute;
                         left:224rpx;
                         top:326rpx;
                         transform:skew(0deg, 30deg);
                         z-index: 2`,

        // 显示金额气泡的样式（比起计算位置去显示还是直接配置来得要高效）
        popoverClass: 'popover-left-bottom',
        popoverStyle: `right: 52rpx;bottom: 188rpx;`,
      },
      currentPlist: 0, // 当前物品的状态 通过改变物品的状态实现动画
    },
    // 纸箱
    {
      id: 1001, // 物品id
      disabled: false, // 是否可点击
      isHighLight: true, // 是否高亮显示
      image: require('@img/fangjian/zhixiang.png'), // 物品图片
      highLight: require('@img/faguang/zhixiang.png'),
      info: {
        // 图片的配置
        plist: [
          [0, 0],
          [-263, 0],
          [-525, 0],
          [0, -263],
          [-262, -263],
          [-525, -263],
          [0, -526],
          [-263, -526],
          [-525, -526],
          [0, -789],
          [-262, -789],
          [-524, -789],
          [0, -1052],
          [-263, -1052],
          [-525, -1052],
        ],
        unAnimation: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // 无红包物品动画流程
        inAnimation: [0, 1, 2, 3, 4, 5, 6, 7, 11, 12, 13, 14], // 有红包物品动画流程
        istyle: { right: '560rpx', bottom: '480rpx', zIndex: 2 },
        width: 263, // 物品宽度
        height: 263, // 物品高度
        rwidth: 788, // 真实图片宽度
        rheight: 1314, // 真实图片高度
        cstyle: `width:184rpx;
                         height:200rpx;
                         position:absolute;
                         left:37rpx;
                         bottom:0;`,
        popoverClass: 'popover-left-bottom',
        popoverStyle: `left: 200rpx;top: 40rpx;`,
      },
      currentPlist: 0, // 当前物品的状态 通过改变物品的状态实现动画
    },
    // 花盆
    {
      id: 1002, // 物品id
      disabled: false, // 是否禁用点击
      isHighLight: true, // 是否高亮显示
      image: require('@img/fangjian/huapen.png'), // 物品图片
      highLight: require('@img/faguang/huapen.png'),
      info: {
        // 图片的配置
        plist: [
          [0, 0],
          [-372, 0],
          [0, -276],
          [-372, -276],
          [0, -552],
          [-372, -552],
          [0, -828],
          [-372, -828],
          [0, -1104],
          [-372, -1104],
          [0, -1380],
          [-372, -1380],
          [0, -1655],
          [-372, -1655],
        ],
        unAnimation: [0, 1, 2, 3, 4, 5, 6, 7, 8], // 无红包物品动画流程
        inAnimation: [0, 1, 2, 3, 9, 10, 11, 12, 13], // 有红包物品动画流程
        istyle: { left: 0, top: '866rpx', zIndex: 2 },
        width: 372, // 物品宽度
        height: 275, // 物品高度
        rwidth: 746, // 真实图片宽度
        rheight: 1930, // 真实图片高度
        cstyle: `width:321rpx;
                         height:229rpx;
                         position:absolute;
                         left:0;
                         bottom:0;
                         `,
        popoverClass: 'popover-left-bottom',
        popoverStyle: `left: 200rpx;top: 0;`,
      },
      currentPlist: 0, // 当前物品的状态 通过改变物品的状态实现动画
    },
    // 风景画
    {
      id: 1003, // 物品id
      disabled: false, // 是否禁用点击
      isHighLight: true, // 是否高亮显示
      image: require('@img/fangjian/fengjinghua.png'), // 物品图片
      highLight: require('@img/faguang/fengjinghua.png'),
      info: {
        // 图片的配置
        plist: [
          [-1652, 0],
          [-1416, 0],
          [-1180, 0],
          [-944, 0],
          [-708, 0],
          [-472, 0],
          [-236, 0],
          [0, 0],
        ],
        unAnimation: [0, 1, 2, 3, 4, 5], // 无红包物品动画流程
        inAnimation: [0, 1, 2, 3, 6, 7], // 有红包物品动画流程
        istyle: { left: '750rpx', top: '440rpx' },
        width: 236, // 物品宽度
        height: 236, // 物品高度
        rwidth: 1888, // 真实图片宽度
        rheight: 236, // 真实图片高度
        cstyle: `width:97rpx;
                         height:98rpx;
                         position:absolute;
                         left:28rpx;
                         bottom:32rpx;
                         transform:skew(0deg, -22deg);`,
        popoverClass: 'popover-left-bottom',
        popoverStyle: `left: 140rpx;top: 40rpx;`,
      },
      currentPlist: 0, // 当前物品的状态 通过改变物品的状态实现动画
    },
    // 风景画2
    {
      id: 1004, // 物品id
      disabled: false, // 是否禁用点击
      isHighLight: true, // 是否高亮显示
      image: require('@img/fangjian/fengjinghua2.png'), // 物品图片
      highLight: require('@img/faguang/fengjinghua2.png'),
      info: {
        // 图片的配置
        plist: [
          [-266, -582],
          [0, -582],
          [-532, -291],
          [-266, -291],
          [0, -291],
          [-532, 0],
          [-266, 0],
          [0, 0],
        ],
        unAnimation: [0, 1, 2, 3, 6, 7], // 无红包物品动画流程
        inAnimation: [0, 1, 2, 3, 4, 5], // 有红包物品动画流程
        istyle: { left: '1270rpx', top: '419rpx' },
        width: 266, // 物品宽度
        height: 291, // 物品高度
        rwidth: 798, // 真实图片宽度
        rheight: 873, // 真实图片高度
        cstyle: `width:100rpx;
                         height:108rpx;
                         position:absolute;
                         left:116rpx;
                         bottom:52rpx;
                         transform:skew(0deg, 29deg);`,
        popoverClass: 'popover-left-bottom',
        popoverStyle: `left: 200rpx;top: 80rpx;`,
      },
      currentPlist: 0, // 当前物品的状态 通过改变物品的状态实现动画
    },
    // 人像
    {
      id: 1005, // 物品id
      disabled: false, // 是否禁用点击
      isHighLight: true, // 是否高亮显示
      image: require('@img/fangjian/renxiang.png'), // 物品图片
      highLight: require('@img/faguang/renxiang.png'),
      info: {
        // 图片的配置
        plist: [
          [-1453, 0],
          [-1246, 0],
          [-1038, 0],
          [-830, 0],
          [-622, 0],
          [-415, 0],
          [-207, 0],
          [0, 0],
        ],
        unAnimation: [0, 1, 2, 3, 4, 5], // 无红包物品动画流程
        inAnimation: [0, 1, 2, 3, 6, 7], // 有红包物品动画流程
        istyle: { left: '750rpx', top: '290rpx' },
        width: 208, // 物品宽度
        height: 222, // 物品高度
        rwidth: 1661, // 真实图片宽度
        rheight: 222, // 真实图片高度
        cstyle: `width:97rpx;
                         height:98rpx;
                         position:absolute;
                         left:28rpx;
                         bottom:32rpx;
                         transform:skew(0deg, -22deg);`,
        popoverClass: 'popover-left-bottom',
        popoverStyle: `left: 140rpx;top: 40rpx;`,
      },
      currentPlist: 0, // 当前物品的状态 通过改变物品的状态实现动画
    },
    // 笔记本
    {
      id: 1006, // 物品id
      disabled: false, // 是否禁用点击
      isHighLight: true, // 是否高亮显示
      image: require('@img/fangjian/bijiben.png'), // 物品图片
      highLight: require('@img/faguang/bijiben.png'),
      info: {
        // 图片的配置
        plist: [
          [0, 0],
          [-476, 0],
          [-714, 0],
          [-952, 0],
          [-1190, 0],
          [-1428, 0],
          [-1666, 0],
          [-1904, 0],
          [-2142, 0],
          [-2380, 0],
        ],
        unAnimation: [0, 1, 2, 3, 7, 8, 9], // 无红包物品动画流程
        inAnimation: [0, 1, 2, 3, 4, 5, 6], // 有红包物品动画流程
        istyle: { left: '892rpx', top: '702rpx', zIndex: 2 },
        width: 238, // 物品宽度
        height: 204, // 物品高度
        rwidth: 2618, // 真实图片宽度
        rheight: 204, // 真实图片高度
        cstyle: `width:100%;
                         height:100%;
                         position: absolute;
                         top:0;
                         `,
        popoverClass: 'popover-left-bottom',
        popoverStyle: `left: 160rpx;top: -32rpx;`,
      },
      currentPlist: 0, // 当前物品的状态 通过改变物品的状态实现动画
    },
    // 椅子
    {
      id: 1007, // 物品id
      disabled: false, // 是否禁用点击
      isHighLight: true, // 是否高亮显示
      image: require('@img/fangjian/yizi.png'), // 物品图片
      highLight: require('@img/faguang/yizi.png'),
      info: {
        // 图片的配置
        plist: [
          [0, 0],
          [-435, 0],
          [0, -435],
          [-436, -435],
          [0, -870],
          [-436, -870],
          [0, -1305],
          [-436, -1305],
          [0, -1741],
          [-436, -1741],
        ],
        unAnimation: [0, 1, 2, 3, 7, 8, 9], // 无红包物品动画流程
        inAnimation: [0, 1, 2, 3, 4, 5, 6], // 有红包物品动画流程
        istyle: { left: '640rpx', top: '980rpx' },
        width: 436, // 物品宽度
        height: 436, // 物品高度
        rwidth: 872, // 真实图片宽度
        rheight: 2177, // 真实图片高度
        cstyle: `width:300rpx;
                         height:360rpx;
                         position:absolute;
                         left:0;
                         bottom:0;
                         `,
        popoverClass: 'popover-left-bottom',
        popoverStyle: `left: 200rpx;top: 60rpx;`,
      },
      currentPlist: 0, // 当前物品的状态 通过改变物品的状态实现动画
    },
    // 水杯
    {
      id: 1008, // 物品id
      disabled: false, // 是否禁用点击
      isHighLight: true, // 是否高亮显示
      image: require('@img/fangjian/shuibei.png'), // 物品图片
      highLight: require('@img/faguang/shuibei.png'),
      info: {
        // 图片的配置
        plist: [
          [0, 0],
          [-50, 0],
          [-100, 0],
          [-149, 0],
          [-198, 0],
          [-248, 0],
          [-298, 0],
          [-348, 0],
          [-398, 0],
          [-448, 0],
        ],
        unAnimation: [0, 1, 2, 3, 7, 8, 9], // 无红包物品动画流程
        inAnimation: [0, 1, 2, 3, 4, 5, 6], // 有红包物品动画流程
        istyle: { left: '1022rpx', top: '888rpx', zIndex: 3 },
        width: 50, // 物品宽度
        height: 54, // 物品高度
        rwidth: 498, // 真实图片宽度
        rheight: 54, // 真实图片高度
        cstyle: `width:100%;
                         height:100%;
                         position: absolute;
                         top:0;
                         `,
        popoverClass: 'popover-left-bottom',
        popoverStyle: `left: 35rpx;top: -42rpx;`,
      },
      currentPlist: 0, // 当前物品的状态 通过改变物品的状态实现动画
    },
    // 台灯
    {
      id: 1009, // 物品id
      disabled: false, // 是否禁用点击
      isHighLight: true, // 是否高亮显示
      image: require('@img/fangjian/taideng.png'), // 物品图片
      highLight: require('@img/faguang/taideng.png'),
      info: {
        // 图片的配置
        plist: [
          [0, 0],
          [-270, 0],
          [-540, 0],
          [-810, 0],
          [-1080, 0],
          [-1350, 0],
          [-1620, 0],
          [0, -553],
          [-270, -553],
          [-540, -553],
          [-810, -553],
          [-1080, -553],
          [-1350, -553],
        ],
        unAnimation: [0, 1, 2, 3, 4, 9, 10, 11, 12], // 无红包物品动画流程
        inAnimation: [0, 1, 2, 3, 4, 5, 6, 7, 8], // 有红包物品动画流程
        istyle: { left: '518rpx', bottom: 0 },
        width: 270, // 物品宽度
        height: 553, // 物品高度
        rwidth: 1890, // 真实图片宽度
        rheight: 1106, // 真实图片高度
        cstyle: `width:155rpx;
                         height:487rpx;
                         position: absolute;
                         left: 0;
                         bottom:0;
                         `,
        popoverClass: 'popover-left-bottom',
        popoverStyle: `left: 140rpx;top: 0;`,
      },
      currentPlist: 0, // 当前物品的状态 通过改变物品的状态实现动画
    },
    // 地毯
    {
      id: 1010, // 物品id
      disabled: false, // 是否禁用点击
      isHighLight: true, // 是否高亮显示
      image: require('@img/fangjian/ditan.png'), // 物品图片
      highLight: require('@img/faguang/ditan.png'),
      info: {
        // 图片的配置
        plist: [
          [0, 0],
          [0, -219],
          [0, -439],
          [0, -659],
          [0, -879],
          [0, -1099],
          [0, -1319],
          [0, -1539],
          [0, -1759],
        ],
        unAnimation: [0, 5, 6, 7, 8], // 无红包物品动画流程
        inAnimation: [0, 1, 2, 3, 4], // 有红包物品动画流程
        istyle: { right: '14rpx', top: '1172rpx' },
        width: 290, // 物品宽度
        height: 220, // 物品高度
        rwidth: 290, // 真实图片宽度
        rheight: 1979, // 真实图片高度
        cstyle: `width:184rpx;
                         height:50rpx;
                         position:absolute;
                         left:54rpx;
                         top:82rpx;
                         transform: skew(-60deg, 30deg);
                         `,
        popoverClass: 'popover-right-top',
        popoverStyle: `left: -70rpx;bottom: 0;`,
      },
      currentPlist: 0, // 当前物品的状态 通过改变物品的状态实现动画
    },
  ],
  itemNomalList: [
    // 飞机
    {
      style: `width:129rpx;
                        height:50rpx;
                        left: 1100rpx;
                        top: 950rpx;`,
      image: require('@img/fangjian/other/feiji.png'),
    },

    // 福字
    {
      style: `width:168rpx;
                        height:143rpx;
                        left: 790rpx;
                        top: 730rpx;`,
      image: require('@img/fangjian/other/fu.png'),
    },
    // 纸巾盒
    {
      style: `width:41rpx;
                        height:49rpx;
                        left: 1064rpx;
                        top: 862rpx;`,
      image: require('@img/fangjian/other/zhijinhe.png'),
    },
    // 红包
    {
      style: `width:124rpx;
                        height:73rpx;
                        left: 1060rpx;
                        top: 890rpx;`,
      image: require('@img/fangjian/other/hongbao.png'),
    },
    // 食物
    {
      style: `width:97rpx;
                        height:53rpx;
                        left: 1176rpx;
                        top: 882rpx;`,
      image: require('@img/fangjian/other/shiwu.png'),
    },
    // 衣架
    {
      style: `width:196rpx;
                        height:574rpx;
                        left: 1248rpx;
                        top: 634rpx;`,
      image: require('@img/fangjian/other/yijia.png'),
    },
    // 台灯
    {
      style: `width:142rpx;
                        height:243rpx;
                        left: 1044rpx;
                        top: 640rpx;`,
      image: require('@img/fangjian/other/taideng.png'),
    },
  ],
};
