const fs = require('fs');
import { MerkleTree } from './src/merkle/MerkleTree';

const directoryPath = './src/examples/hashFiles';

try {
  console.log(`\n\n------------------- Processing single file -------------------`);
  processFile(`${directoryPath}/hashList.txt`);
  console.log(`\n\n------------------- Processing directory -------------------`);
  processDirectory(directoryPath);
  } catch (err) {
    console.error(err);
}

function processFile(filePath: string): string {
  const hashListArray = fs.readFileSync(filePath).toString().split("\n");
  const merkleTree: MerkleTree = new MerkleTree(hashListArray);
  console.log(`\nMerkleTree processed ${hashListArray.length} lines of text from the ${filePath}`);
  console.log(`Merkle root for hashList.txt: ${merkleTree.root}`);
  return merkleTree.root;
}

function processDirectory(directoryPath: string) {
  fs.readdir(directoryPath, function (err: Error, files: []) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    files.map(file => {
      return processFile(`${directoryPath}/${file}`);
    });
    const merkleTree: MerkleTree = new MerkleTree(files);
    console.log(`\nMerkle root for ${directoryPath}/: ${merkleTree.root}`);
  });
}