import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ensureDirectoryExistence = (filePath) => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
};

const generateIndex = () => {
  const generatedDir = path.resolve(__dirname, '../types/__generated');
  const indexPath = path.resolve(generatedDir, 'index.ts');
  const folders = ['api', 'contracts'];

  ensureDirectoryExistence(indexPath);

  const exports = folders
    .filter((folder) => fs.existsSync(path.resolve(generatedDir, folder)))
    .map((folder) => {
      if (folder === 'api') {
        return `export * from './${folder}/fastAPI';`;
      }
      return `export * from './${folder}';`;
    })
    .join('\n');

  fs.writeFileSync(indexPath, exports, { encoding: 'utf-8' });
  console.log('Generated index.ts with exports from existing folders.');

  // Update the main index.ts
  const mainIndexPath = path.resolve(__dirname, '../types/index.ts');
  const mainIndexExport = "export * from './__generated';\n";

  if (fs.existsSync(mainIndexPath)) {
    const mainIndexContent = fs.readFileSync(mainIndexPath, {
      encoding: 'utf-8',
    });
    if (!mainIndexContent.includes(mainIndexExport)) {
      fs.appendFileSync(mainIndexPath, mainIndexExport);
      console.log('Appended export statement to src/shared/types/index.ts.');
    } else {
      console.log(
        'Export statement already exists in src/shared/types/index.ts.',
      );
    }
  } else {
    ensureDirectoryExistence(mainIndexPath);
    fs.writeFileSync(mainIndexPath, mainIndexExport, { encoding: 'utf-8' });
    console.log('Created src/shared/types/index.ts with export statement.');
  }
};

generateIndex();
