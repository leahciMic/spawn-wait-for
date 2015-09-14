# spawn-wait-for [![Build Status](https://travis-ci.org/leahciMic/spawn-wait-for.svg?branch=master)](https://travis-ci.org/leahciMic/spawn-wait-for)

Spawn and wait for the process to output a line that matches a regex.

## Install

```sh
npm install --save spawn-wait-for
```

## Usage

```js
var spawnWaitFor = require('spawn-wait-for');

spawnWaitFor('fakeServer', /server is running/).then(function(obj) {
  obj = {
    process: Object, // a child process object,
    matches: Array, // the regex sub matches
    line: String // the line that matched
  };
});
```
