const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
      vendor: './assets/js/vendor.js',
      main: './assets/js/main/main.js',
      linkInBio: './assets/js/linkinbio/linkinbio.js',
      analytics: './assets/js/analytics/analytics.js',
      linkInBioView: './assets/js/linkinbio/linkinbio-view.js',
      shortcode: './assets/js/shortcode/shortcode.js',
      domainJs: './assets/js/domain/domain.js',
      styles: './assets/css/main.scss',
      stylesshort: './assets/css/shortcode.scss',
      customLinkinbio: './assets/css/linkinbio.scss',
      domainStyle: './assets/css/domain.scss',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'static/js'),
    },
    module: {
      rules: [
        {
          test: /\.scss$/, 
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '../css/[name].css',
      }),
    ],
  };