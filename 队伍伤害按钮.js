export default class Button {
    constructor() {
      this.plugin = {
        name: "队伍伤害",
        dsc: "队伍伤害",
        priority: 100,
        rule: [
          {
            reg: /^#队伍伤害(详情|过程|全图)?(\d+)?(.*)$/,
            fnc: 'buttonCenter'
          },
          {
            reg: '^#成就(排行|排名|查询|统计)(.*)$',
            fnc: 'buttonCenter'
          },
          {
            reg: '^#宝箱(排行|排名|查询|统计)(.*)$',
            fnc: 'buttonCenter'
          }
        ]
      }
    }
    async buttonCenter(e){
      const list = [
        [
          { label: '绑定UID', data: `#绑定` },
          { label: '更新面板', callback: `#更新面板` },
        ],[
          { label: '扫码绑定', callback: `#扫码绑定` },
          { label: '刷新CK', callback: `#刷新ck` },
        ],[
          { label: '队伍伤害', data: `#队伍伤害` },
        ]
      ]
      return Bot.Button(list)
    }
  }