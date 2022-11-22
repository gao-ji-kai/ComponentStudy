<template>
  <div >
    <!-- <a-button type="success" :before-change="asyncFunction" :loading="flag"   >默认按钮</a-button>
    <a-button type="primary" border suffix="tongzhi" block>primary</a-button>
    <a-button type="success" size="small" prefix="xingxing">success</a-button>
    <a-button type="warning" disabled size="small" prefix="daohang">warning</a-button>
    <a-button type="danger" radio mini-width="160px" suffix="shangchuan">danger</a-button> -->



    <a-button  >默认按钮</a-button>
    <a-button type="primary">primary</a-button>
    <a-button type="success">success</a-button>
    <a-button type="warning">warning</a-button>
    <a-button type="danger">danger</a-button>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'ButtonView',
  components: {
    'a-button':()=>import("@/components/button/index.vue")
  },
  data() {
    return {
      flag:false
    }
  },
  methods: {
    asyncFunction() {
      return new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve()
        }, 3000)
      })
    },
    // handlerChange() {
    //   this.flag = true;
    //   setTimeout(() => {
    //     console.log(555)
    //     this.flag = false;
    //   },3000)
    // }
  }
}
</script>


