# Simple NodeJS Password

[![Actions Status](https://github.com/JessieFrance/simple-nodejs-password/workflows/Build%20and%20Test/badge.svg)](https://github.com/JessieFrance/simple-nodejs-password/actions)
[![GitHub license](https://img.shields.io/github/license/JessieFrance/simple-nodejs-password?style=flat-square)](https://github.com/JessieFrance/simple-nodejs-password/blob/main/LICENSE)

> A lightweight password manager for NodeJS applications.

## Introduction

The `simple-nodejs-password` package is a tool for hashing and comparing passwords for backend NodeJS applications. It contains only two functions, `toHash` and `compare`. These two functions leverage
NodeJS's built-in `scrypt` and `randomBytes` functions from the native NodeJS [`crypto` package ](https://nodejs.org/api/crypto.html) to produce uniquely hashed passwords.

## Installation

## Examples

### Creating a Hashed Password with `toHash`

Given a user's text password that is stored in the variable `someText`, the `toHash` function creates a salted, hashed password with a length of 145 characters:

```javascript
const hashedPassword = await toHash({ password });
```

This `hashedPassword` may then be stored in your favorite database. Additionally, calling the `toHash` function multiple times will result in unique hashed passwords:

```javascript
const hash1 = await toHash({ password });
const hash2 = await toHash({ password });
const hash3 = await toHash({ password });
```

In the above code, `hash1`, `hash2`, and `hash3` are all _different_ strings.

### Comparing Stored and Supplied Passwords with `compare`

The `compare` function checks if a user's supplied password matches with whatever was previously stored as the hashed password in a database.

For example, suppose the variable `myPass` contains the text a user entered for their password on a login form. Suppose that the hashed password from the `toHash` section is stored in another variable called `hashedPassword`. Then, the following line checks if the passwords match:

```javascript
const passwordsMatch = await compare({
  stored: hashedPassword,
  supplied: myPass,
});
```

The variable `passwordMatch` will be 'true' if the user entered the correct password, and 'false' otherwise.

## License

MIT
