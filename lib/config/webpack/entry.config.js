const path = require('path');
const ctx = process.cwd();
const {join} = path;

module.exports = {
    entry: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', join(ctx, 'src/index.js')] }