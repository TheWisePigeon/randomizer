#!/usr/bin/env node
var program = require('commander');
var path = require('path');
var fs = require('fs');
var tsnodemon = require('../lib/tsnodemon');

program
  .version('0.1.0')
  .option('-t, --tsc [value]', 'Tsc arguments. Default: --watch)', '--watch')
  .option(
    '-x, --exec [value]',
    'Exec command. Default: node ["main" from package.json])',
  )
  .option('-c, --colors', 'Display logs in colors')
  .parse(process.argv);

if (typeof program.exec === 'undefined') {
  var pathPackageJson = path.resolve(process.cwd(), 'package.json');
  var packageJson = {};
  var script = 'dist/index.js';

  try {
    packageJson = require(pathPackageJson);
  } catch (e) {
    // No package.json found
  }

  if (packageJson && packageJson.main) {
    script = packageJson.main;
  } else {
    var pathTsconfigJson = path.resolve(process.cwd(), 'tsconfig.json');
    var tsconfigJson = {};

    try {
      tsconfigJson = require(pathTsconfigJson);
    } catch (e) {
      // No tsconfig.json found
    }

    if (tsconfigJson && tsconfigJson.compilerOptions) {
      if (tsconfigJson.compilerOptions.outFile) {
        script = tsconfigJson.compilerOptions.outFile;
      } else if (tsconfigJson.compilerOptions.outDir) {
        script = path.join(tsconfigJson.compilerOptions.outDir, 'index.js');
      }
    }
  }

  program.exec = 'node ' + script;
}

var execArr = program.exec.split(' ');

tsnodemon.compileAndStart(
  program.tsc.replace(/\\/g, '').split(' '),
  execArr[0],
  execArr.slice(1).concat(program.args),
  program.colors,
);
