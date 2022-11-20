<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column v-if="checkbox" type="selection" width="55"></el-table-column>
    <el-table-column v-if="index" type="index" width="50"></el-table-column>
    <template v-for="item in column" >
      <el-table-column v-if="item.type === 'function'" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width">
        <template slot-scope="scope">
          <div v-html="item.callback && item.callback(scope.row)"></div>
        </template>
      </el-table-column>
      <!-- slot -->
      <el-table-column v-if="item.type === 'slot'" :key="item.prop" :prop="item.prop" :label="item.label"
        :width="item.width">
        <template slot-scope="scope">
          <slot :name="item.slot_name" :data="scope.row"></slot>
        </template>
      </el-table-column>

      <el-table-column v-else :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width">
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
export default {
  name: 'Table',
  props: {
    column: {
      type: Array,
      default: () => []
    },
    checkbox: Boolean,
    index: Boolean,
    url: {
      type: String,
      default: '',
      require:true
    },
    method: {
      type: String,
      default: 'post',
      require: true
    }
    // checkbox: {
    //   type: Boolean,
    //   default: true
    // },
  },
  data() {
    return {
      tableData: [
        // {
        //   date: '2016-05-02',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1518 弄',
        //   sex: '男',
        //   id:20
        // },
        // {
        //   date: '2016-05-04',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1517 弄',
        //   sex: '女'
        // },
        // {
        //   date: '2016-05-01',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1519 弄'
        // },
        // {
        //   date: '2016-05-03',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1516 弄'
        // }
      ]
    };
  },

  components: {},

  computed: {},

  mounted(){
    this.getTableList()
  },
  methods: {
    getTableList() {
      const url = this.url
      if (!url) {
        console.log('请求地址不存在')
        return false
      }
      this.axios({
        method: this.method,
        url: this.url,
      }).then(response => {
        this.tableData =response.data.data
      })
    }
  }
}

</script>
<style lang='less' scoped>

</style>
