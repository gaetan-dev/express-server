// http://jlongster.com/Backend-Apps-with-Webpack--Part-I

var webpack = require('webpack')
var fs = require('fs')
var path = require('path')
var rimraf = require('rimraf')

var outputFolder = path.resolve(__dirname, 'build')

if (fs.existsSync(outputFolder)) {
  rimraf.sync(outputFolder + '/**')
} else {
  fs.mkdirSync(outputFolder)
}

// Fix:
// WARNING in ./~/express/lib/view.js
// Critical dependencies:
// 50:48-69 the request of a dependency is an expression
var nodeModules = {}
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

module.exports = {
  entry: './src/server.js',
  target: 'node',
  output: {
    path: outputFolder,
    filename: 'server.js'
  },
  externals: nodeModules,
  plugins: [
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    })
  ],
  devtool: 'sourcemap'
}
