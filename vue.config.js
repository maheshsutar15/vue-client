module.exports = {
  outputDir: 'client',
  publicPath: '/',
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  },
  pwa: {
    name: "Wireless Data Logger",
    themeColor: "#42b983",
    msTileColor: "#42b983",
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png'
    },
    appleMobileWebAppCache: "yes",
    manifestOptions: {
      background_color: "#42b983"
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    hotOnly: false,
    proxy: {
      '/server': {
        // target: 'http://localhost:3000/',
        target: 'http://103.168.165.46/server',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/server': ''
        }
      }
    }
  }
}
