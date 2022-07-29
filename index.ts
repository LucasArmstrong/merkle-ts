import { MerkleFileProcessor } from './src/merkle/MerkleFileProcessor';

const directoryPath = process.env.ASSET_DIRECTORY_PATH || './src/assets';

try {
  console.log(`\n\n------------------- Processing directory -------------------`);
  MerkleFileProcessor.processDirectory(directoryPath.trim());
  } catch (err) {
    console.error(err);
}