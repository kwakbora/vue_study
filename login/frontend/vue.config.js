const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../backend/dist"),
  publicPath: './',
  devServer: {
    proxy: {
      "/": {
        proxyRoot: true,
        target: 'http://localhost:3000',
        ws: false
      }
    }
  }
}