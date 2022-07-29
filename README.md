# merkle-ts
Merkle tree &amp; utilities in TypeScript
Created by: Lucas Armstrong - Lucas@throneit.com - github.com/LucasArmstrong
Date: 6/4/2022
License: MIT

### Calculate a Merkle Root from a directory of files recursively
- First set or export environment variable `ASSET_DIRECTORY_PATH` to the directory you want to process.
- Then run `npm run process`
- Digests and calculates a Merkle Root for the entire specified directory and contents

### Test
- Execute tests with `npm run test`
- Runs a variety of tests proving that the MerkleTree class correctly calculates the merkle root for a set of data

### Merkle Tree Info.
In cryptography and computer science, a hash tree or Merkle tree is a tree in which every "leaf" (node) is labelled with the cryptographic hash of a data block, and every node that is not a leaf (called a branch, inner node, or inode) is labelled with the cryptographic hash of the labels of its child nodes. A hash tree allows efficient and secure verification of the contents of a large data structure. A hash tree is a generalization of a hash list and a hash chain.
- Read more at https://en.wikipedia.org/wiki/Merkle_tree