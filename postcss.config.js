module.exports = {
  map: false,
  plugins: {
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 20,
      propList: ["*"],
      minPixelValue: 2
    }
  }
};
