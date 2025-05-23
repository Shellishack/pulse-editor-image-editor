import { ModuleFederationPlugin } from "@module-federation/enhanced/webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import pulseConfig from "./pulse.config";
import { Configuration as WebpackConfig } from "webpack";
import { Configuration as DevServerConfig } from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";

const previewConfig: WebpackConfig & DevServerConfig = {
  entry: {
    main: "./preview/index.tsx",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./preview/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "globals.css",
    }),
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, use: "ts-loader" },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
          },
        ],
      },
    ],
  },
  devServer: {
    port: 3030,
    hot: true, // Enable Hot Module Replacement
  },
  mode: "development",
};

const mfConfig: WebpackConfig & DevServerConfig = {
  entry: "./src/main.tsx",
  output: {
    publicPath: "auto",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "globals.css",
    }),
    new ModuleFederationPlugin({
      // Do not use hyphen character '-' in the name
      name: pulseConfig.id,
      filename: "remoteEntry.js",
      exposes: {
        "./main": "./src/main",
      },
      shared: {
        react: {
          requiredVersion: "19.1.0",
          import: "react", // the "react" package will be used a provided and fallback module
          shareKey: "react", // under this name the shared module will be placed in the share scope
          shareScope: "default", // share scope with this name will be used
          singleton: true, // only a single version of the shared module is allowed
        },
        "react-dom": {
          requiredVersion: "19.1.0",
          singleton: true, // only a single version of the shared module is allowed
        },
        // Share Workbox configuration as a module
        "workbox-webpack-plugin": {
          singleton: true,
          requiredVersion: "^7.3.0",
        },
      },
    }),
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, use: "ts-loader" },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
          },
        ],
      },
    ],
  },
};

const config = process.env.PREVIEW === "true" ? previewConfig : mfConfig;

export default config;
