const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackWatchedGlobEntries = require("webpack-watched-glob-entries-plugin");

const entries = WebpackWatchedGlobEntries.getEntries(
  [path.resolve(__dirname, "./src/js/**/*.ts")],
  {}
)();

const webpackConfig = {
  entry: entries,
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "docs"),
    // publicPath: "/src/",
    assetModuleFilename: "images/[hash][ext][query]",
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "docs"),
    },
    compress: true,
    port: 4000,
    open: true,
  },
  plugins: [new CleanWebpackPlugin()],
  module: {
    rules: [
      {
        test: /(\.s[ac]ss)$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "postcss-loader",
          "sass-loader", // compiles Sass to CSS, using Node Sass by default
        ],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  // resolve: {
  //   extensions: [".tsx", ".ts", ".js"],
  // },
};

Object.keys(webpackConfig.entry).forEach((key) => {
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      template: `./src/${key}.html`, // 読み込み元のhtmlパス
      filename: `./${key}.html`, // 出力するhtmlパス
      inject: true,
      chunks: [key], // insert to the root of output folder
    })
  );
});

module.exports = webpackConfig;
