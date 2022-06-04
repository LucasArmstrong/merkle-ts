const fs = require('fs');
import { MerkleTree } from './src/merkle/MerkleTree';

try {
    const hashListArray = fs.readFileSync('hashList.txt').toString().split("\n");
    const merkleTree: MerkleTree = new MerkleTree(hashListArray);
    console.log(`MerkleTree processed ${hashListArray.length} lines of text from the hashList.txt`);
    console.log(`Merkle root for hashList.txt: ${merkleTree.root}`);
  } catch (err) {
    console.error(err);
}