const path = require("path");

module.exports = {
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  resolve: {
    modules: ["src", "node_modules"],
  },
  plugins: [],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
    open: true,
    hot: true,
  },
};
