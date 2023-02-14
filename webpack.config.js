module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/i,
        loader: "svg-react-loader",
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
};
