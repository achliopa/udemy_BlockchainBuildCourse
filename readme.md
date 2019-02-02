# Udemy Course: Build a Blockchain and a Cryptocurrency from Scratch

* [Course Link](https://www.udemy.com/build-blockchain/)
* [Course Repo](https://github.com/15Dkatz/sf-chain-guides)


## Section 1 - Course Overview - What is the Blockchain And Why?

### Lecture 1 - Course Overview and Roadmap

* Goal of the Course
	* Build a blockchain and cryptocurrency to understand these technologies

* Course Roadmap
	* Code the core blockchain
	* Build an API around the blockchain
	* Create a dynamic peer-to-peer server for multiple contributors
	* implement prrof-of-work system to balance users
	* create a transaction system for a cryptocurrency

### Lecture 3 - What is a Blockchain and why use it

* Blockchain: a distributed and decentralized ledger that stores data such as transactions, and that is publickly shared across all the nodes of its network
* Each block hash is based on its data(transactions), block metadata, and the previous block hash
* Ledger: a ledger is a record keeping book that stores all the transaction of an organization
* Centralized Ledger:
	* one entrity records the data
	* the central entity has a lot of power
	* full authority to fine or reward
	* complete trust with the entity
* Decentralized Ledger:
	* Everyone records the data.
	* Everyone has equal power.
	* Fair and transparent system
	* Trustless

* Why use the Blockchain?
	* decentralization leads to a trustless system
	* no middle men and no fees
	* highly secure and no central point of failure
	* dependable immutable data

### Lecture 4 - The Blockchain in Practice: Cryptocurrencies and Cryptography

* Cryptocurrency: 
	* a blockchain use case
	* leverages the blockchain 
	* uses cryptography to generate digital signatures (public-private key)
* Wallets:
	* objects that store the rpivate and public key of the individual
	* public key is used as id

### Lecture 5 - The Blockchain in Practice: Mining and Bitcoin

* Mining:
	* transactions are temporarily unconfirmed
	* include blocks of transactions by solving a PoW algorithm
	* PoW algorithm is difficult to solve and computational expensive
	* PoW algorithm is easily verifiable
	* once solved the miner can add the block to the chain and other miners verify
	* Miners are rewarded for adding a block to the chain
	* The difficulty can adjust to control the rate of new blocks comming in
* Bitcoin:
	* First decentralized cryptocurrency in 2009
	* Great growth and widespread adoption

* Other Use Cases:
	* blockchain-based voting registers
	* bc-supported documentation and id systems

### Lecture 6 - Roadmap to Building the Blockchain: Guided by the Bitcoin White Paper

* In bitcoin whitepaper transaction are explained. transactions must be signed with users private keys
* a timestamp server is used
	* timestamps order blocks in the chain
	* each hash of a block contains the timestamp of the last block
* proof of work consensus: SHA-256 algo is used
* network.
* incentive.
* reclaiming disk space
* simplified payment verification
* combining and splitting value
* privacy
* calculations to prove the efficiency of blockchain

## Section 2 - Build the Blockchain - Blocks

### Lecture 8 - Set Up the Blockchain Application

* we create a project dir '/sf-chain'
* we cd into it and run `npm init -y`
* we install nodemon `npm i nodemon --save-dev`

### Lecture 9 - Create the Block

* a block needs:
	* timestamp in miliseconds (Date js object)
	* lastHash (the hash of the block before it)
	* hash (based on blocks own data)
	* the data to store
* we add a *block.js* file in project root
* we add a Block class and write its constructor
* in the constructor we pass in timestamp,lastHash,hash and data and set thema s object attributes
* we also add a toString method to print the object instance attributes for debugging
* finaly we export the class
```
class Block {
	constructor(timestamp, lastHash, hash, data) {
		this.timestamp = timestamp;
		this.lastHash = lastHash;
		this.hash = hash;
		this.data = data;
	}

	toString() {
		return `Block -
		  Timestamp: ${this.timestamp}
		  Last Hash: ${this.lashHash.substring(0,10)}
		  Hash     : ${this.hash.substring(0,10)}
		  Data     : ${this.data}`;
	}
}

module.exports = Block;
```
* we add a file 'dev-test.js' in project root for testing
* we import the class, make an instance and print it out
```
const Block = require('./block');
const block = new Block('foo','bar','zoo','baz');
console.log(block.toString());
```
* we add a script in package.json `"dev-test": "nodemon dev-test"`

### Lecture 10 - Genesis Block

* Genesis Block is the first block of a blockchain. the original one
* usually is a hardcoded block with dummy hash and data values
* in Block class we will add a genesis method to create teh first block
* we define the method as static (class method) so as long asw we import the class we can use the method without the need to instantiate it
* we pass in static dummy data and return a block instance
```
	static genesis() {
		return new this('Genesis time','-------','fir57-h45h',[]);
	} 
```
* we add a test code in the dev-test file `console.log(Block.genesis().toString());`

### Lecture 11 - Mine Blocks

* the mine block function will create new blocks using the last block
* we add a *mineBlock* method to the Block class.
* we make it static (class method) so we dont need to create a block instance to use it
* we pass in the last block and the data we want to pas sin the block
* we set a timestamp. extract last blocks hash, create a new (dummy) hash and we create and return a new block instance with all the  data we set
```
	static mineBlock(lastBlock, data) {
		const timestamp = Date.now();
		const lastHash = lastBlock.hash;
		const hash = 'todo-hash';

		return new this(timestamp, lastHash, hash, data);
	}
```
* we test what we have done so far in dev-test
```
const fooBlock = Block.mineBlock(Block.genesis(),'foo');
console.log(fooBlock.toString());
```

### Lecture 12 - SHA256 Hash Function

* we ll finally generate the block hash from timestamp,last block hash and block data
* we ll use the SHA-256  algorithm 
	* it produces a unique 32 byte (256 bit) hash value for unique data inputs
	* one-way hash (impossible to decrypt)
	* useful for block validation
* we import crypto-js module `npm i crypto-js  --save`
* we import the SHA256 method in block.js `const SHA256 = require('crypto-js/sha256');`
* we add a static hash method to the block class
```
static hash(timestamp, lastHash, data) {
		return SHA256(`${timestamp}${lastHash}${data}`).toString();
	}
```
* we use it to generate the block hash in the mineBlock method `const hash = Block.hash(timestamp, lastHash, data);`

### Lecture 13 - Test the Block

* console logs  is not proper testing. we need a proper test env for ourproject * we will use jest `npm i jest --save-dev`
* jest look for test.js files
* we add a *block.test.js* file
* in the file we import the block class `const Block  = require('./block');`
* we add test code in jest style to test block  link to previous link
```
describe('Block',()=>{

	let data, lastBlock, block;

	beforeEach(() => {
		data = 'bar';
		lastBlock = Block.genesis();
		block = Block.mineBlock(lastBlock,data);
	});

	it('sets the `data` to match the input',()=>{
		expect(block.data).toEqual(data);
	});

	it('sets the `lastHash` to match the hash of the last block',()=>{
		expect(block.lastHash).toEqual(lastBlock.hash)
	});
});
```
* we add a test script in *package.json* `"test": "jest --watchAll",`
* watchAll flag runs a server that listens to file changes and reruns tests
* we `npm test` or `npm run test` and see our 2 tests pass

## Section 3 - Build the Blockchain - the Chain

### Lecture 14 - Build the Blockchain Class

* 