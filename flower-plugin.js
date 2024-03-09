export default class Button {
  constructor () {
    this.plugin = {
      name: 'flower-plugin',
      dsc: 'flower-plugin',
      priority: 100,
      rule: [
        {
          reg: '^#?((星铁)?)*(10|[武器池常驻]*([一二三四五六七八九]?[十百]+)|抽)[连抽卡奖][123武器池常驻]*$',
          fnc: 'gacha'
        },
        {
          reg: '^#?(星铁)?定轨$',
          fnc: 'gacha'
        },
        {
          reg: '^#?(我的|领取|查询|查看)(纠缠|相遇|粉|蓝)(之缘|球)?$',
          fnc: 'gacha'
        },
        {
          reg: '^#?((星铁)?)*单抽[12武器池常驻]*$',
          fnc: 'gacha'
        },
        {
          reg: '^(#?)*(原神)?转生$',
          fnc: 'relife'
        }
      ]
    }
  }

  gacha (e) {
    const button = []
    const game = e.isSr ? '星铁' : ''
    const weapon = e.isSr ? '光锥' : '武器'
    let number = e.msg.match(/(([一二三四五六七八九]?[单十百10])|抽)[连抽卡奖]/)
    let type = e.msg.match(/武器|常驻|2/)
    if (e.msg.match(/定轨/)) {
      number = []
      type = []
      number[0] = '十连'
      type[0] = e.isSr ? '光锥' : '武器'
    }

    if (type == null) {
      type = []
      type[0] = ''
    }
    type[0] = type[0].replace(/武器/, '武器池').replace(/光锥/, '光锥池').replace(/常驻/, '常驻池')

    let list = [
      { label: 'up池1', callback: `#${game}${number[0]}` },
      { label: 'up池2', callback: `#${game}${number[0]}2` },
      { label: '常驻池', callback: `#${game}${number[0]}常驻池` }
    ]
    button.push(list)

    list = [
      { label: '定轨', callback: `#${game}定轨` },
      { label: `${weapon}池`, callback: `#${game}${number[0]}${weapon}池` }
    ]
    button.push(list)

    list = [
      { label: '单抽', callback: `#${game}单抽${type[0]}` },
      { label: '十连', callback: `#${game}十连${type[0]}` }
    ]
    if (e.bot.config?.markdown && [4, '4'].includes(e.bot.config.markdown.type)) { list.push({ label: '保底', callback: `#${game}${(type[0].match(/武器|光锥/)) ? '八十' : '九十'}连${type[0]}` }) }
    button.push(list)

    type = ['', '2', '常驻池', `${weapon}池`]
    type[0] = type[Math.floor(Math.random() * type.length)]
    number = ['十连', '十连', '单抽']
    if (e.bot.config?.markdown && [4, '4'].includes(e.bot.config.markdown.type)) { number.push(`${(type[0].match(/武器|光锥/)) ? '八十' : '九十'}连`) }
    number[0] = number[Math.floor(Math.random() * number.length)]

    if (number[0] == '派蒙') {
      list = [
        { label: '交给派蒙抽', callback: '抽卡的钱被小派蒙拿去买甜甜花酿鸡了' }
      ]
    } else {
      list = [
        { label: '交给派蒙抽', callback: `#${game}${number[0]}${type[0]}` }
      ]
    }
    button.push(list)

    return Bot.Button(button)
  }

  relife () {
    const button = [
      { label: '重生提瓦特之我是', callback: '#转生' }
    ]
    return Bot.Button(button)
  }
}
