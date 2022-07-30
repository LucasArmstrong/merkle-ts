/** 
 * @module MerkleChain - list type data structure seeded with a gensis timestamp and 
 *  maintains a merkle root, optimized to quickly traverse and search nodes 
 * @module MerkleChainNode - type for the nodes in MerkleChain
 * @author Lucas Armstrong - Lucas@throneit.com - github.com/LucasArmstrong
 */

import { MerkleDataType, MerkleTree } from "./MerkleTree";

export type MerkleChainNodeNullable = MerkleChainNode | null;

export class MerkleChainNode {
    private _next: MerkleChainNodeNullable = null;
    set next(nextNode: MerkleChainNodeNullable) {
        this._next = nextNode;
        if (nextNode) {
            this._nextRoot = nextNode.merkleRoot;
        } else {
            this._nextRoot = '';
        }
    }
    get next(): MerkleChainNodeNullable {
        return this._next;
    }

    private _nextRoot: string = '';
    get nextRoot(): string {
        return this._nextRoot;
    }

    private _prev: MerkleChainNodeNullable = null;
    set prev(prevNode: MerkleChainNodeNullable) {
        this._prev = prevNode;
        if (prevNode) {
            this._prevRoot = prevNode.merkleRoot;
        } else {
            this._prevRoot = '';
        }
    }
    get prev(): MerkleChainNodeNullable {
        return this._prev;
    }

    private _prevRoot: string = '';
    get prevRoot(): string {
        return this._prevRoot;
    }
    
    merkleRoot: string = '';
    dataArray: MerkleDataType[];

    constructor (genesisAt: number, dataArray: MerkleDataType[] = []) {
        const merkleTree: MerkleTree = new MerkleTree([genesisAt]);
        this.dataArray = dataArray;
        if (dataArray.length) {
            merkleTree.addNodes(dataArray);
        }
        this.merkleRoot = merkleTree.root;
    }
}

export class MerkleChain {
    head: MerkleChainNodeNullable = null;
    tail: MerkleChainNodeNullable = null;
    genesisAt: number = 0;

    private _merkleRoot: string = '';
    get merkleRoot(): string {
        return this._merkleRoot;
    }

    constructor(dataArray: MerkleDataType[]) {
        this.addNode(dataArray);
        this.genesisAt = new Date().getTime();
    }

    addNode(dataArray: MerkleDataType[] = []) {
        this.newNode(new MerkleChainNode(this.genesisAt, dataArray));
        this._merkleRoot = new MerkleTree(this.toRootArray()).root;
    }

    toRootArray(): string[] {
        const values: string[] = [];
        let current: MerkleChainNodeNullable = this.head;
        while (current) {
            values.push(current.merkleRoot);
            current = current.next;
        }
        return values;
    }
    
    private newNode(node: MerkleChainNode) : MerkleChainNode {
        if (!this.head) {
            this.head = node;
        } else if (!this.head.next) {
            this.head.next = node;
        }
        if (this.tail) {
            this.tail.next = node;
            node.prev = this.tail;
        } else {
            node.prev = this.head;
        }
        this.tail = node;

        return node;
    }
}