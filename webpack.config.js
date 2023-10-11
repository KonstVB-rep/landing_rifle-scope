const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = (env) => {
  let mode = env.mode || "development";
  const isDev = mode === "development";
  const PORT = env.port || 3000;

  if (env.mode === "production") {
    mode = "production";
  }

  return {
    mode,
    entry: path.resolve(__dirname, "src", "index.js"),
    devtool: isDev ? "inline-source-map" : undefined,
    devServer: isDev
      ? {
          port: PORT,
          open: true,
        }
      : undefined,
    output: {
      filename: "[name].[contenthash].js",
      assetModuleFilename: "assets/[hash][ext][query]",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html"),
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
        {
          test: /\.css$/,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
          type: "asset/resource",
        },
      ],
    },
  };
};
