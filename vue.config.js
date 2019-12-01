module.exports = {
  pluginOptions: {
    electronBuilder: {
      outputDir: "dist",
      builderOptions: {
        appId: "com.kyushun.app.gifizer",
        artifactName: "${productName}-${version}-${os}.${ext}",
        extraResources: ["bin/${os}/${arch}"],
        mac: {
          category: "public.app-category.graphics-design",
          target: "dmg",
          icon: "src/assets/icon.png"
        },
        win: {
          target: ["nsis", "zip"],
          icon: "src/assets/icon.png"
        },
        linux: {
          target: "AppImage",
          icon: "src/assets/icon.png"
        }
      },
      chainWebpackMainProcess: config => {
        config.plugin("define").tap(args => {
          args[0]["process.env.FLUENTFFMPEG_COV"] = false;
          return args;
        });
      }
    }
  }
};
