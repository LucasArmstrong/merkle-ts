/** @module MerkleTree */
/** Author: Lucas Armstrong - Lucas@throneit.com - github.com/LucasArmstrong */

/**
 * Imports
 * CryptoJS - Used to calculate one way hashes
 */
const CryptoJS = require('crypto-js');

export type MerkleDataType = string | number | boolean | object;

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
     * @param values {MerkleDataType[]} - A list of values used to calculate the Merkle Root of type MerkleDataType
     * @param type {string} - The type of one way hash algorithm used to generate hashes
     */
    constructor(values: MerkleDataType[] = [], type: string = 'SHA256') {
        this.type = type;
        this.buildTree(values);
    }

    /**
     * 
     * @param data {MerkleDataType} - The value used to generate a hash
     * @returns {string}
     */
    public createHash(data: MerkleDataType): string {
        const dataString: string = this.convertToString(data);
        return CryptoJS[this.type](dataString).toString();
    }

    private convertToString(data: MerkleDataType) {
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
     * 
     * @param array {MerkleDataType[]} - The values used to generate the Merkle Tree
     */
    private buildTree(array: MerkleDataType[]): void {
        if (array.length > 1) {
            const hashed: string[] = [];
            for (const ele of array) {
                hashed.push(this.createHash(ele));
            }
            this.root = this.process(hashed);
        } else if (array.length === 1) {
            this.root = this.createHash(array[0]);
        }
    }

    /**
     * 
     * @param array {string[]} - Array of hashes used in calculating the Merkle Root
     * @returns {string}
     */
    private process(array: string[]): string {
        const hashed: string[] = [];
        while (array.length > 0) {
            if (array.length > 1) {
                const hashA: string | undefined = array.shift();
                const hashB: string | undefined = array.shift();
                if (hashA && hashB) {
                    hashed.push(this.createHash(hashA + hashB));
                }
            } else if (array.length === 1) {
                const lastHash: string | undefined = array.shift();
                if (lastHash) {
                    hashed.push(this.createHash(lastHash + lastHash));
                }
            }
        }
        this.hashRecords.push(hashed);
        if (hashed.length > 1) {
            return this.process(hashed.slice());
        } else if (hashed.length === 1) {
            return hashed[0];
        }
        return '';
    }
}