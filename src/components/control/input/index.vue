<template>
  <div>
    <el-input v-model="val"  @input="inputEnter"></el-input>
  </div>
</template>

<script>
export default {
  name: 'InputComponent',
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      val:''
    };
  },
  watch: {
    value: {
      handler(newValue) {
        this.val = newValue
        console.log(newValue,'0000');
      },
      immediate: true
    }
  },

  components: {},

  computed: {},

  mounted: {},

  methods: {
    inputEnter() {
      //同步更新父组件属性所绑定的值
      this.$emit('update:value', this.val)
    }
  }
}

</script>
<style lang='less' scoped>
</style>
