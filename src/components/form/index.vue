<!--  -->
<template>
  <el-form ref="form" :model="field" label-width="80px">
    <template v-for="(item, index) in form_item">
      <el-form-item  :key="item.prop" :label="item.label" :prop="item.prop"
        :rules="item.rules">
        <slot v-if="item.type==='slot'" :name="item.slot_name"></slot>
        <component v-else :value.sync="field[item.prop]" :config="item"  :is="!item.type ? 'com-text' : `com-${item.type}`"/>
      </el-form-item>
      <!-- <el-form-item v-if="item.type === 'select'" :key="item.prop" :label="item.label" :prop="item.prop">
        <el-select v-model="field[item.prop]"></el-select>
      </el-form-item> -->
    </template>
    <el-form-item>
      <el-button v-for="item in button" :key="item.key" :type="item.type" :loading="item.loading"
        @click="handlerBtn(item)">{{ item.label }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import createRules from './createRules.js'
//自动化规则，通过type属性，自动读取到相应的目录组件
//使用node.js读取文件  context接收三个参数  第一个是指定的读取目录  第二个参数 是否读取子目录 true/false,第三个参数是读取指定后缀的文件
const modules = {}//定义一个空对象
const files = require.context("../control", true, /\index.vue$/)
files.keys().forEach(item => {
  console.log(item);//./function/index.vue
  const key = item.split('/')
  const name = key[1]//function
  const component = files(item).default//获取到当前文件导出的默认模块
  console.log(component);//{components: {…}, computed: {…}, mounted: {…}, methods: {…}, data: ƒ, …}
  //组件名拼接  组件集成
  modules[`com-${name}`] = files(item).default
})
export default {
  name: 'form',
  components: {
    ...modules

  },
  props: {
    item: {
      type: Array,
      default: () => []
    },
    field: {
      type: Object,
      default: () => { }
    },
    button: {
      type: Array,
      default: () => []
    },
    beforeSubmit:Function,
    // rules: {
    //   type: Object,
    //   default: () => {}
    // }
  },
  data() {
    return {
      form_item: [],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },



  computed: {},
  beforeMount() {
    this.form_item = createRules(this.item)
  },
  mounted: {

  },

  methods: {
    handlerBtn(data) {
      if (data.key === 'submit') {
        this.submit(data)
        return false
      }
      if (data.key === 'cancel') {
        this.cancel(data)
        return false
      }
      //其他按钮
      data.callback && data.callback(data)
      console.log(data.key);
    },
    submit(data) {
      console.log('表单校验');
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (typeof this.beforeSubmit === 'function') {
            this.$set(data, 'loading', true);
            this.beforeSubmit().then(response => {
              this.$set(data, 'loading', false);
            }).catch(() => {
              this.$set(data, 'loading', false);

            });
          }
        } else {
          return false
        }
      });
    },
    cancel(data) {
      console.log('表单重置');
      this.$refs.form.resetFields();
      data.callback && data.callback(data)

    }

  }
}

</script>
<style lang='less' scoped>

</style>
