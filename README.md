# Nerder Index (N)

[![npm][npmimg]][npmurl]
[![Build Status][travisimg]][travisorg]
[![Commitizen friendly][czimg]][czcli]
[![Standard Version][stdimg]][stdurl]

## Contents

* [Dependencies](#dependencies)
* [Usage](#usage)
  * [API](#api)
    * [get(fn: string)](#getfn-string)
    * [analyse(fn: string)](#analysefn-string)
  * [TypeScript support](#typescript-support)
* [How](#how)
  * [Cyclomatic complexity](#cyclomatic-complexity)
  * [Number of parameters](#number-of-parameters)
  * [Operator index](#operator-index)
  * [Nerder Index (N)](#nerder-index-n-1)
    * [Examples](#examples)
  * [Result](#result)

## Dependencies

* Node >= 6.0.0
* NPM >= 3.0.0

## Usage

Install the "Nerder Index" generator:

```shell
npm i nerder-index
```

and import it in your application:

```javascript
const { get } = require('nerder-index');
```

### API

### get(fn: string)

Get the "Nerder Index" as a float number representing the difficulty of the given function.

**Parameters:**

* fn `string`

**Returns:**

* nerder index `float`

### analyse(fn: string)

Get a detailed object containing more information about the difficulty.

**Parameters:**

* fn `string`

**Returns:**

* Object `object`
  * nerder index `nerderIndex: float`
  * parameter count `parameterCount: int`
  * cyclomatic complexity: `complexity: int`
  * operator index `operatorIndex: int`

## TypeScript support

This module supports typescript and is packed with its own type definition file. The `analyse` function returns the interface `Report`.

## How

Following test setup was used to extract difficulty for a given functions (example):

```javascript
const { get } = require('nerder-index');
const fn = function test() { return 1; };
const result = get(fn.toString());
```

**Info:** The function to test has to be named, otherwise the resulting string is no valid JS on root level, needed for [esprima][es] to parse the code to an AST. `result` is an object containing multiple values calculated by [escomplex](esc).

Values relevant to calculate a difficulty level for one specific function are:

* **Cyclomatic complexity (C):** Defined by Thomas J. McCabe in 1976, this is a count of the number of cycles in the program flow control graph. Effectively the number of distinct paths through a block of code. Lower is better.
* **Number of parameters (P<sub>n</sub>):** Analysed statically from the function signature, so no accounting is made for functions that rely on the arguments object. Lower is better.
* **Operator index (o):** The number of total operators divided by the number of distinct operators. Lower is better.

### Cyclomatic complexity

The "cyclomaticy" is `C{1,...,n}`. A function without control constructs still has a complexity of `C = 1`. The following examples will demonstrate:

```javascript
// C = 1
function fn1() {
    return 1;
}

// C = 1
function fn2(p) {
    let a = 13;
    a = 2 * p / a - 5 + 42;
    return 42;
}

// C = 2
function fn3(a) {
    if (a) {
        return a;
    }
    return 1;
}
```

### Number of parameters

Number of parameters `P{n}` can be every natural number, but it should be restricted to max value. The parameters are a **multiplier**.

### Operator index

The operator index is defined by `o = oT / oD`. The following functions defines 8 (`function` and `return` keyword are excluded) distinct operators (`let`, `=`, `()`, `.`, `+`, `-`, `/`, `*`) and a total of 10.

```javascript
function fn2(p) {
    let a = 4;
    a = 2 * p / a - 5 + 42;
    return 42;
}
```

The operator index for this function is `o = 10 / 8 => 1.25`.

### Nerder Index (N)

```
N = o * Pn * C
```

#### Examples

Here is an example setup to calculate the "Nerder Index" for 4 functions:

```javascript
const { get } = require('nerder-index');

const fns = [
    function fn1() {
        return 1;
    },
    function fn2(c) {
        let a = 42;
        a = 2 * a / a - 5 + c;
        return 42;
    },
    function fn3(c, d) {
        let a = 23;
        a = 2 * a / a - d + 42;
        return a + c;
    },
    function fn4(a, b, c) {
        if (a === 0) {
            return b;
        }
        return c;
    }
];

fns.forEach((fn) => {
    const result = get(fn.toString());
    console.log('N =', result);
});
```

These methods produce the following results:

* N<sub>fn1</sub> = 0
* N<sub>fn2</sub> = 1.1
* N<sub>fn3</sub> = 2.4
* N<sub>fn4</sub> = 7.5

### Result

The "Nerder Index" is a float where `0` is an invalid index (no parameters defined, so no difficulty). Which index is "easy" or "hard" needs to be tested. All of this is just a first test to calculate the complexity of a method.

[npmurl]: https://www.npmjs.com/package/nerder-index
[npmimg]: https://img.shields.io/npm/v/nerder-index.svg
[travisimg]: https://travis-ci.org/MartinHelmut/nerder-index.svg?branch=master
[travisorg]: https://travis-ci.org/MartinHelmut/nerder-index
[czimg]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[czcli]: http://commitizen.github.io/cz-cli/
[stdimg]: https://img.shields.io/badge/release-standard%20version-brightgreen.svg
[stdurl]: https://github.com/conventional-changelog/standard-version
[es]: http://esprima.org/
[esc]: https://github.com/escomplex/escomplex
