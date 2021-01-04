
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const express = require('express');

const app = express();
module.exports = function(config) {
    console.log('66666666');
    const compiler = webpack(config);

    app.use(devMiddleware(compiler));

    // 热更新
    app.use(hotMiddleware(compiler));
    console.log('vvvvvaaaa');
    app.listen('8888');
}