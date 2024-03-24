export default class Button {
    constructor() {
      this.plugin = {
        name: "探索查询",
        dsc: "探索查询",
        priority: 100,
        rule: [
          {
            reg: /^(#(原神|星铁)?(角色|查询|查询角色|角色查询|人物)[ |0-9]*$)|(^(#*uid|#*UID)\+*[1|2|5-9][0-9]{8}$)|(^#[+|＋]*[1|2|5-9][0-9]{8})/,
            fnc: 'buttonCenter'
          },
          { 
            reg: '^#(宝箱|成就|尘歌壶|家园|探索|探险|声望|探险度|探索度)[ |0-9]*$',
            fnc: 'buttonCenter'
          },
          { 
            reg: '^(#原石|#*札记|#*(星铁)?星琼)([0-9]|[一二两三四五六七八九十]+)*月*$',
            fnc: 'buttonCenter'
          },{
            reg: '^#[五星|四星|5星|4星]*武器[ |0-9]*$',
            fnc: 'buttonCenter'
          },{
            reg: '^#?(原石|札记|(星铁)?星琼)统计$',
            fnc: 'buttonCenter'
          }
        ]
      }
    }
    async buttonCenter(e){
      const list = [
        [
          { label: '角色', callback: `#角色` },
          { label: '探索', callback: `#探索` },
        ],[
          { label: '深渊', callback: '#深渊' },
          { label: '武器', callback: '#武器' },
        ],[
          { label: '原石', callback: `#原石` },
          { label: '星琼', callback: `*星琼` },
        ],[
          { label: '原石统计', callback: `#原石统计` },
          { label: '星琼统计', callback: `*星琼统计` },
        ],[
          { label: '扫码绑定', callback: `#扫码绑定` },
          { label: '刷新CK', callback: `#刷新ck` },
        ]
      ]
      return Bot.Button(list)
    }
  }