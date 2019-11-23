module.exports = {
  pluginOptions: {
    electronBuilder: {
      chainWebpackMainProcess: config => {
        config.plugin("define").tap(args => {
          args[0]["process.env.FLUENTFFMPEG_COV"] = false;
          return args;
        });
      }
    }
  }
};
