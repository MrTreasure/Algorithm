const context = {
  data() {
    return {
      // 右键菜单
      contextMenuData: {
        menuName: 'context-menu',
        axios: {
          x: null,
          y: null
        },
        menulists: [
          {
            name: this.$t('buttons.add'),
            icon: 'el-icon-plus',
            handler: 'add'
          },
          {
            name: this.$t('buttons.edit'),
            icon: 'el-icon-edit',
            handler: 'edit'
          },
          {
            name: this.$t('buttons.enable'),
            icon: 'el-icon-circle-check-outline',
            handler: 'enable'
          },
          {
            name: this.$t('buttons.disable'),
            icon: 'el-icon-remove-outline',
            handler: 'disable'
          },
          {
            name: this.$t('buttons.move'),
            icon: 'el-icon-rank',
            handler: 'move'
          },
          {
            name: this.$t('buttons.delete'),
            icon: 'el-icon-delete',
            handler: 'del'
          }
        ]
      }
    }
  },
  methods: {
    showMenu(e) {
      e.preventDefault()
      if (!this.selectNode) return
      this.contextMenuData.axios = {
        x: e.clientX,
        y: e.clientY
      }
    }
  }
}

export default context
