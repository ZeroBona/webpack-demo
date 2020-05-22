const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    page1: './src/static/scripts/page1/page1.js',
    page2: './src/static/scripts/page2/page2.js'
  },
  output: {
    filename: 'js/[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../', // 使用css相对路径，避免图片引入路径出错
            },
          },
          'css-loader',
          'less-loader',
        ]
      },
      {
        test: /\.(gif|png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5 * 1024,
              name: 'static/[name]-[hash:8].[ext]',
              esModule: false,
            }
          },
        ]
      },
      {
        test: /\.html$/,
        use: ['html-withimg-loader'] // 处理html中引入图片
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,  // 排除node_modules在外，第三方代码已经处理了，不需要使用
        loader: 'babel-loader',
        options: { // 配置
          "plugins": [["@babel/plugin-transform-runtime", {           
            "corejs": 2,
            "helpers": true,
            "regenerator": true,
            "useESModules": false
         }]]
        }
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'page1.html',
      template: 'src/views/page1.html',
      chunks: ['page1']
    }),
    new HtmlWebpackPlugin({
      filename: 'page2.html',
      template: 'src/views/page2.html',
      chunks: ['page2']
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[chunkhash:8].css",
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    historyApiFallback: true,
    overlay: true,
    hot: true
  },
}