import path from 'path';
import readFile from './readFile.js';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import getFormatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parse(
    readFile(filepath1),
    path.extname(filepath1).slice(1),
  );

  const data2 = parse(
    readFile(filepath2),
    path.extname(filepath2).slice(1),
  );

  const tree = buildTree(data1, data2);

  const formatter = getFormatter(formatName);

  return formatter(tree);
};

export default genDiff;