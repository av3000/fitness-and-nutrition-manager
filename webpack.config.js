const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  resolve: {
    modules: ["src", "node_modules"],
  },
  plugins: [new Dotenv()],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: process.env.DOCKER_ENV
      ? process.env.DOCKER_PORT
      : process.env.LOCAL_PORT,
    open: true,
    hot: true,
  },
};
