<template>
  <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" @sort-change="sortChange">
    <el-table-column v-if="checkbox" type="selection" width="55"></el-table-column>
    <el-table-column v-if="index" type="index" width="50"></el-table-column>

      <el-table-column  v-for="item in column"  :key="item.prop" :prop="item.prop" :label="item.label"
        :width="item.width" :sortable="item.sort" :sort-by="item.sort_by" :render-header="item.render_header" >
        <template slot-scope="scope">
          <slot v-if="item.type === 'slot'"  :name="item.slot_name" :data="scope.row"></slot>
          <component v-else :data="scope.row" :config="item" :prop="item.prop" :is="!item.type ? 'com-text' : `com-${item.type}`"></component>
          <!-- <div v-html="item.callback && item.callback(scope.row)"></div> -->
        </template>
      </el-table-column>
      <!-- slot -->
      <!-- <el-table-column  v-if="item.type === 'slot'" :key="item.prop" :prop="item.prop" :label="item.label"
        :width="item.width" :sortable="item.sort" :sort-by="item.sort_by"  :render-header="item.render_header" >
        <template slot-scope="scope">
          <slot :name="item.slot_name" :data="scope.row"></slot>
        </template>
      </el-table-column>

      <el-table-column v-else :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width" :sortable="item.sort" :sort-by="item.sort_by"  :render-header="item.render_header" >
      </el-table-column> -->

  </el-table>
</template>

<script>
//自动化规则，通过type属性，自动读取到相应的目录组件
//使用node.js读取文件  context接收三个参数  第一个是指定的读取目录  第二个参数 是否读取子目录 true/false,第三个参数是读取指定后缀的文件
const modules = {}//定义一个空对象
const files = require.context("../control", true, /\index.vue$/)
files.keys().forEach(item => {
  console.log(item);//./function/index.vue
  const key = item.split('/')
  const name=key[1]//function
  const component = files(item).default//获取到当前文件导出的默认模块
  console.log(component);//{components: {…}, computed: {…}, mounted: {…}, methods: {…}, data: ƒ, …}
  //组件名拼接  组件集成
  modules[`com-${name}`] = files(item).default
})
console.log(modules);
console.log(files,222);
export default {
  name: 'Table',
  props: {
    //勾选数据
    checkList: {
      type: Array,
      default: () => []
    },
    //表头数据
    column: {
      type: Array,
      default: () => []
    },
    //复选框
    checkbox: Boolean,
    index: Boolean,
    //父组件是否接收子组件的返回值
    onLoad: Boolean,
    format:Function,
    //是否默认初始化请求
    initRequest: {
      type: Boolean,
      default: false
    },
    //请求地址
    url: {
      type: String,
      default: '',
      require: true
    },
    //请求的方式 post get
    method: {
      type: String,
      default: 'post',
      require: true
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    params: {
      type: Object,
      default: () => ({}),

    }
    // checkbox: {
    //   type: Boolean,
    //   default: true
    // },
  },
  components: {
    ...modules

  },
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          sex: '男',
          id:20
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          sex: '女'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    };
  },



  computed: {},

  mounted() {
  this.initRequest&&this.getTableList()
  },
  methods: {
    //复选框回调
    handleSelectionChange(val) {
      console.log(val);
      this.$emit("update:checkList", val);
    },
    //远程排序
    sortChange(column, prop, order) {
      //console.log(column, prop, order);
      const sort_by = column.sortBy
      console.log(sort_by,order);
    },
    getTableList() {
      const url = this.url
      if (!url) {
        console.log('请求地址不存在')
        return false
      }
      const request_data = {
        method: this.method,
        url: this.url,
      }
      //参数处理
      if (JSON.stringify(this.data) !== '{}') {
        request_data.data = this.data
      }

      if (JSON.stringify(this.params) !== '{}') {
        request_data.params = this.params

      }
      //接口请求
      this.axios().then(response => {
        let response_data = response.data.data
        if (this.format && typeof this.format === 'function') {
          response_data = this.format(response.data.data)
         }
        this.tableData = response_data
        //回调函数
        this.onLoad && this.$emit("onload", response_data)
        // if (this.onLoad) {
        //   this.$emit("onload", response.data.data)
        // }
      })
    },
    handlerRequest() {
      this.getTableList()
    }
  }
}

</script>
<style lang='less' scoped>

</style>
