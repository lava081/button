export default class Button {
  constructor () {
    this.plugin = {
      name: 'l-plugin',
      dsc: 'l-plugin',
      priority: 100,
      rule: [
        {
          reg: '^#?[lL]\\s?(插件)?[\\s_]?(help|帮助)$',
          fnc: 'help'
        },
        {
          reg: '^#?每日一题|随机一题|(昨日|今日)?题解',
          fnc: 'LeetCode'
        },
        {
          reg: '^#?抽签|求签|御神签$',
          fnc: 'kauChim'
        },
        {
          reg: '^#?咱?(今天|明天|[早中午晚][上饭餐午]|早上|夜宵|今晚)吃(什么|啥|点啥)',
          fnc: 'what2eat'
        },
        {
          reg: '^#?塔罗牌',
          fnc: 'tarot'
        },
        {
          reg: '^#?r(oll)? ',
          fnc: 'roll'
        }
      ]
    }
  }

  help () {
    const button = [
      [
        { label: '塔罗牌', callback: '塔罗牌' },
        { label: '美食推荐', callback: '今天吃什么' },
        { label: '求签', callback: '求签' }
      ], [
        { label: 'LeetCode', data: '随机一题' }
      ], [
        { label: '骰子', data: 'r 1 6' },
        { label: '帮我选', data: 'roll 塔罗牌 求签' }
      ]
    ]
    return Bot.Button(button)
  }

  LeetCode () {
    const button = [
      { label: '再来一题', data: '随机一题' },
      { label: '查看题解', data: '题解' }
    ]
    return Bot.Button(button)
  }

  kauChim () {
    const button = [
      { label: '我要解签…', callback: '御神签' }
    ]
    return Bot.Button(button)
  }

  what2eat () {
    const button = [
      { label: '换一批', callback: '今天吃什么' }
    ]
    return Bot.Button(button)
  }

  tarot () {
    const button = [
      { label: '再卜一卦', callback: '塔罗牌' }
    ]
    return Bot.Button(button)
  }

  roll (e) {
    const button = [
      { label: '我不满意', data: e.msg }
    ]
    return Bot.Button(button)
  }
}
