export default class Button {
  constructor() {
    this.plugin = {
      name: "状态",
      dsc: "状态",
      priority: 99,
      rule: [
        {
          reg: '^#?(身份查询|用户数量)',
          fnc: 'OpenIdtoId'
        },
        {
          reg: '^#?(id|ID)绑定',
          fnc: 'writeOpenid'
        },
        {
          reg: '^#?(id|ID)',
          fnc: 'Id'
        },
      ]
    }
  }

  OpenIdtoId (e) {
    const button = [
      { label: '用户查询', data: `/身份查询` },
      { label: '用户数量', data: `/用户数量` },
      { label: '用户绑定', data: `/id绑定` },
      { label: '用户ID', data: `${e.user_id}` },
    ]
    return toButton(button)
  }  
  
  writeOpenid () {
    return false
  }

  Id (e) {
    const button = [
      { label: '群聊ID', data: `${e.group_id}` },
      { label: '用户ID', data: `${e.user_id}` },
    ]
    return toButton(button)
  }
}

function toButton(list, line = 2) {
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