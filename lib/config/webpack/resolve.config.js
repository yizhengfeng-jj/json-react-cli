const path = require('path');
const ctx = process.cwd();
const {join} = path;
module.exports = {
    alias: {
        components: join(ctx, './src/components')
    }
}