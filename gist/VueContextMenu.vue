<template>
  <span class="vue-contextmenu-listWrapper" :class="'vue-contextmenuName-' + contextMenuData.menuName">
    <li v-for="item in contextMenuData.menulists" class="context-menu-list">
      <button @click.stop="fnHandler(item)">
        <i :class="item.icon"></i>
        <span>{{item.name}}</span>
      </button>
    </li>
  </span>
</template>
<script>
  export default {
    props: {
      contextMenuData: {
        type: Object,
        requred: false,
        default() {
          return {
            menuName: null,
            axios: {
              x: null,
              y: null
            },
            menulists: [

            ]
          }
        }
      },
      transferIndex: {
        type: Number,
        default: 0
      }
    },
    watch: {
      'contextMenuData.axios' (val) {
        var x = val.x
        var y = val.y
        var _this = this
        var index = _this.transferIndex
        var menuName = 'vue-contextmenuName-' + _this.contextMenuData.menuName
        var menu = document.getElementsByClassName(menuName)[index]
        menu.style.display = 'block'
        menu.style.left = x + 'px'
        menu.style.top = y + 'px'
        document.addEventListener('mouseup', function () {
          menu.style.display = 'none'
        }, false)
      }
    },
    methods: {
      fnHandler (item) {
        this.$emit(item.handler)
      }
    }
  }
</script>
<style>
  .vue-contextmenu-listWrapper {
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    
    border-radius: 4px;
    display: none;
    position: fixed;
    z-index: 9999;
    border: 1px solid #ebeef5;
    top: 0;
    left: 0;
    overflow: hidden;
  }
  .vue-contextmenu-listWrapper .context-menu-list {
    width: 150px;
    height: 32px;
    border-radius: 4px;
    text-decoration: none;
    list-style: none;
  }
  .vue-contextmenu-listWrapper .context-menu-list button {
    cursor: pointer;
    width: 100%;
    height: 100%;
    display: block;
    background: #fff;
    color: #606266;
    outline: 0;
    border: 0;
  }
  .vue-contextmenu-listWrapper .context-menu-list button i,  .vue-contextmenu-listWrapper .context-menu-list button span {
    float: left;
  }
  .vue-contextmenu-listWrapper .context-menu-list button i{
    padding: 0 10px 0 10px;
  }
  .vue-contextmenu-listWrapper .context-menu-list button:hover {
    box-shadow: 0px 1px 3px rgba(34, 25, 25, 0.2);
    color: #404040;
    /* border-radius: 4px; */
    /* background: -webkit-linear-gradient(bottom, #5a6a76 , #2e3940);
    background: -o-linear-gradient(bottom, #5a6a76, #2e3940);
    background: -moz-linear-gradient(bottom, #5a6a76, #2e3940); 
    background: linear-gradient(to bottom, #5a6a76 , #2e3940); */
    background: #f0f7ff;
  }
</style>
