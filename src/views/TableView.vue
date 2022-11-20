<template>
 <a-table :column="column" checkbox index></a-table>
</template>

<script>
// @ is an alias to /src
//父组件 :checkbox="false"

export default {
  name: 'TableView',
  components: {
    'a-table': () => import("@/components/table/index.vue")
  },
  data() {
    return {
      column: [
        { label: '日期', prop: 'date',width:100},
        { label: '名称', prop: 'name' },
        { label: '地址', prop: 'address'},
        { label: '性别', prop: 'sex'},

      ]
    }
  },
  methods: {


  }
}
</script>


