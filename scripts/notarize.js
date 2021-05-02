const path = require('path');
// eslint-disable-next-line import-helpers/order-imports
const { notarize } = require('electron-notarize');

const appleId = process.env.APPLE_ID;
const appleIdPassword = process.env.APPLE_PASSWORD;

exports.default = async function notarizing(context) {
  if (!process.env.NOTARIZE || !appleId || !appleIdPassword) {
    return;
  }

  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== 'darwin') {
    return;
  }

  // eslint-disable-next-line import/no-dynamic-require, global-require
  const config = require(path.resolve(__dirname, '../package.json'));
  const appName = context.packager.appInfo.productFilename;

  await notarize({
    appBundleId: config.build.appId,
    appPath: `${appOutDir}/${appName}.app`,
    appleId,
    appleIdPassword,
    ascProvider: process.env.ASC_PROVIDER,
  });
};
