const HtmlWebpackplugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ctx = process.cwd();
const path = require('path');
const {join} = path;
module.exports = [
    new HtmlWebpackplugin(
        {
            template: join(ctx, './index.html'),
            filename: './index.html'
        }
    ),
    // 热更新
    new webpack.HotModuleReplacementPlugin()
]