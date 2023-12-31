export default class Button {
  constructor() {
    this.plugin = {
      name: "按钮中心",
      dsc: "按钮中心",
      priority: 100,
      rule: [
        {
          reg: '^#按钮中心$',
          fnc: 'buttonCenter'
        }
      ]
    }
  }
  buttonCenter(){
    let button = []
    let list = []
    list = [
      { label: '绑定uid', data: `/原神绑定` },
      { label: '扫码登录', data: `/扫码登录` }, 
      { label: '更新面板', data: `/原神更新面板` },
    ]
    button.push(...toButton(list,3))

    list = [
      { label: '体力', data: `/原神体力` },
      { label: '签到', data: `/原神签到` },
      { label: '深渊', data: `/喵喵深渊` },
      { label: '转生', data: `/转生` },
    ]
    button.push(...toButton(list,4))

    list = [
      { label: '今日素材', data: `/今日素材` },
      { label: '帮助', data: `/帮助` },
      { label: '模拟抽卡', data: `/十连` },
            
      { label: '俄罗斯转盘', data: `/开枪` },
      { label: '叫声杂鱼', data: `/骂我` },
      { label: '随机表情包', data: `/兽猫酱` },

      { label: 'emo时间', data: `/网易云热评` },
      { label: '看黑丝', data: `/hs` },
      { label: '甜妹视频', data: `/甜妹视频` },
    ]
    button.push(...toButton(list,3))

    return button
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