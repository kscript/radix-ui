module.exports = {
  webpack: function(config, env) {
    config.ignoreWarnings = [/Failed to parse source map/]
    return config;
  }
}