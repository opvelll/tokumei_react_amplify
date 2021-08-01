const TerserPlugin = require("terser-webpack-plugin");
const isProd = process.env.NODE_ENV === "production";
module.exports = {
  webpack: {
    configure: {
      optimization: {
        minimize: isProd,
        minimizer: isProd
          ? [
              new TerserPlugin({
                terserOptions: {
                  compress: {
                    drop_console: true,
                  },
                  output: {
                    comments: false,
                  },
                },
              }),
            ]
          : [],
      },
    },
  },
};
