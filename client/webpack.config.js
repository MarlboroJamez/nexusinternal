const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'index_bundle.js',
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  target: 'web',
  devtool: "source-map",
  devServer: {
      port: '3000',
      static: {
          directory: path.join(__dirname, 'public'),
      },
      open: true,
      hot: true,
      liveReload: true,
      historyApiFallback: true,
      proxy: {
        '/': {
             target: 'http://localhost:3000',
             router: () => 'http://localhost:5000',
             logLevel: 'debug' /*optional*/
        }
     }
    },
  resolve: {
      extensions: ['.js', '.jsx', '.json'],
  },
  module: {
      rules: [
          {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: 'babel-loader',
          },
          {
            test: /\.(pdf)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: 'pdfs/',
                },
              },
            ],
          },
          {
              test: /\.css$/i,
              use: ['style-loader', 'css-loader', 'postcss-loader'],
          },
          {
            test: /\.(png|jpe?g|gif|ico)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192,
                  name: 'images/[name].[ext]'
                }
              }
            ]
          },
      ],
  },
  optimization: {
    minimize: false,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: path.join(__dirname, 'public', 'index.html'),
      }),
  ],
};
