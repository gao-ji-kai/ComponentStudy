<template>
  <div>{{data[prop]}}</div>
</template>

<script>
export default {
  name: 'ComText',
  props: {
    prop: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default:()=> ({}),
    },
    config: {
      type: Object,
      default: () => ({}),
    }

  },
  data () {
    return {
      aaa:'text'
    };
  },

  components: {},

  computed: {},

  mounted: {},

  methods: {}
}

</script>
<style lang='less' scoped>
</style>
