const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
// webpack.config.js
const Dotenv = require('dotenv-webpack');

const deps = require('./package.json').dependencies;
module.exports = {
  output: {
    publicPath: process.env.mainUrl
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json']
  },

  devServer: {
    port: process.env.devServerPort || 'http://localhost:8080/'
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'starter',
      filename: 'remoteEntry.js',
      remotes: {},
      exposes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom']
        }
      }
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html'
    }),
    new Dotenv()
  ]
};
