// eslint-disable-next-line import/no-unresolved
import test from 'ava';
import { toHash, compare } from '../src';
import { KEY_LENGTH, RANDOM_BYTES_SIZE } from '../src/constants';

const password = 'hashbrownsandketchup';

test('hashing the same password multiple times produces unique hashes', async (t) => {
  const hashed1 = await toHash({ password });
  const hashed2 = await toHash({ password });
  t.falsy(hashed1 === hashed2);
  t.falsy(hashed1.split('.')[0] === hashed2.split('.')[0]);
  t.falsy(hashed1.split('.')[1] === hashed2.split('.')[1]);
});

test('compares correct and incorrect passwords', async (t) => {
  const stored = await toHash({ password });
  const incorrect = await compare({ stored, supplied: 'friesandketchup' });
  const correct = await compare({ stored, supplied: password });
  t.deepEqual(incorrect, false);
  t.deepEqual(correct, true);
});

test('hashed password and salt are double the key length and random bytes size', async (t) => {
  const hashed = await toHash({ password });
  const [hashedPass, hashedSalt] = hashed.split('.');
  t.deepEqual(hashedPass.length, 2 * KEY_LENGTH);
  t.deepEqual(hashedSalt.length, 2 * RANDOM_BYTES_SIZE);
});
