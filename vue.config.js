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
          icon: "src/renderer/assets/icon.png"
        },
        win: {
          target: ["nsis", "zip"],
          icon: "src/renderer/assets/icon.ico"
        },
        linux: {
          target: "AppImage",
          icon: "src/renderer/assets/icon.png"
        }
      },
      chainWebpackMainProcess: config => {
        config.plugin("define").tap(args => {
          args[0]["process.env.FLUENTFFMPEG_COV"] = false;
          return args;
        });
      },
      mainProcessFile: "src/main/index.ts",
      mainProcessWatch: ["src/main"]
    }
  },
  pages: {
    index: "./src/renderer/index.ts"
  }
};
