const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  webpack: function(config, env) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    config.ignoreWarnings = [/Failed to parse source map/]
    config.plugins.push(new MiniCssExtractPlugin({
      filename: "[name].css",
    }));
    return config;
  }
}