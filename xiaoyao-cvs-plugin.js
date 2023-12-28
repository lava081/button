export default class Button {
  constructor() {
    this.plugin = {
      name: "xiaoyao-cvs-plugin",
      dsc: "xiaoyao-cvs-plugin",
      priority: 100,
      rule: [
      {
        reg: "^#*((刷新|更新|获取)(ck|cookie))|((扫码|二维码|辅助)(登录|绑定|登陆))|((账号|密码)(密码)?(登录|绑定|登陆))|((图鉴|ck)帮助)$",
        fnc: "user",
      },
      {
        reg: `^#*(米游社|mys|社区)?(原神|星铁|崩坏3|崩坏2|未定事件簿|大别野|崩坏星穹铁道|绝区零|全部)?签到$`,
        fnc: "sign",
      },
      {
        reg: `^#*(原神|星铁|全部|全|多)?体力(帮助)?$`,
        fnc: "note",
      },
      {
        reg: `^#*(原神|星铁)?(((更新|获取|导出)?抽卡记录)|((全部)?(抽卡|抽奖|角色|武器|常驻|up|新手|光锥|全部)池*(记录|祈愿|分析|统计))|((记录|抽卡|安卓|苹果|电脑|pc|ios)帮助))$`,
        fnc: "gacha",
      },
      {
        reg: 'authkey=',
        fnc: "gacha",
      },
      {
        reg: /\[uid\:\d+\]/,
        fnc: "gacha",
      },
      {
        reg: '(stoken|ct|login_ticket)=',
        fnc: "user",
      },
      {
        reg: '(ltoken|ltoken_v2).*(ltuid|login_uid|ltmid_v2)',
        fnc: "user",
      },
      ]
    }
  }

  async user(){
    const button = [
      { label: '米币查询', data: `/米币查询` },
      { label: '签到', data: `/签到` },
      { label: '抽卡记录', data: `/更新抽卡记录` },

      { label: '今日素材', data: `/今日素材` },
      { label: '体力', data: `/体力` },
      { label: '原石统计', data: `/原石统计` },
      
      { label: '圣遗物', data: `/圣遗物列表` },
      { label: '深渊', data: `/喵喵深渊` },
      { label: '练度统计', data: `/练度统计` },

      { label: `米游社登录`, data: `/扫码登录` },
      { label: `刷新ck`, data: `/刷新ck` },
    ]
    return toButton(button)
  }

  async sign(){
    const button = [
        { label: `米游社签到`, data: `/米游社全部签到` },
        { label: `原神签到`, data: `/原神签到` },
        { label: `星铁签到`, data: `/星铁签到` },

        { label: `米游社登录`, data: `/扫码登录` },
        { label: `签到`, data: `/签到` },
    ]
    return toButton(button)
  }

  async note(){
    const button = [
        { label: `原神体力`, data: `/原神体力` },
        { label: `星铁体力`, data: `/星铁体力` },
        { label: `全部体力`, data: `/全部体力` },

        { label: `刷新ck`, data: `/刷新ck` },
        { label: `米游社登录`, data: `/扫码登录` },
    ]
    return toButton(button)
  }

  async gacha(e){
    let button
    if(e.isSr)
      button = [
        { label: `角色记录`, data: `/星铁角色池记录` },
        { label: `光锥记录`, data: `/星铁光锥池记录` },
        { label: `全部记录`, data: `/星铁全部记录` },

        { label: `角色统计`, data: `/星铁角色池统计` },
        { label: `光锥统计`, data: `/星铁光锥池统计` },
        { label: `全部统计`, data: `/星铁全部统计` },
  ]
    else
      button = [
        { label: `角色记录`, data: `/角色池记录` },
        { label: `武器记录`, data: `/武器池记录` },
        { label: `全部记录`, data: `/全部记录` },

        { label: `角色统计`, data: `/角色池统计` },
        { label: `武器统计`, data: `/武器池统计` },
        { label: `全部统计`, data: `/全部统计` },

        { label: `米游社登录`, data: `/扫码登录` },
        { label: `更新记录`, data: `/更新抽卡记录` },
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
