import { MerkleFileProcessor } from './src/merkle/MerkleFileProcessor';

const directoryPath = process.env.ASSET_DIRECTORY_PATH || './src/assets';

try {
  (async () => {
    const start = new Date().getTime();
    console.log(`\n\n------------------- Directory Processing Starting -------------------`);
    const directoryMerkleRoot: string = await MerkleFileProcessor.processDirectory(directoryPath.trim());
    console.log(`directory merkle root for ${directoryPath.trim()}:`, directoryMerkleRoot);
    const end = new Date().getTime();
    const runTimeSeconds = (end - start) / 1000;
    console.log(`Directory processing complete in ${runTimeSeconds} seconds.`);
  })();
  
  } catch (err) {
    console.error(err);
}