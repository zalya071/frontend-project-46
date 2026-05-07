import _ from 'lodash';
import path from 'path';
import readFile from './readFile.js';
import parse from './parser.js';

const formatValue = (value) => {
  if (typeof value === 'string') {
    return value;
  }

  return String(value);
};

const genDiff = (filepath1, filepath2) => {
  const data1 = parse(
    readFile(filepath1),
    path.extname(filepath1).slice(1),
  );

  const data2 = parse(
    readFile(filepath2),
    path.extname(filepath2).slice(1),
  );

  const keys = _.sortBy(
    [...Object.keys(data1), ...Object.keys(data2)],
  );

  const uniqueKeys = _.uniq(keys);

  const lines = uniqueKeys.flatMap((key) => {
    if (!Object.hasOwn(data2, key)) {
      return `  - ${key}: ${formatValue(data1[key])}`;
    }

    if (!Object.hasOwn(data1, key)) {
      return `  + ${key}: ${formatValue(data2[key])}`;
    }

    if (data1[key] === data2[key]) {
      return `    ${key}: ${formatValue(data1[key])}`;
    }

    return [
      `  - ${key}: ${formatValue(data1[key])}`,
      `  + ${key}: ${formatValue(data2[key])}`,
    ];
  });

  return `{\n${lines.join('\n')}\n}`;
};

export default genDiff;