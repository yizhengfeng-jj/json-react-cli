#!/usr/bin/env node 
const path = require('path');
const commander = require('commander');
const package = require('../package.json');
const {sync: glob} = require('glob');

const execCommand = (commander, path) => {
    const {command, run, description, args} = require(path);
    const comConfig = commander.command(command); // 存入命令配置

    args.forEach(arg => {
        comConfig.option(...arg);
    })
    comConfig.description(description);
    comConfig.action(run);
}

function run() {
    const paths = glob(path.join(__dirname, '../lib/cli/*.js'));

    paths.forEach(path => {
        execCommand(commander, path);
    });

    commander.version(package.version);
    commander.parse(process.argv);

    // console.log(commander.force, 'commander...commander...');
}

run();