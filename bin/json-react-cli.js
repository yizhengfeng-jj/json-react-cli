#!/usr/bin/env node 
const path = require('path');
const commander = require('commander');
const chalk = require('chalk');
const {initTemplate} = require('../script/initTemplate');
const package = require('../package.json');

let projectName;

function run() {
    const cliArgs = ['start-cli', 'dll-cli'];
    let program = commander.command(package.name).version(package.version)
              .arguments('[project-name]')
              .usage(`${chalk.green('[project-name]')} [options]`)
              .action(name => {
                  projectName = name;
             })
             .option('--verbose', 'print additional logs')
             .option('--info', 'print environment debug info')
             .allowUnknownOption()
             .on('--help', () => {
                 console.log('aaa');
             })
             .parse(process.argv)
    
    // 如果projectName有值，那么初始一个template
    if(typeof projectName === 'undefined') {
         console.log('please specify the project diretory');
         console.log();
         console.log(` ${chalk.cyan(program.name())} ${chalk.green('<project-name>')}`);
         console.log();
         console.log('for example');
         console.log(` ${chalk.cyan(program.name())} ${chalk.green('my-app')}`);
         
         process.exit(1);
     }

     if(cliArgs.includes(projectName)) {
        console.log('命令工具');
     }else {
        initTemplate(projectName)
     }
     
}

run();