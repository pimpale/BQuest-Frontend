// Development config

const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: [
      'main.js'
    ],
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'build/[name].js',
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  module: {
    rules: [
      // sass + css rules from here:
      // https://github.com/webpack-contrib/mini-css-extract-plugin
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(js|jsx)$/,
        use: ["babel-loader"],
      },
      {
        test: /\.(pdf|jpg|png|gif|ico|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000
            }
          },
        ]
      },
      {
        test: /\.svg\.inline$/,
        use: [
          {
            loader: 'svg-inline-loader',
          }
        ]
      }
    ],
  },
  devtool: 'eval-source-map',
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'WEBPACK': JSON.stringify(process.env.WEBPACK || ''),
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  watchOptions: {
    poll: 2000,
    ignored: /node_modules/,
  },
  devServer: {
    contentBase: [path.join(__dirname, 'pages')],
    hot: true,
    historyApiFallback: true,
    port: 8080,
  },
};
