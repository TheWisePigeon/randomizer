var colors = {
  cyan: '\x1b[36m',
  green: '\x1b[32m',
}

function now() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var secondes = date.getSeconds();

  return [hours, minutes, secondes]
    .map(n => (n < 10 ? '0' : '') + n.toString())
    .join(':');
}

function print(rawMessage, withDate, color, newLine) {
  var message = (withDate ? now() + ' - ' : '') + rawMessage;

  if (color) {
    message = color + message + '\x1b[0m';
  }

  if (newLine) {
    message += '\n';
  }

  process.stdout.write(message);
}

function println(rawMessage, withDate, color) {
  return print(rawMessage, withDate, color, true);
}

module.exports = {
  colors: colors,
  now: now,
  print: print,
  println: println,
};
