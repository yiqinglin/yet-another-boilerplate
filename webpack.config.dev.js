/* eslint-disable */
var nodeExternals = require('webpack-node-externals');
var path = require('path');

module.exports = [
  /**
  * Client
  */
  {
    entry: './src/client/index.js',
    devtool: 'inline-source-map',
    output: {
      filename: 'bundle.js',
      path: __dirname + '/public'
    },
    resolve: {
      modules: ['node_modules', './src/client'],
      /**
      * Overriding the default to allow jsx to be resolved automatically.
      * Add '.mjs' before '.js' for webpack to correctly resolve .mjs files from https://github.com/graphql/graphql-js/issues/1272
      */
      extensions: ['.mjs', '.js', '.json', '.jsx'],
      alias: {
        '~': path.resolve(__dirname, './src/client')        
      }
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: {
            // plugins: ['@babel/plugin-proposal-class-properties'],
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      ]
    }
  },
  /**
  * Server
  */
  {
    entry: './src/server/index.js',
    /**
    * XXX For some reasn source maps only work correctly in node debugger when using inline
    * source map.
    */
    devtool: 'inline-source-map',
    /**
    * Ignore built-in node modules like path, fs, etc.
    */
    target: 'node',
    /**
    * Webpack causes __dirname and __filename to return undefined. This fixes it.
    * info: https://github.com/webpack/webpack/issues/1599
    */
    node: {
      __dirname: false,
      __filename: false
    },
    /**
    * Ignore anything in node_modules
    */
    externals: [nodeExternals()],
    output: {
      filename: './server.js'
    },
    resolve: {
      modules: ['./src/server'],
      /**
      * Access config from anywhere via `import settings from 'settings'``
      */
      alias: {
        settings: path.resolve(__dirname, './settings.js'),
        '~': path.resolve(__dirname, './src/server')
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-env']
          }
        }
      ]
    }
  }
]
