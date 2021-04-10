const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

rules.push({
  test: /\.s?css$/,
  use: [{ loader: 'style-loader'}, { loader: 'css-loader' }, { loader: 'sass-loader' }]
}, {
  test: /\.txt/,
  type: 'asset'
});

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss']
  },
};
