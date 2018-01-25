const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const plugins = [
  new ExtractTextPlugin('dist/underwear.unminified.css'),  
];

const pluginsWithMinification = [
  new ExtractTextPlugin('dist/underwear.css'),  
  new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: require('cssnano'),
    cssProcessorOptions: { discardComments: { removeAll: true } },
    canPrint: true
  }),
  new CopyWebpackPlugin([{ from: './fonts/LICENSE', to: 'dist/fonts' }])  
];

const config = {
  entry: './index.js',
  output: {
    filename: './dist/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: './fonts/[name].[ext]'
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  }
};

const configUnminified = { ...config, plugins };
const configMinified = { ...config, plugins: pluginsWithMinification };

module.exports = [configUnminified, configMinified];
