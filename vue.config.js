const path = require("path");

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
            @import "@/styles/_variables.scss";
            @import "@/styles/_global.scss";
          `
      }
    }
  },
  configureWebpack: {
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js'
    }
  }
};