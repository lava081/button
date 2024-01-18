export default class Button {
  constructor() {
    this.plugin = {
      name: "flower-plugin",
      dsc: "flower-plugin",
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

  gacha(e){
    const button = []
    const game = e.isSr?'星铁':''
    const weapon = e.isSr?'光锥':'武器'
    let number = e.msg.match(/(([一二三四五六七八九]?[单十百10])|抽)[连抽卡奖]/)
    let type = e.msg.match(/武器|常驻|2/)
    if(e.msg.match(/定轨/)){
      number = []
      type = []
      number[0] = '十连'
      type[0] = e.isSr?'光锥':'武器'
    }

    if(type == null){
      type = []
      type[0] = ''
    }
    type[0] = type[0].replace(/武器/, '武器池').replace(/光锥/, '光锥池').replace(/常驻/, '常驻池')

    let list = [
      { label: `up池1`, data: `/${game}${number[0]}`, enter: true },
      { label: `up池2`, data: `/${game}${number[0]}2`, enter: true },
      { label: `常驻池`, data: `/${game}${number[0]}常驻池`, enter: true },
    ]
    button.push(...Bot.Button(list))

    list = [
      { label: `定轨`, data: `/${game}定轨`, enter: true },
      { label: `${weapon}池`, data: `/${game}${number[0]}${weapon}池`, enter: true },
    ]
    button.push(...Bot.Button(list))

    list = [
      { label: `单抽`, data: `/${game}单抽${type[0]}`, enter: true },
      { label: `十连`, data: `/${game}十连${type[0]}`, enter: true },
    ]
    if ([4, '4'].includes(e.bot.config.markdown.type))
      list.push({ label: `保底`, data: `/${game}${(type[0].match(/武器|光锥/))?'八十':'九十'}连${type[0]}`, enter: true })
    button.push(...Bot.Button(list))

    type = ['','2','常驻池',`${weapon}池`]
    type[0] = type[Math.floor(Math.random()*4)]
    number = ['十连','十连','单抽']
    if ([1, '1', 4, '4'].includes(e.bot.config.markdown.type))
    number.push(`${(type[0].match(/武器|光锥/))?'八十':'九十'}连`)
    number[0] = number[Math.floor(Math.random()*4)]

    if(number[0] == '派蒙')
      list = [
        { label: `交给派蒙抽`, data: `抽卡的钱被小派蒙拿去买甜甜花酿鸡了`, enter: true },
      ]
    else
      list = [
        { label: `交给派蒙抽`, data: `/${game}${number[0]}${type[0]}`, enter: true },
      ]
    button.push(...Bot.Button(list))

    return button
  }

  relife(){
    const button = [
        { label: `重生提瓦特之我是`, data: `/转生`, enter: true },
    ]
    return Bot.Button(button)
  }
}
