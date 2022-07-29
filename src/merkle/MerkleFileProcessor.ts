/** @module MerkleFileProcessor - utilities to find the Merkle Root of a file or directory  */
/** Author: Lucas Armstrong - Lucas@throneit.com - github.com/LucasArmstrong */

import { readFileSync, readdirSync, statSync } from 'fs';
import { MerkleTree } from './MerkleTree';

export class MerkleFileProcessor {

    /**
     * @method processFile - Generates a Merkle Root from a file buffer string
     * 
     * @param filePath 
     * @returns {string}
     */
    static processFile(filePath: string): string {
        const hashListArray = readFileSync(filePath).toString().split("\n");
        const merkleTree: MerkleTree = new MerkleTree(hashListArray);
        console.log(`\nMerkleTree processed ${hashListArray.length} lines of text from the ${filePath}`);
        console.log(`Merkle root for hashList.txt: ${merkleTree.root}`);
        return merkleTree.root;
    }
    
    /**
     * @method processDirectory - Recursively searches directory for files to generate a Merkle Root
     * 
     * @param directoryPath 
     * @returns {string}
     */
    static processDirectory(directoryPath: string): string {
        try {
            const fileHashRoots: string[] = [];
            const files: string[] = readdirSync(directoryPath);
            files.forEach(file => {
            const stat = statSync(`${directoryPath}/${file}`);
            if (stat?.isDirectory()) {
                fileHashRoots.push(MerkleFileProcessor.processDirectory(`${directoryPath}/${file}`));
            } else {
                fileHashRoots.push(MerkleFileProcessor.processFile(`${directoryPath}/${file}`));
            }
            });
            const merkleTree: MerkleTree = new MerkleTree(fileHashRoots);
            console.log(`\nMerkle root for ${directoryPath}/: ${merkleTree.root}`);
            return merkleTree.root;
        } catch (error) {
            console.log('Unable to scan directory: ', error);
            throw new Error(`processDirectory Error: ${error}`);
        }
    }
}