<template>
  <div v-html="config.callback && config.callback(data)"></div>
</template>

<script>
export default {
  name: 'ComTFunction',
  props: {
    prop: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    config: {
      type: Object,
      default: () => ({}),
    }

  },
  data () {
    return {
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
