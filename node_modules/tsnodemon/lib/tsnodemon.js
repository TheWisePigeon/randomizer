var spawn = require('child_process').spawn;
var fs = require('fs');
var path = require('path');
var util = require('./util');

/**
 * Start app
 */
function start(execCmd, execArgs) {
  var childProcess = spawn(execCmd, execArgs);

  childProcess.stdout.on('data', function(data) {
    process.stdout.write(data.toString());
  });

  childProcess.stderr.on('data', function(data) {
    process.stdout.write(data.toString());
  });

  return childProcess;
}

/**
 * Stop app
 */
function stop(childProcess) {
  if (childProcess) {
    childProcess.stdin.pause();
    childProcess.kill();
  }

  return childProcess;
}

/**
 * Restart app
 */
function restart(childProcess, execCmd, execArgs) {
  stop(childProcess);

  return start(execCmd, execArgs);
}

/**
 * Compile typescript and start app
 */
function compileAndStart(tscArgs, execCmd, execArgs, withColors) {
  var childProcess;
  var relativeTscPath = path.resolve(process.cwd(), 'node_modules/.bin/tsc');
  var tscPath = fs.existsSync(relativeTscPath) ? relativeTscPath : 'tsc';

  util.println(
    'Starting compilation...',
    true,
    withColors ? util.colors.cyan : null,
  );

  const tscProcess = spawn('node', [tscPath].concat(tscArgs));

  tscProcess.stderr.on('data', function(err) {
    util.print(err);
  });

  tscProcess.stdout.on('data', function(data) {
    var msg = data.toString();
    util.print(msg, false, withColors ? util.colors.cyan : null);

    if (msg.indexOf('Watching for file changes') !== -1) {
      var execStr = execCmd + ' ' + execArgs.join(' ');

      util.println(
        (childProcess ? 'Restarting' : 'Starting') + ': ' + execStr + '...',
        true,
        withColors ? util.colors.green : null,
      );

      if (childProcess) {
        stop(childProcess);
      }

      childProcess = start(execCmd, execArgs);
    }
  });
}

module.exports = {
  start: start,
  stop: stop,
  restart: restart,
  compileAndStart: compileAndStart,
};
