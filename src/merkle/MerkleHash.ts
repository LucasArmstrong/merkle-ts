/** @module MerkleHash - hash utlities for MerkleTree */
/** Author: Lucas Armstrong - Lucas@throneit.com - github.com/LucasArmstrong */

/**
 * Imports
 * node:crypto - Used to calculate one way hashes
 * fs.createReadStream - For creating a hash from a file
 * MerkleDataType - all the data types used in MerkleTree
 */
 import * as crypto from 'node:crypto';
 import { createReadStream } from 'fs';
 import { MerkleDataType } from "./MerkleTree";

export class MerkleHash {
    
    /**
     * @method createHash - takes a MerkleDataType payload to generate a
     * 
     * @param data {MerkleDataType} - The value used to generate a hash
     * @returns {string}
     */
     static createHash(data: MerkleDataType, hashType = 'sha256'): string {
        const dataString: string = this.convertToString(data);
        return crypto.createHash(hashType).update(dataString).digest('hex');
    }

    /**
     * @method createHashFromFile - Static method to be used as utility in order to create a hash from a file of any size
     * @param filePath 
     * @returns {Promise<string>}
     */
    static async createHashFromFile(filePath: string, type: string = 'sha256'): Promise<string> {
        return new Promise((resolve, reject) => {
            const fileHash = crypto.createHash(type);
            const fileStream = createReadStream(filePath);
            fileStream.on('error', error => {
                reject(error);
            });
            fileStream.on('data', buffer => {
                fileHash.update(buffer.toString(), 'utf8');
            });
            fileStream.on('end', () => {
                resolve(fileHash.digest('hex'));
            });
        });
    }

    /**
     * @method convertToString - takes a MerkleDataType payload to generate a string for hashing
     * 
     * @param data {MerkleDataType}
     * @returns {string}
     */
     private static convertToString(data: MerkleDataType): string {
        const dataType: string = typeof data;
        switch(dataType) {
            case 'string':
            case 'boolean':
            case 'number':
                return data.toString();
            case 'object':
                return JSON.stringify(data);
            default:
                return dataType;
        }
    }
}