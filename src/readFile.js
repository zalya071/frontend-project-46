import fs from 'fs';
import path from 'path';

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);

  return fs.readFileSync(absolutePath, 'utf-8');
};

export default readFile;