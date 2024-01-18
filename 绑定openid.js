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
    return Bot.Button(button, 2)
  }  
  
  writeOpenid () {
    return false
  }

  Id (e) {
    const button = [
      { label: '群聊ID', data: `${e.group_id}` },
      { label: '用户ID', data: `${e.user_id}` },
    ]
    return Bot.Button(button)
  }
}