export default class Button {
    constructor() {
      this.plugin = {
        name: "圣遗物列表",
        dsc: "圣遗物列表",
        priority: 99,
        rule: [
          {
            reg: /^#(星铁|原神)?(圣遗物|遗器)列表\s*(\d{9,10})?$/,
            fnc: 'buttonCenter'
          },
          {
            reg: '^#面板帮助$',
            fnc: 'buttonCenter'
          }
        ]
      }
    }
    async buttonCenter(e){
      const game = (e.game === 'sr' || e.isSr) ? '星铁' : ''
      const list = [
        [
          { label: '更新面板', callback: `#${game}更新面板` },
          { label: '扫码绑定', callback: `#扫码绑定` },
        ],[
          { label: '绑定UID', data: `#${game}绑定` },
          { label: '切换UID', data: `#${game}uid` },
        ],[
          { label: '圣遗物列表', callback: `#圣遗物列表` },
        ],[
          { label: '遗器列表', callback: `#星铁遗器列表` },
        ]
      ]
      return Bot.Button(list)
    }
  }