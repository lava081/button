export default class Button {
    constructor() {
      this.plugin = {
        name: "进阶查询按钮",
        dsc: "进阶查询按钮",
        priority: 98,
        rule: [
            {
              reg: /^#(今日|今天|每日|我的|明日)*(素材|材料|天赋)[ |0-9]*$/,
              fnc: 'buttonCenter'
            },
            {
                reg: /^(#|喵喵)+(日历|日历列表)$/,
                fnc: 'buttonCenter'
            },
            {
                reg: /^#(星铁)+(日历|日历列表)$/,
                fnc: 'buttonCenter'
            },
            {
                reg: /^#(原神|星铁)?练度统计[ |0-9]*$/,
                fnc: 'buttonCenter'
            },
            {
                reg: /^#*(我的)*(今日|今天|明日|明天|周.*)?(五|四|5|4|星)?(技能|天赋)+(汇总|统计|列表)?[ |0-9]*$/,
                fnc: 'buttonCenter'
            },
            {
              reg: '^#?刷新充值记录$',
              fnc: "buttonCenter",
            },
            {
              reg: 'authkey=',
              fnc: "buttonCenter",
            },
            {
              reg: /\[uid\:\d+\]/,
              fnc: "buttonCenter",
            }
        ]
      }
    }
    async buttonCenter(e){
      const list = [
        [
          { label: '练度统计', callback: `#练度统计` },
          { label: '星铁练度', callback: `#星铁练度统计` },
        ],[
          { label: '天赋统计', callback: `#天赋统计` },
          { label: '今日素材', callback: `#今日素材` },
        ],[
          { label: '充值记录', callback: `#刷新充值记录` },
          { label: '明日素材', callback: `#明日素材` },
        ],[
          { label: '原神日历', callback: `#日历` },
          { label: '星铁日历', callback: `#星铁日历` },
        ],[
          { label: '扫码绑定', callback: `#扫码绑定` },
          { label: '刷新CK', callback: `#刷新ck` },
        ]
      ]
      return Bot.Button(list)
    }
  }