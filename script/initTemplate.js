const path = require('path');
const chalk = require('chalk');
const os = require('os');
const validateProjectName = require('validate-npm-package-name');
const packageJson = require('../package.json');
const fs = require('fs-extra');
module.exports.initTemplate = function(projectName) {
    // 在copy template之前，需要检测projectName的几个合法问题
    // 1: projectName文件名是不是合法
    // 2：projectName是不是已经存在
    // console.log(process.cwd(), 'process.cwd()...process.cwd()..');
    const template = path.resolve(__dirname, '..', './template');
    const root = path.resolve(__dirname, '..', projectName);
    const appName = path.basename(root);
    // 判断名称是否合法
    checkAppName(appName);

    // 判断有没有这个文件夹
    // fs.ensureDirSync(appName);

    // copy template的内容给到指定文件夹
    copyFile(root, template);

    // 写入package.json
    writePackage(root, appName);
}; 

const checkAppName = appName => {
    const validateResult = validateProjectName(appName);
    
    const {validForNewPackages, warnings} = validateResult;
    if(!validForNewPackages) {
        process.exit(1);
    }
}

const writePackage = (root, appName) => {
    const packageJson = {
        name: appName,
        version: '1.0.0',
        private: true
    };

    // 将script写入package.json
    packageJson.scripts = Object.assign({
        start: 'json-react-cli start-cli',
        build: 'json-react-cli build-cli',
        test: 'json-react-cli test-cli',
        eject: 'json-react-cli eject-cli',
    });

    const fileName = path.join(root, 'package.cli.json');
    fs.writeFileSync(fileName, JSON.stringify(packageJson, null, 2) + os.EOL);
}

const copyFile = (root, template) => {
    if(!fs.existsSync(root)) {
        fs.mkdirSync(root);
    }

    // 读取文件夹
    fs.readdir(template, (error, pathRoutes) => {
        console.log(template, pathRoutes, 'pathRoutes....pathRoutes..');
        pathRoutes.forEach(pathRoute => {
            // 排除隐藏文件
            if (!/^\./.test(pathRoute)) {
                // 判断一下文件是否存在
                const filePath = path.join(template, pathRoute);
                fs.stat(filePath, function(err, data){ 
                    if(data) {
                        const copyPath = path.resolve(root, pathRoute === 'gitignore.txt' ? '.gitignore' : pathRoute);
                        if(data.isFile()) {
                            // 读取文件
                            fs.createReadStream(filePath).pipe(fs.createWriteStream(copyPath));
                        }else {
                            copyFile(copyPath, filePath);
                        }
                    }
                 });
            }
        })
        
    })
}