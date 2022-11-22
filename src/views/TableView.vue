<template>
 <a-table :column="column" checkbox index url="/api/name/">
    <template v-slot:operation="slot">
      {{slot.data.id}}
        <a-button type="primary" @click="jump(slot.data)">增加</a-button>
        <a-button type="warning">删除</a-button>
    </template>
 </a-table>
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
            console.log(data)
            return `<a href="https://element.eleme.io">${data.name}</a>`
          }
        },
        { label: '名称', prop: 'name' },
        { label: '地址', prop: 'address'},
        { label: '性别', prop: 'sex'},
        {
          type:'slot',
          label: '操作',
          prop: 'operation',
          slot_name:'operation'
        },

      ]
    }
  },
  methods: {
    jump(data) {
      console.log(data)
    }

  }
}
</script>


