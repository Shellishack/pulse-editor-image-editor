import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";

const __dirname = dirname(fileURLToPath(import.meta.url));

const config = {
  entry: "./src/main.tsx",
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "dist"),
    libraryTarget: "module",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "globals.css",
    }),
    // Copy ./pulse.config.json to ./dist/pulse.config.json
    new CopyPlugin({
      patterns: [
        {
          from: resolve(__dirname, "pulse.config.json"),
          to: resolve(__dirname, "dist"),
        },
      ],
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
  experiments: {
    outputModule: true, // This enables ES module output
  },
};

export default config;
