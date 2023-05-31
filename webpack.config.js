const webpack = require('webpack');

module.exports = {
  // ...他の設定...
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        // ここに必要な環境変数を設定する
      }
    })
  ]
};
