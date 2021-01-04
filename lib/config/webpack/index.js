// 获取公用配置
const commonConfig = () => {
    const entry = require('./entry.config');
    const output = require('./output.config');
    const resolve = require('./resolve.config');
    const plugins = require('./plugins.config');
    const rules = require('./rules');
    console.log(rules, 'rules...rules....');
    return {
        entry,
        output,
        resolve,
        module: {
            rules
        },
        plugins
    };
};

const devConfig = () => {
    const config = {
        devserver
    }
}

const proConfig = () => {

}

module.exports =  {commonConfig, devConfig, proConfig};