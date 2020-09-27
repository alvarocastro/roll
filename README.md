# Roll

[![NPM](https://img.shields.io/npm/v/@alvarocastro/roll.svg)](https://www.npmjs.com/package/@alvarocastro/roll)
[![Build Status](https://travis-ci.com/alvarocastro/roll.svg?branch=master)](https://travis-ci.com/alvarocastro/roll)
[![Maintainability](https://badgen.net/codeclimate/maintainability/alvarocastro/roll)](https://codeclimate.com/github/alvarocastro/roll/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/alvarocastro/roll/badge.svg?branch=master)](https://coveralls.io/github/alvarocastro/roll?branch=master)
[![Bundle Size](https://badgen.net/bundlephobia/min/@alvarocastro/roll)](https://bundlephobia.com/result?p=@alvarocastro/roll)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

Library to parse and roll dices from a string as a `AdX` dice notation roll, like `1d6` and even simple transforms like `2d10+5`, but it also supports more complex rolls like `1d8-1d6/2`.

- [Install](#install)
- [Usage](#usage)
- [Roll details](#roll-details)
- [Contributing](#contributing)
- [Support](#support)
- [Related](#related)

## Install

```bash
npm install -g @alvarocastro/roll
```

## Usage

```js
const roll = require('@alvarocastro/roll');

roll('1d6');
// => 3

roll('2d8');
// => 11

roll('1d3+1d6');
// => 7

roll('4+3d10/1d6');
// => 6.33333
```

### roll(rollString[, rollCallback])

Returns the result of the parsed and rolled `rollString`.

#### rollString

Type: `String`

Rolls to make in the form of `AdX` supporting basic mathematical expressions.

#### rollCallback

Type: `Function`

Function called for every sub roll made, it receives the sub roll string as first parameter and an array of roll results as second parameter.

```js
roll('2d6+1d8', (roll, results) => {
	console.log(roll, results);
});
// => "2d6", [3, 4]
// => "1d8", [7]
```

## Roll details

To get a detailed output of the roll being made, to check for duplicate rolls, "critical" rolls, etc. `roll.detailed()` is provided.

```js
const roll = require('@alvarocastro/roll');

roll.detailed('2d10+4');
// => {
//   result: 17,
//   rolls: [
//     {
//       roll: '2d10',
//       result: [
//         7,
//         6
//       ]
//     }
//   ]
// }
```

## Contributing

Contributions are always welcome! Please run `npm test` beforehand to ensure everything is ok.

## Support

If you use this package please consider starring it :)

## Related

* [@alvarocastro/roll-cli](https://github.com/alvarocastro/roll-cli) - CLI version of this library.
