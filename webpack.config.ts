import { join, dirname } from "path";
import { ModuleFederationPlugin } from "@module-federation/enhanced/webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { fileURLToPath } from "url";
import pulseConfig from "./pulse.config";
import { Configuration as WebpackConfig } from "webpack";
import { Configuration as DevServerConfig } from "webpack-dev-server";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const modulePath = `http://localhost:3001/${pulseConfig.id}/${pulseConfig.version}/`;

const config: WebpackConfig & DevServerConfig = {
  entry: "./src/main.tsx",
  output: {
    publicPath: modulePath,
  },
  devServer: {
    static: {
      directory: join(__dirname, "dist"),
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
    port: 3001,
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
          requiredVersion: "19.0.0-rc-65e06cb7-20241218",
          import: "react", // the "react" package will be used a provided and fallback module
          shareKey: "react", // under this name the shared module will be placed in the share scope
          shareScope: "default", // share scope with this name will be used
          singleton: true, // only a single version of the shared module is allowed
        },
        "react-dom": {
          requiredVersion: "19.0.0-rc-65e06cb7-20241218",
          singleton: true, // only a single version of the shared module is allowed
        },
        // Share Workbox configuration as a module
        "workbox-webpack-plugin": {
          singleton: true,
          requiredVersion: "^7.3.0",
        },
      },
      getPublicPath: `function() {return "${modulePath}"}`,
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
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  },
};

export default config;
