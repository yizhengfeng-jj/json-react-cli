const path = require('path');
const chalk = require('chalk');
const os = require('os');
const spawn = require('cross-spawn');
const validateProjectName = require('validate-npm-package-name');
const packageJson = require('../package.json');
const fs = require('fs-extra');
module.exports.initTemplate = function(projectName) {
    // 在copy template之前，需要检测projectName的几个合法问题
    // 1: projectName文件名是不是合法
    // 2：projectName是不是已经存在
    const template = path.resolve(__dirname, '..', './template');
    const root = path.resolve(projectName);
    const appName = path.basename(root);
    // 判断名称是否合法
    checkAppName(appName);

    // 判断有没有这个文件夹
    // fs.ensureDirSync(appName);

    // copy template的内容给到指定文件夹
    copyFile(root, template);

    // 写入package.json
    writePackage(root, appName);

    // 安装依赖
    install(root);
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
        start: 'json-cli-script start-cli',
        build: 'json-cli-script build-cli',
        test: 'json-cli-script test-cli',
        eject: 'json-cli-script eject-cli',
    });

    const fileName = path.join(root, 'package.json');
    fs.writeFileSync(fileName, JSON.stringify(packageJson, null, 2) + os.EOL);
}

const copyFile = (root, template) => {
    if(!fs.existsSync(root)) {
        fs.mkdirSync(root);
    }

    // 读取文件夹
    fs.readdir(template, (error, pathRoutes) => {
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

const install = (root) => {
    console.log(root, 'root....root...');
    process.chdir(root);

    const command = 'npm';
    const args = [
        'install',
        '--save'
    ];

    const package = ['json-cli-script', 'react'];

    const child = spawn(command, args.concat(package), {stdio: 'inherit'});

    child.on('close', code => {
        if(code !== 0) {
            process.exit(1);
        }
    })
}