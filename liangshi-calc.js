export default class Button {
  constructor() {
    this.plugin = {
      name: "liangshi-calc",
      dsc: "liangshi-calc",
      priority: 99,
      rule: [
      {
        reg: "^#?(梁氏|伤害计算拓展|liangshi|面板拓展|计算拓展)(命令|帮助|菜单|help|说明|功能|指令|使用说明|预设面板)$",
        fnc: "help",
      },
      ]
    }
  }

  async help(){
    const button = [
      { label: '极限面板', data: `/极限面板` },
      { label: '星铁极限面板', data: `*极限面板` },
      { label: '核爆面板', data: `/辅助面板` },

      { label: '辅助面板', data: `/辅助面板` },
      { label: '平民面板', data: `/平民面板` },
      { label: '毕业面板', data: `/毕业面板` },
    ]
    return toButton(button)
  }
}

function toButton(list, line = 3) {
  let button = []
  let arr = []
  let index = 1
  for (const i of list) {
    arr.push({
      id: String(Date.now()),
      render_data: {
        label: i.label,
        style: 1
      },
      action: {
        type: 2,
        permission: { type: 2 },
        data: i.data,
        unsupport_tips: "code: 45",
      }
    })
    if (index % line == 0 || index == list.length) {
      button.push({type: 'button',
        buttons: arr
      })
      arr = []
    }
    index++
  }
  return button
}
