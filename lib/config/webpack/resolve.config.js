const path = require('path');
const ctx = process.cwd();
const {join} = path;
module.exports = {
    resolve: {
        alias: {
            components: join(ctx, './src/components')
        }
    }
}