export default class Button {
    constructor() {
      this.plugin = {
        name: "深渊按钮",
        dsc: "深渊按钮",
        priority: 100,
        rule: [
            {
              reg: '^#?(原神)?(喵喵)?深渊(第?.{1,2}层)?(角色)?(出场|使用)(率|统计)',
              fnc: 'buttonCenter'
            },
            {
                reg: '^#?(原神)?深渊(组队|配队|配对)',
                fnc: 'buttonCenter'
            },
            {
                reg: '^#?(原神)?(喵喵|上传|本期|上期)*(深渊|深境|深境螺旋)[ |0-9]*(数据)?',
                fnc: 'buttonCenter'
            }
        ]
      }
    }
    async buttonCenter(e){
      const list = [
        [
          { label: '本期深渊', callback: `#深渊` },
          { label: '上期深渊', callback: `#上期深渊` },
        ],[
          { label: '本期12层', callback: `#深渊12层` },
          { label: '上期12层', callback: `#上期深渊12层` },
        ],[
          { label: '上传深渊', callback: `#上传深渊` },
          { label: '深渊配队', callback: `#深渊配队` },
        ],[
          { label: '扫码绑定', callback: `#扫码绑定` },
          { label: '刷新CK', callback: `#刷新ck` },
        ]
      ]
      return Bot.Button(list)
    }
  }