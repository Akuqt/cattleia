const path = require('path');

const watchFolders = [path.resolve(path.join(__dirname, '../../packages'))];

const nodeModulesPaths = [path.resolve(path.join(__dirname, './node_modules'))];

module.exports = {
  transformer: {
    publicPath: '/packages/assets/images',
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    nodeModulesPaths,
  },
  watchFolders,
  server: {
    enhanceMiddleware: middleware => {
      return (req, res, next) => {
        if (req.url.startsWith('/packages/assets/images')) {
          req.url = req.url.replace('/packages/assets/images', '/assets');
        } else if (req.url.startsWith('/packages/assets')) {
          req.url = req.url.replace('/packages/assets', '/assets/..');
        } else if (req.url.startsWith('/packages')) {
          req.url = req.url.replace('/packages', '/assets/../..');
        }
        return middleware(req, res, next);
      };
    },
  },
};
