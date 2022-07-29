import { MerkleFileProcessor } from './src/merkle/MerkleFileProcessor';

const directoryPath = process.env.ASSET_DIRECTORY_PATH || './src/assets';

try {
  console.log(`\n\n------------------- Processing single file -------------------`);
  MerkleFileProcessor.processFile(`${directoryPath}/hashList.txt`);
  console.log(`\n\n------------------- Processing directory -------------------`);
  MerkleFileProcessor.processDirectory(directoryPath);
  } catch (err) {
    console.error(err);
}