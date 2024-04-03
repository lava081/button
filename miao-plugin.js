/* 原作者：[风间叶](https://github.com/xiaoye12123/), [Lain.](https://github.com/Zyy955/), [夜](https://github.com/yeyeyye-eee) */
import Character from '../../../../miao-plugin/models/Character.js'

export default class Button {
  constructor () {
    this.plugin = {
      name: 'miao-plugin',
      dsc: 'miao-plugin',
      priority: 101,
      rule: [
        {
          reg: '^#?喵喵(命令|帮助|菜单|help|说明|功能|指令|使用说明)$',
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
          reg: '^(#|/)?(原神|星铁)?绑定(#|/)?(绑定)?( )?(uid|UID)?( )?[1-9]',
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
          reg: /^#?(原神|星铁)?(群|群内)?(.*)(排名|排行)(榜)?$/,
          fnc: 'rank'
        },
        {
          reg: /^#*([^#]+)\s*(详细|详情|面板|面版|圣遗物|武器[1-7]?|伤害([1-9]+\d*)?)\s*(\d{9})*(.*[换变改].*)?$/,
          fnc: 'detail'
        },
        {
          reg: /^(#(原神|星铁)?(角色|查询|查询角色|角色查询|人物)[ |0-9]*$)|(^(#*uid|#*UID)\+*[1|2|5-9][0-9]{8}$)|(^#[+|＋]*[1|2|5-9][0-9]{8})/,
          fnc: 'avatarList'
        },
        {
          reg: '#喵喵角色卡片',
          fnc: 'avatarList'
        },
        {
          reg: '#喵喵WIKI',
          fnc: 'tip'
        },
        {
          reg: /.*(攻略|天赋|技能|行迹|命座|命之座|星魂|资料|图鉴|素材|材料|天赋)[0-9]?$/,
          fnc: 'tip'
        }
      ]
    }
  }

  help () {
    const button = [
      { label: '圣遗物', data: '#圣遗物列表' },
      { label: '深渊', data: '#喵喵深渊' },
      { label: '练度统计', data: '#原神练度统计' },

      { label: '体力', data: '#原神体力' },
      { label: '今日素材', data: '#今日素材' },
      { label: '签到', data: '#原神签到' },

      { label: '绑定uid', data: '#原神绑定' },
      { label: '米游社扫码', data: '#扫码登录' },
      { label: '更新面板', data: '#原神更新面板' }
    ]
    return Bot.Button(button, 3)
  }

  profile (e) {
    const roleList = e?.newChar ? (Object.keys(e.newChar) || []) : []
    const game = (e.game === 'sr' || e.isSr) ? '星铁' : '原神'
    const button = []

    const list = [
      { label: '扫码登录', data: '#扫码登录' },
      { label: '更新面板', data: `#${game}更新面板` },
      { label: '绑定uid', data: `#${game}绑定` }
    ]
    button.push(...Bot.Button(list))

    const list2 = []
    for (let role of roleList) { list2.push({ label: role, data: `#${game}${role}面板` }) }
    button.push(...Bot.Button(list2, 2))
    return button
  }

  bingUid (e) {
    const game = (e.game === 'sr' || e.isSr) ? '星铁' : '原神'
    const list = [
      { label: '扫码登录', data: '#扫码绑定' }
    ]
    const list2 = [
      { label: '更新面板', data: `#${game}更新面板` },
      { label: '绑定uid', data: `#${game}绑定` }
    ]
    const button = []
    button.push(...Bot.Button(list))
    button.push(...Bot.Button(list2))
    return button
  }

  async rank (e) {
    let role = e.msg.replace(/(#|星铁|原神|喵喵|最强|最高分|第一|词条|双爆|双暴|极限|最高|最多|最牛|圣遗物|评分|群内|群|排名|排行|面板|面版|详情|榜)/g, '')
    const char = Character.get(role)
    const game = (char.game === 'sr') ? '星铁' : ''
    if (!char) {
      if (e.msg.match(/#(最强|最高分)(面板|排行)/)) {
        role = ''
      } else return false
    }
    const list = [
      { label: `最强${role ? role : '面板'}`, data: `#最强${role}` },
      { label: `最高分${role ? role : '面板'}`, data: `#最高分${role}` },

      { label: '最强排行', data: `#最强${role}排行` },
      { label: '最高分排行', data: `#最高分${role}排行` },

      { label: `${role ? role : '更新'}面板`, data: `#${game}${role ? role : '更新'}面板` }
    ]
    return Bot.Button(list, 2)
  }

  async detail (e) {
    const char = Character.get(e.avatar)
    const game = (char.game === 'sr') ? '星铁' : ''
    if (/(详情|详细|面板)更新$/.test(e.raw_message) || (/更新/.test(e.raw_message) && /(详情|详细|面板)$/.test(e.raw_message))) {
      const button = this.profile(e)
      return button
    } else {
      if (!char.name) return false
      const button = []
      const list = [
        { label: `${char.name}攻略`, data: `#${game}${char.name}攻略` },
        { label: `${char.name}排行`, data: `#${game}${char.name}排行` },

        { label: `${char.name}面板`, data: `#${game}${char.name}面板` },
        { label: '极限面板', data: `#${game}${char.name}极限面板` }
      ]
      button.push(...Bot.Button(list, 2))
      const list2 = [
        { label: '绑定uid', data: `#${game}绑定` },
        { label: '扫码登录', data: '#扫码登录' },
        { label: '更新面板', data: `#${game}更新面板` }
      ]
      button.push(...Bot.Button(list2))
      return button
    }
  }

  avatarList (e) {
    const game = (e.game === 'sr' || e.isSr) ? '星铁' : ''
    const list = [
      { label: '深渊', data: `#${game}深渊` },
      { label: '探索', data: `#${game}探索` },
      { label: game == '星铁' ? '星琼' : '原石', data: `#${game == '星铁' ? '星琼' : '原石'}` },
      { label: '练度统计', data: `#${game}练度统计` },
      { label: '体力', data: '#体力' }
    ]
    const button = Bot.Button(list, 3)
    return button
  }

  async tip (e) {
    const role = e.msg
    .replace(/(攻略|天赋|技能|行迹|命座|命之座|星魂|资料|图鉴|素材|材料|天赋)[0-9]?/, '')
    .replace(/#|星铁|原神|喵喵/g, '')
    const char = e.char || Character.get(role)
    const game = (char.game === 'sr') ? '星铁' : ''
    if (!char) return false
    let material = ''
    if (!game) {
      material = char.getMaterials()
      .find(material => material.num == 168)
    }
    const list = [
      [
        { label: `${char.name}攻略` }
      ],
      [
        { label: `${char.name}${game ? '行迹' : '天赋'}` },
        { label: `${char.name}${game ? '星魂' : '命座'}` }
      ],
      [
        { label: `${char.name}面板`, data: `#${game}${char.name}面板` },
        { label: '扫码登录', data: '#扫码登录' }
      ]
    ]
    if (material) {
      list.push([
        { label: '材料统计', data: `#${game}${char.name}材料` },
        { label: '今日素材', data: '#今日素材' }
      ])
      list.push([
        { label: `${material.label}点位`, data: `#${material.label}在哪里` }
      ])
    }
    if (!game) {
      list[0].push({ label: '参考面板', data: `#${game}${char.name}参考面板` })
      list[3].push({ label: '图鉴', data: `${char.name}图鉴` })
      list[4].push({ label: `${char.name}照片` })
    }
    return Bot.Button(list)
  }
}
