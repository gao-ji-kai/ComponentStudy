
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "src/style/scssconfig.scss";',
      }
    }
  }

})
