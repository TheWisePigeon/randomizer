# tsnodemon

tsnodemon is a minimalist command to compile typescript in watch mode and restart nodejs app after incremental compilation

# Installation

Install typescript

```sh
npm install typescript --save-dev
```

Install tsnodemon

```sh
npm install tsnodemon --save-dev
```

Add command in package.json

```json
"scripts": {
  "watch": "tsnodemon -x 'node REPLACE_ENTRY_FILE.js'"
}
```

You can remove "-x" argument if you add "main" section in your package.json

```json
{
  "name": "tsnodemon",
  "main": "REPLACE_ENTRY_FILE.js",
  "scripts": {
    "watch": "tsnodemon"
  },
  "devDependencies": {
    "typescript": "^2.3.4",
    "tsnodemon": "^1.1.1"
  }
}
```