# Simple NodeJS Password

![npm](https://img.shields.io/npm/v/simple-nodejs-password?style=flat-square)
[![Actions Status](https://github.com/JessieFrance/simple-nodejs-password/workflows/Build%20and%20Test/badge.svg)](https://github.com/JessieFrance/simple-nodejs-password/actions)
[![codecov](https://codecov.io/gh/JessieFrance/simple-nodejs-password/branch/main/graph/badge.svg)](https://codecov.io/gh/JessieFrance/simple-nodejs-password)
[![GitHub license](https://img.shields.io/github/license/JessieFrance/simple-nodejs-password?style=flat-square)](https://github.com/JessieFrance/simple-nodejs-password/blob/main/LICENSE)

> A lightweight password hashing tool for NodeJS applications.

## Introduction

The `simple-nodejs-password` package is a tool for hashing and comparing passwords for backend NodeJS applications. It contains only two functions, `toHash` and `compare`. These two functions leverage
NodeJS's built-in `scrypt` and `randomBytes` functions from the native NodeJS [`crypto` package ](https://nodejs.org/api/crypto.html) to produce uniquely hashed passwords.

## Installation

    npm i simple-nodejs-password

## Examples

Below we provide examples for the `toHash` and `compare` functions using both `async/await` syntax and promise `.then()` syntax. Please see the examples folder for a [JavaScript](https://github.com/JessieFrance/simple-nodejs-password/blob/main/examples/example1.js) and a [TypeScript](https://github.com/JessieFrance/simple-nodejs-password/blob/main/examples/example1.ts) example.

### Hashing a Password with `toHash`

The `toHash` function hashes a user's text password.

#### `async/await` Syntax for `toHash`

Given a user's text password that is stored in the variable `password`, the `toHash` function creates a hashed password as follows:

```javascript
const hashAndSave = async () => {
  const hashedPassword = await toHash({ password });

  // Now save the hashed password to your favorite database...
};
```

In the above example, `hashedPassword` might be saved to MongoDB, PostgresSQL, or some other database for a backend `signup` route. The `compare` function [may then be used](#comparing-stored-and-supplied-passwords-with-compare) to check if a user's supplied password corresponds with the hashed password stored in the database.

#### Promise `.then()` Syntax for `toHash`

Suppose a user's text password is stored in the variable `password`. The `toHash` function may be used via Promise syntax as follows:

```javascript
toHash({ password })
  .then((hashedPassword) => {
    // Now save the hashed password to your favorite database...
  })
  .catch((err) => console.error(`Error: ${err.message}`));
```

In the above example, `hashedPassword` might be saved to MongoDB, PostgresSQL, or some other database for a backend `signup` route. The `compare` function [may then be used](#comparing-stored-and-supplied-passwords-with-compare) to check if a user's supplied password corresponds with the hashed password stored in the database.

### Unique Hashes

In the above `async/await` and promise `.then()` examples, calling the `toHash` function multiple times on the same text password will result in uniquely hashed passwords. For example, using `async/await` syntax:

```javascript
const someFunction = async () => {
  const hash1 = await toHash({ password });
  const hash2 = await toHash({ password });
  const hash3 = await toHash({ password });
};
```

The variables `hash1`, `hash2`, and `hash3` will all be _different_ strings.

### Comparing Stored and Supplied Passwords with `compare`

The `compare` function checks if a user's supplied password matches with whatever was previously stored as the hashed password in a database. Like the `toHash` function, `compare` also returns a promise. The `compare` function's promise resolves with a boolean that is `true` if the passwords match, and `false` otherwise.

#### `async/await` Syntax for `compare`

Suppose the variable `supplied` contains the text a user entered for their password on a login form. Suppose that this user's hashed password from the `toHash` section is stored in another variable called `stored`. Then, the following function checks if the passwords match:

```javascript
const someFunction = async () => {
  const passwordsMatch = await compare({
    stored,
    supplied,
  });

  if (passwordMatch) {
    // Password matched...
  } else {
    // They did not match...
  }
};
```

The variable `passwordMatch` will be 'true' if the user entered the correct password, and 'false' otherwise.

#### Promise `.then()` Syntax for `compare`

Suppose the variable `supplied` contains the text a user entered for their password on a login form. Suppose that this user's hashed password from the `toHash` section is stored in another variable called `stored`. Then, the following function checks if the passwords match:

```javascript
compare({ stored, supplied })
  .then((passwordMatch) => {
    if (passwordMatch) {
      // Password matched...
    } else {
      // They did not match...
    }
  })
  .catch((err) => console.error(`Error: ${err.message}`));
```

## License

MIT
