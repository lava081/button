/*原作者：[风间叶](https://github.com/xiaoye12123/), [Lain.](https://github.com/Zyy955/)*/
export default class Button {
  constructor () {
    this.plugin = {
      name: 'miao-plugin',
      dsc: 'miao-plugin',
      priority: 101,
      rule: [
        {
          reg: '^#?(喵喵)?(命令|帮助|菜单|help|说明|功能|指令|使用说明)$',
          fnc: 'help'
        },
        {
          reg: /^#(星铁|原神)?获取游戏角色详情( )?(\d{9})?$/,
          fnc: 'profile'
        },
        {
          reg: /^#(星铁|原神)?(更新)?(全部)?面板(更新)?( )?(\d{9})?$/,
          fnc: 'profile'
        },
        {
          reg: '^(#|\/)?(原神|星铁)?绑定(#|\/)?(绑定)?( )?(uid|UID)?( )?[1-9]',
          fnc: 'bingUid'
        },
        {
          reg: '^#(原神|星铁)?(删除)?( )?(uid|UID)',
          fnc: 'bingUid'
        },
        {
          reg: /^#?(原神|星铁)?(群|群内)?(排名|排行)?(最强|最高|最高分|最牛|第一)+.+/,
          fnc: 'rank'
        },
        {
          reg: /^#?(原神|星铁)?(群|群内)?(.*)(排名|排行)/,
          fnc: 'rank'
        },
        {
          reg: /^#*([^#]+)\s*(详细|详情|面板|面版|圣遗物|武器[1-7]?|伤害([1-9]+\d*)?)\s*(\d{9})*(.*[换变改].*)?$/,
          fnc: 'detail'
        },
        {
          reg: /^(#(原神|星铁)?(角色|查询|查询角色|角色查询|人物)[ |0-9]*$)|(^(#*uid|#*UID)\+*[1|2|5-9][0-9]{8}$)|(^#[\+|＋]*[1|2|5-9][0-9]{8})/,
          fnc: 'avatarList'
        },
        {
          reg: '#?喵喵角色卡片',
          fnc: 'avatarList'
        }
      ]
    }
  }
  help (){
    const button = [
      { label: '遗物列表', callback: `/圣遗物列表` },
      { label: '深渊', callback: `/深渊` },
      { label: '练度统计', callback: `/练度统计` },

      { label: '体力', callback: `/体力` },
      { label: '签到', callback: `/签到` },
      { label: '今日素材', callback: `/今日素材` },

      { label: '绑定UID', data: `/绑定` },
      { label: '扫码绑定', callback: `/扫码绑定` },
      { label: '更新面板', callback: `/更新面板` },
      [
        { label: '加入反馈群' , link: 'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=dGwUMbO9IBj9TPGmGLmZ1HMBw5b6zaTK&authKey=e9KIcoWA2QVtQ2N0%2BBIzF3DzyR7JoSwSZkNPkXc4aI6nKzO%2Bl9KAmd%2FQ5ZXtMB4b&noverify=0&group_code=692425673' },
      ],[
        { label: '添加到群聊' , link: 'https://qun.qq.com/qunpro/robot/qunshare?robot_uin=3889005294&robot_appid=102082668&biz_type=0' },
      ]
    ]
    return Bot.Button(button, 3)
  }

  profile (e) {
    const roleList = e?.newChar ? (Object.keys(e.newChar) || []) : []
    const button = []

    const list = [
      { label: '原神绑定', data: `/${e.game === 'sr' ? '星铁' : '原神'}绑定` },
      { label: '星铁绑定', data: `/${e.game === 'sr' ? '星铁' : '原神'}绑定` },

      { label: '更新面板', callback: `/${e.game === 'sr' ? '星铁' : '原神'}更新面板` },
      { label: `面板`, callback: `/面板` },

      { label: '扫码绑定', callback: `/扫码绑定` },
    ]
    button.push(...Bot.Button(list, 2))

    const list2 = []
    for (let role of roleList)
      list2.push({ label: role, callback: `/${e.game === 'sr' ? '星铁' : '原神'}${role}面板` })
    button.push(...Bot.Button(list2, 2))
    return button
  }

  bingUid(e) {
    const game = (e.game === 'sr' || e.isSr) ? '星铁' : ''
    const list = [
      { label: '扫码绑定', dcallback: '/扫码绑定' },
    ]
    const list2 = [
      { label: '更新面板', callback: `/${game}更新面板` },
      { label: '绑定UID', data: `/${game}绑定` }
    ]
    const button = []
    button.push(...Bot.Button(list))
    button.push(...Bot.Button(list2))
    return button
  }

  rank(e){
    const game = (e.game === 'sr' || e.isSr) ? '星铁' : ''
    const role = e.msg.replace(/(#| |老婆|老公|星铁|原神|最强|最高分|排名|排行|第一|最高|最牛|圣遗物|评分|群|群内|面板|面版|武器[1-7]?|伤害([1-9]+\d*)?)/g,'')
    const list = [
      { label: `最强${ (role == '') ? '面板' : role }`, callback: `/最强${role}` },
      { label: `最高分${ (role == '') ? '面板' : role }`, callback: `/最高分${role}` },

      { label: '最强排行', callback: `/最强${role}排行` },
      { label: '最高分排行', callback: `/最高分${role}排行` },

      { label: `${game}${role}面板`, callback: `/${game}${role}面板` },
      { label: '极限面板', callback: `/${game}${role}极限面板` },
    ]
    return Bot.Button(list, 2)
  }

  detail(e){
    const raw = e.raw_message.replace(/\*|\/|#|极限|核爆|辅助|平民|毕业|老婆|老公|星铁|原神/g, '').trim()
    const reg = /^#*([^#]+)\s*(详细|详情|面板|面版|圣遗物|武器[1-7]?|伤害([1-9]+\d*)?)\s*(\d{9})*(.*[换变改].*)?$/
    const name = reg.exec(raw)[1]
    const game = (e.game === 'sr' || e.isSr) ? '星铁' : ''
    if (/(详情|详细|面板)更新$/.test(raw) || (/更新?( )?(\d{9})?$/.test(raw) && /(详情|详细|面板)$/.test(raw))) {
      const button = this.profile (e)
      return button
    } else {
      const button = []
      const list = [
        { label: `${name}面板`, callback: `/${name}面板` },
        { label: `面板帮助`, callback: `/面板帮助` },

        { label: `${name}攻略`, callback: `/${game}${name}攻略` },
        { label: `${name}排行`, callback: `/${game}${name}排行` },

        { label: `最强${game}${name}`, callback: `/最强${game}${name}` },
        { label: '极限面板', callback: `/${e.game === 'sr' ? '星铁' : '原神'}${name}极限面板` },

        { label: `${name}天赋`, callback: `/${game}${name}天赋` },
        { label: `${name}命座`, callback: `/${game}${name}命座` },
      ]
      button.push(...Bot.Button(list, 2))
      const list2 = [
        { label: '绑定UID', data: `/${game}绑定` },
        { label: '扫码绑定', callback: `/扫码绑定` },
        { label: '更新面板', callback: `/${game}更新面板` },
      ]
      button.push(...Bot.Button(list2))
      return button
    }
  }

  avatarList(e) {
    const game = (e.game === 'sr' || e.isSr) ? '星铁' : ''
    const list = [
      { label: '深渊', callback: `/${game}深渊` },
      { label: '探索', callback: `/${game}探索` },
      { label: game == '星铁' ? '星琼' : '原石', callback: `/${game == '星铁' ? '星琼' : '原石'}` },
      { label: '练度统计', callback: `/${game}练度统计` },
      { label: '体力', callback: `/体力` },
    ]
    const button = Bot.Button(list,3)
    return button
  }
}