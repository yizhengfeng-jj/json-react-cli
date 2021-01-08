#!/usr/bin/env node 
const path = require('path');
const commander = require('commander');
const chalk = require('chalk');
const {initTemplate} = require('../script/initTemplate');
const package = require('../package.json');
const {sync: glob} = require('glob');

let projectName;
const execCommand = (commander, path) => {
    const {command, run, description, args} = require(path);
    const comConfig = commander.command(command); // 存入命令配置

    args.forEach(arg => {
        comConfig.option(...arg);
    });

    comConfig.description(description);
    comConfig.action(run);
}

function run() {
    const paths = glob(path.join(__dirname, '../lib/cli/*.js'));
    paths.forEach(path => {
        execCommand(commander, path);
    });
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

    commander.parse(process.argv)
    // initTemplate(projectName)
}

run();