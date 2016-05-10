module.exports = {
  context: __dirname,
  entry: "./javascript/entry.js",
  output: {
    path: "./javascript",
    publicPath: "/js/",
    filename: "bundle.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  devtool: 'source-maps'
};
