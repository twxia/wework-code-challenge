const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },

  devtool: 'inline-source-map',

  devServer: {
    inline: true,
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true,
    disableHostCheck: true,
    contentBase: path.resolve(__dirname, 'src'),
  },

  plugins: [
    // new BundleAnalyzerPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    config.devtool = false;
    config.plugins.push(
      new CopyWebpackPlugin([{
        from: 'src/index.html',
      }])
    );
    config.optimization = {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: false,
            },
          },
        }),
      ],
    };
  }

  return config;
};
