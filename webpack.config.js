const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  devServer: {
    port: 3000,
    static: path.join(__dirname, "src", "static"),
  },
  devtool: "inline-source-map",
  entry: "./src/index.tsx",
  mode: process.env.FROM_LOCAL ? "development" : "production",
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        loader: "ts-loader",
        test: /\.(t|j)sx?$/,
      },
      {
        rules: [
          {
            test: /\.(scss|css)$/,
            use: [
              // fallback to style-loader in development
              process.env.NODE_ENV === "production"
                ? MiniCssExtractPlugin.loader
                : "style-loader",
              "css-loader",
            ],
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "mana/",
              publicPath: "mana/",
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
              publicPath: "fonts/",
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "app", "pack"),
    publicPath: "/",
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new MiniCssExtractPlugin()],
  resolve: {
    alias: {
      "@theme": path.resolve(__dirname, "src/theme"),
    },
    extensions: ["*", ".js", ".ts", ".tsx"],
    plugins: [new TsconfigPathsPlugin({ extensions: ["*", ".js", ".ts", ".tsx"] })],
  },
  target: "electron-renderer",
};
