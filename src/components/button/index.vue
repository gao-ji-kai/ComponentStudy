<template>
  <button
  @click="change"
  class="a-button"
  :disabled="disabled || loading ||load"
  :class="[theme, isBorder, isRound, sizes, blockCss]"
  :style="[miniWidthCss]">
    <span>
      <i v-if="loading || load " class="iconfont icon-prefix icon-loading" ></i>
      <i v-if="iconPrefix" class="iconfont icon-prefix " :class="iconPrefix"></i>
      <slot />
      <i v-if="iconSuffix" class="iconfont icon-suffix " :class="iconSuffix"></i>
    </span>

  </button>
</template>
<script>
export default {
  name: 'Abutton',
  props: {
    //按钮类型
    type: {
      type: String,
      default: ''
    },
    //按钮尺寸
    size: {
      type: String,
      default: ''
    },
    //固定宽度
    miniWidth: {
      type: String,
      default: ''
    },
    //前缀图标
    prefix: {
      type: String,
      default: ''
    },
   //后缀图标
    suffix: {
      type: String,
      default: ''
    },
    //边框
    border: Boolean,//默认false
    //圆角
    radio: Boolean,//默认false
    //禁用
    disabled: Boolean,//默认false
    //块级按钮
    block: Boolean,//默认false
    //lodaing
    loading: Boolean,//默认false
    beforeChange:Function,
  },
  computed: {
    theme() {
      return this.type ? `a-button-${this.type}` : ''
    },
    sizes() {
      return this.size ? `a-button-${this.size}` : ''
    },
    isBorder() {
      return this.border ? 'is-border' : ''
    },
    isRound() {
      return this.radio ? 'is-round' : ''
    },
    miniWidthCss() {
      if (!this.miniWidth) {
        return ''
      }
      return { 'min-width': this.miniWidth }
    },
    iconPrefix() {
      return this.prefix ? `icon-${this.prefix}` : ''
    },
    iconSuffix() {
      return this.suffix ? `icon-${this.suffix}` : ''
    },
    blockCss() {
      return this.block ? 'a-button-block' : ''
    }
  },

  data() {

      return {
        load:false
      }
  },
  methods: {
    //事件回调
    change() {
      if (typeof this.beforeChange === 'function') {
        this.load = true
        this.beforeChange().then(response => {
            this.load  =false
        }).catch(() => {
          this.load = false

        })
      }
        this.$emit('click')
    }
  }


}
</script>
<style lang="scss" scoped>
@import "./button.scss";
</style>
