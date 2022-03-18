import { toHash, compare } from '../lib';
// If you installed simple-nodejs-password using NPM, and are using TypeScipt,
// please replace the above line with:
// import {toHash, compare } from 'simple-nodejs-password';

// Suppose you got this variable from a backend sign up  or login route
// for the async/await and promise examples below. In practice,
// users should obviously use more complicatd passwords.
const password = 'pass123';

/// ////////////////// Example using async/await:
const asyncAwaitExample = async () => {
  // Use the toHash() function to hash a password.
  const hashedPassword = await toHash({ password });

  // A user would now save hashedPassword to their favorite database...

  // Create another hash.
  const hash2 = await toHash({ password });

  // This should evaluate to false, because multiple hashes
  // produces different results:
  if (hashedPassword === hash2) {
    console.log('Hashing the same text multiple times produces THE SAME hash.');
  } else {
    console.log(
      'Hashing the same text multiple times produces DIFFERENT hashes.',
    );
  }

  // And when a user supplies a password to be compared with a stored one (like on sign in),
  // you use the 'compare' function:
  const incorrect = await compare({
    stored: hashedPassword,
    supplied: 'incorrect-password',
  });

  const correct = await compare({
    stored: hashedPassword,
    supplied: password,
  });

  // incorrect should be false, and correct should be true:
  if (!incorrect && correct) {
    console.log(
      'The compare() function relates a stored hash with a user supplied password.',
    );
  }
};

asyncAwaitExample();

/// ////////////////// Example using Promise .then() syntax:
toHash({ password })
  .then((hashedPassword) => {
    // A user would now save hashedPassword to their favorite database...

    // And a user would compare a supplied password with the stored hashed
    // password like this:
    return compare({
      stored: hashedPassword,
      supplied: password,
    });
  })
  .then((passwordsMatch) => {
    // The compare() function returns a boolean that is true if passwords match, false
    // otherwise.
    if (passwordsMatch) {
      console.log(
        'The toHash() and compare() functions also work with Promise .then() syntax.',
      );
    } else {
      console.log(
        'The toHash() and compare() functions fail with Promise .then() syntax.',
      );
    }
  })
  .catch((err) => console.error(`Error: ${err.message}`));
