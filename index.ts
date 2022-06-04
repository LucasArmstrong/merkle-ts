const fs = require('fs');
import { MerkleTree } from './src/merkle/MerkleTree';

try {
    const hashListArray = fs.readFileSync('hashList.txt').toString().split("\n");
    const merkleHashList = new MerkleTree(hashListArray);
    console.log(`Merkle root for hashList.txt: ${merkleHashList.root}`);
  } catch (err) {
    console.error(err);
}