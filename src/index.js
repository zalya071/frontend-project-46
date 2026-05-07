import path from 'path';
import readFile from './readFile.js';
import parse from './parser.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);

  const format1 = path.extname(filepath1).slice(1);
  const format2 = path.extname(filepath2).slice(1);

  const parsedData1 = parse(data1, format1);
  const parsedData2 = parse(data2, format2);

  console.log(parsedData1);
  console.log(parsedData2);
};

export default genDiff;