const { commonConfig } = require("../config/webpack");
const server = require('../config/server');

exports.command = 'start-cli';

exports.description = '这是开启start 服务的命令';

exports.args = [
    ['--order', '我是start的命令']
]

exports.run = function() {
    const devConfig = commonConfig();

    devConfig.mode = 'development';
    server(devConfig);
}