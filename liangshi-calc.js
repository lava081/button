export default class Button {
  constructor () {
    this.plugin = {
      name: 'liangshi-calc',
      dsc: 'liangshi-calc',
      priority: 99,
      rule: [
        {
          reg: '^#?(梁氏|伤害计算拓展|liangshi|面板拓展|计算拓展)(命令|帮助|菜单|help|说明|功能|指令|使用说明|预设面板)$',
          fnc: 'help'
        }
      ]
    }
  }

  async help () {
    const button = [
      { label: '极限面板', data: '#极限面板' },
      { label: '星铁极限面板', data: '#星铁极限面板' },
      { label: '核爆面板', data: '#核爆面板' },

      { label: '辅助面板', data: '#辅助面板' },
      { label: '平民面板', data: '#平民面板' },
      { label: '毕业面板', data: '#毕业面板' }
    ]
    return Bot.Button(button)
  }
}
