import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => (
  path.join(__dirname, '..', '__fixtures__', filename)
);

const readFixture = (filename) => (
  fs.readFileSync(getFixturePath(filename), 'utf-8')
    .replace(/\r\n/g, '\n')
    .trim()
);

test.each([
  [
    'file1Nested.json',
    'file2Nested.json',
    'stylish',
    'resultNested.txt',
  ],
  [
    'file1Nested.yml',
    'file2Nested.yml',
    'stylish',
    'resultNested.txt',
  ],
  [
    'file1Nested.json',
    'file2Nested.json',
    'plain',
    'resultPlain.txt',
  ],
  [
    'file1Nested.yml',
    'file2Nested.yml',
    'plain',
    'resultPlain.txt',
  ],
  [
    'file1Nested.json',
    'file2Nested.json',
    'json',
    'resultJson.txt',
  ],
  [
    'file1Nested.yml',
    'file2Nested.yml',
    'json',
    'resultJson.txt',
  ],
])(
  'gendiff %s %s %s',
  (file1, file2, format, result) => {
    const expected = readFixture(result);

    const filepath1 = getFixturePath(file1);
    const filepath2 = getFixturePath(file2);

    expect(genDiff(filepath1, filepath2, format)).toBe(expected);
  },
);