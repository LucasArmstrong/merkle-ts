/** @module MerkleTree - generates a Merkle Tree from a list of data */
/** Author: Lucas Armstrong - Lucas@throneit.com - github.com/LucasArmstrong */

/**
 * Imports
 * node:crypto - Used to calculate one way hashes
 */
import * as crypto from 'node:crypto';

/**
 * @type MerkleDataType - Union type containing the primitives handled by MerkleTree
 */
export type MerkleDataType = string | number | boolean | object;

/**
 * @interface IMerkleTree 
 */
export interface IMerkleTree {
    root: string;
    createHash(data: MerkleDataType): string;
}

/** MarkeleTree - This class generates a Merkle Root for provided list of type MerkleDataType */
export class MerkleTree implements IMerkleTree {

    /**
    * root - Merkle Root - contains the root hash calculated for the data values provided
    */
    private _root: string = '';
    public get root(): string {
        return this._root;
    }
    private set root(value: string) {
        this._root = value;
    }

    /**
    * type - Hash Type - the type of one way hash algorithm the MerkleTree uses to build hashes
    */
    private type: string = '';
    
    /**
    * hashRecords - Hash Log - a list of hashes generated while calculating the merkle root
    */
    private hashRecords: string[][] = [];

    /**
     * 
     * @param dataArray {MerkleDataType[]} - A list of data used to calculate the Merkle Root of type MerkleDataType
     * @param type {string} - The type of one way hash algorithm used to generate hashes
     */
    constructor(dataArray: MerkleDataType[] = [], type: string = 'sha256') {
        this.type = type;
        this.buildTree(dataArray);
    }

    /**
     * @method createHash - takes a MerkleDataType payload to generate a
     * 
     * @param data {MerkleDataType} - The value used to generate a hash
     * @returns {string}
     */
    public createHash(data: MerkleDataType): string {
        const dataString: string = this.convertToString(data);
        return crypto.createHash(this.type).update(dataString).digest('hex');
    }

    /**
     * @method convertToString - takes a MerkleDataType payload to generate a string for hashing
     * 
     * @param data {MerkleDataType}
     * @returns {string}
     */
    private convertToString(data: MerkleDataType): string {
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

    /**
     * @method buildTree - breaks the data down into hashes then processes to find root of tree
     * 
     * @param dataArray {MerkleDataType[]} - The values used to generate the Merkle Tree
     */
    private buildTree(dataArray: MerkleDataType[]): void {
        if (!dataArray.length) {
            throw new Error('dataArray has a minimum length of 1');
        }

        if (dataArray.length > 1) {
            const hashed: string[] = [];
            for (const ele of dataArray) {
                hashed.push(this.createHash(ele));
            }
            this.root = this.process(hashed);
        } else if (dataArray.length === 1) {
            this.root = this.createHash(dataArray[0]);
        }
    }

    /**
     * @method process - recursively breaks down a list of hashes into nodes until the root is found (a single hash)
     * 
     * @param hashArray {string[]} - Array of hashes to calculate the Merkle Root from
     * @returns {string}
     */
    private process(hashArray: string[]): string {
        if (!hashArray.length) {
            throw new Error('hashArray has a minimum length of 1');
        }

        // digest elements from the hash array to create the nodes
        const hashed: string[] = [];
        while (hashArray.length > 0) {
            if (hashArray.length > 1) {
                const hashA: string | undefined = hashArray.shift();
                const hashB: string | undefined = hashArray.shift();
                if (hashA && hashB) {
                    hashed.push(this.createHash(hashA + hashB));
                }
            } else if (hashArray.length === 1) {
                const lastHash: string | undefined = hashArray.shift();
                if (lastHash) {
                    hashed.push(this.createHash(lastHash + lastHash));
                }
            }
        }
        
        // track the hashes processed for this step
        this.hashRecords.push(hashed);

        // more than one hash means we can process another step
        if (hashed.length > 1) {
            return this.process(hashed.slice());
        }

        // one hash means the root has been found
        return hashed[0];
    }
}