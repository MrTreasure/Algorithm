const table = {
  data() {
    return {
      tableData: [], // 列表数据
      currentTableVal: null,
      showPage: false, // 是否显示分页组件
      multipleSelection: [], // 列表多选
      currentPage: 1, // 当前页数第一页
      currentSize: 10, // 当前分页数量
      totalCount: null // 应用列表总数量
    }
  },
  methods: {
    // 分页处理
    handlePageData(data) {
      this.tableData = data.list
      // 如果还有下一页，则显示分页插件
      if (data.total > 10) {
        this.showPage = true
      } else {
        this.showPage = false
        this.currentPage = 1
        this.currentSize = 10
      }
      this.totalCount = data.total
    },
    // 选项变化
    handleSelectionChange(multipleSelection) {
      this.multipleSelection = multipleSelection
    },
    handleCurrentChange(currentPage) {
      // 改变页数
      this.currentPage = currentPage
      this.getTableData()
    },
    handleSizeChange(currentSize) {
      // 选择页数
      this.currentSize = currentSize
      this.currentPage = 1
      this.getTableData()
    }
  }
}

export default table
