const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  entry: {
    page1: './src/static/scripts/page1/page1.js',
    page2: './src/static/scripts/page2/page2.js',

  },
  output: {
    filename: 'js/[name].[chunkhash:6].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
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
              name: 'static/[name]-[hash:6].[ext]',
              esModule: false,
            }
          },
        ]
      },
      {
        test: /\.html$/,
        use: ['html-withimg-loader'] // 处理html中引入图片
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'html/page1.html',
      template: 'src/views/page1.html',
      chunks: ['page1']
    }),
    new HtmlWebpackPlugin({
      filename: 'html/page2.html',
      template: 'src/views/page2.html',
      chunks: ['page2']
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[chunkhash:6].css",
    })
  ]
}