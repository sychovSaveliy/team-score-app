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
  },
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule  
      .use("svg-inline-loader")
      .loader("svg-inline-loader");
  }
};