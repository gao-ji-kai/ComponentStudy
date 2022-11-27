<template>
  <div>
    <el-button @click="getCheckList">数据测试</el-button>
    <a-table ref="table" :init-request="false" on-load @onLoad="onload" :check-list.sync="check_list"
      :format="formatData" :column="column" checkbox index url="/api/name/" :data="data_1" :params="params_1">
      <template v-slot:operation="slot">
        {{ slot.data.id }}
        <a-button type="primary" @click="jump(slot.data)">增加</a-button>
        <a-button type="warning">删除</a-button>
      </template>
    </a-table>
  </div>

</template>

<script>
// @ is an alias to /src
//父组件 :checkbox="false"

export default {
  name: 'TableView',
  components: {
    'a-button': () => import("@/components/button/index.vue"),
    'a-table': () => import("@/components/table/index.vue")
  },
  data() {
    return {
      column: [
        {
          type: 'function',
          label: 'Url地址',
          prop: 'date',
          callback: (data) => {
            console.log(data,333)
            return 111
          }
        },
        { label: '名称', prop: 'name' },
        { label: '地址', prop: 'address', sort: 'custom', sort_by:'aaaa', type:"function"},
        { label: '性别', prop: 'sex', sort: true },
        {
          type: 'slot',
          label: '操作',
          prop: 'operation',
          slot_name: 'operation',
          render_header: (h, { column, $index }) => {
            return (
              <div>
                <p>操作</p>
                <el-input value=''/>
              </div>
            )
          }
        },
      ],
      data_1: {
        name: 'gjk'
      },
      params_1: {
        name: 'wyh'
      },
      check_list: []
    }
  },
  watch: {
    check_list: {
      handler(value) {
        console.log(value);
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.table.handlerRequest
    }, 2000)
  },
  methods: {
    //点击跳转
    jump(data) {
      console.log(data)
    },
    onload(data) {
      console.log(data)
    },
    //格式化数据方法
    formatData(data) {
      console.log(111, data)
    },
    //按钮获取选中的数据
    getCheckList() {
      console.log(this.check_list);
    }

  }
}
</script>


