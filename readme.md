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

* the blockchain is an array of blocks. with athe first block being the genesis block
* we add a *blockchain.js* file in project root
* we import Block class `const Block = require('./block');`
* we define the class and teh constructor that inits the chain array with the genesis block
```
class Blockchain {
	constructor() {
		this.chain = [Block.genesis()];
	}
}
```
* we add an addBlock method that:
	* gets the lastblock out of the chain
	* mines a new block based on data passed in and last block
	* appends the block to the chain
	* returns the block
```
	addBlock(data) {
		const lastBlock = this.chain[this.chain.length-1];
		const block = Block.mineBlock(lastBlock,data);
		this.chain.push(block);

		return block;
	}
```
* we export the class `module.exports = Blockchain;`

### Lecture 15 - Test the Blockchain

* we add *blockchain.test.js* file in root
* we test that the first block in the chain is the genesis block
```
const Blockchain = require('./blockchain');
const Block = require('./block');
describe('Blockchain',()=>{
	let bc;

	beforeEach(()=>{
		bc = new Blockchain(); 
	});

	it('starts with the genesis block',()=>{
		expect(bc.chain[0]).toEqual(Block.genesis());
	});
});
```
* we test that we can correctly add data
```
	it('adds a new block', () => {
		const data = 'foo';
		bc.addBlock(data);

		expect(bc.chain[bc.chain.length-1].data).toEqual(data);
	});
```

### Lecture 16 - Multiple Chain Validation

* we ll extend the blockchain to accept multiple contributors
* each miner will have his own copy of the chain
* once a new block is added all copies are updated
* the rule is to accept the longer chain. if there is a conflict all peers agree to get the longest chain. the one for the more data
* if 2 miners produce a new block at same time we have a fork. some peers accept one block and the others the other. so we have 2 versions of the chain. peers need to resolve the issue. and aggree upon one chain.
* if a peer adds a new block on one fork so it becomes longer than the other, other peers drop the other fork and accept it
* the blocked removed from the chain can be added again (not lost)
* another form of validation is check the hash value produced from each chain block
* each peer has access to the hash function that produces the hash based on the block data. 
* when a peer get a new chain . it can check it was properly generated by reproducing the hash and check if hashes match

### Lecture 17 - Chain Validation

* to support multiple peers we need to add a function that checks the validity of an incoming chain
* we 'll add a new method ot the Blockchain class  to validate a chain
* in this function:
	* we will check that the first block in the chain is the genesis block
	* we validate hashes for each and every block (lasthash and data-hash)
```
	isValidChain(chain) {
		if(JSON.stringify(chain[0])!== JSON.stringify(Block.genesis())) return false;
		for(let i=1; i<chain.length; i++){
			const block = chain[i];
			const lastBlock = chain[i-1];

			if(block.lastHash !== lastBlock.hash ||
			   block.hash !== Block.blockHash(block)) {
				return false;
			}
		}

		return true;
	}
```
* we add a static blockHash function in the Block class for pure convenience
```
	static blockHash(block) {
		const { timestamp, lastHash, data } = block;
		return Block.hash(timestamp, lastHash, data);
	}
```

### Lecture 18 - Test Chain validation

* we will add new tests in blockchain.test.js. we ll make sure it validates a correct chain and invalidates a chain with wrong genesis block or hash
* in test block we have one blockchain. we need a second one to test
```
	it('validates a valid chain',()=>{
		bc2.addBlock('foo');
		expect(bc.isValidChain(bc2.chain)).toBe(true);
	});

	it('invalidates a chain with a corrupt genesis block',()=>{
		bc2.chain[0].data = 'Bad data';
		expect(bc.isValidChain(bc2.chain)).toBe(false);
	});

	it('invalidates a corrupt chain',()=>{
		bc2.addBlock('foo');
		bc2.chain[1].data = 'Not foo'
		expect(bc.isValidChain(bc2.chain)).toBe(false);		
	});
```

### Lecture 19  - Replace the Chain

* we will add a 'replaceChain' method to replace the chain with a valid chain
* before we replace the local var we check for validation of the incoming chain
* we also check the length of the incoming chain
```
	replaceChain(newChain) {
		if (newChain.length <= this.chain.length){
			console.log('Received chain is not longer than the current chain.');
			return;
		} else if (!this.isValidChain(newChain)){
			console.log('The received chain is not valid.');
			return;			
		}
		console.log('Replaceing blockchain with the new chain');
		this.chain = newChain;
	}
```

### Lecture 20 - Test Chain Replacement

* we will test chain replacement if input is valid
* we will test non replacement if input chain is shorter
* we will test non replacement if input chain is invalid
```
	it('replace the chain with a valid chain',()=>{
		bc2.addBlock('goo');
		bc.replaceChain(bc2.chain);
		expect(bc.chain).toEqual(bc2.chain);
	});

	it('does not replace the chain with one of less or equal to length',()=>{
		bc.addBlock('foo');
		bc.replaceChain(bc2.chain);
		expect(bc.chain).not.toEqual(bc2.chain);
	});
```

## Section 4 - Develop the Blockchain Application

### Lecture 21 - Organize the Project

* we add a blockchain folder and place all our chain relatred source files so far
* as blockchain.js has same name as the folder we rename it index.js to facilitate imports
* we add an app folder for our aplication and add an index.js file

### Lecture 22 - BlockchainAPI: Get Blocks

* we will add an http API to allow clients comm with the app
* we will  use express `npm i express --save`
* we import it in index.js `const express = require('express');`
* we import blockchain class `const Blockchain = require('../blockchain');`
* we define the node list port accepting the env var `const HTTP_PORT = process.env.HTTP_PORT || 3001;` 
* we can define an alternate port at runtime as env var in shell `$ HTTP_PORT =3002 npm run dev`
* we add boilerrplate express code and a route to return the blockchain in JSON format
```
const app = express();
const bc = blockchain();

app.get('/blocks',(req,res)=>{
	res.json(bc.chain);
});

app.liosten(HTTP_PORT, ()=>{
	console.log(`Listeing on port ${HTTP_PORT}`);
});
```
* we add a start script in package.json `"start": "node ./app"`
* we add a dev server script `"dev": "nodemon ./app"`

### Lecture 23 - Mine Blocks Post Request

* we add a post route for block mining
* we will use body-parser `npm i body-parser --save`
* we import it `const bodyParser = require('body-parser');` and use its json parser as middleware in express `app.use(bodyParser.json());`
* we use body  parser to add json in our request
* our post request will be
```
app.post('/mine',(req,res)=>{
	const block = bc.addBlock(req.body.data);
	console.log(`New block added: ${block.toString()}`);
	res.redirect('/blocks');
});
```
* we pass the data in our request body as as raw json object
```
{
	"data": "foo"
}
```
* we get back the chain

## Section 5 - Create the Blockchain Network

### Lecture 24 - Peer to Peer Server

* a true blochchain system can support multiple users
* we ll use a peer-to-peer server to connect multipl eusers running the app
* the first peer to create the blockchain will start the peer-to-pper server (websockets)
* the server will listen to a port (5001) for websocket connections
* when other peers launch the app they start their own websocker service connecting to the real-time server in a RT basis
* the original server will detect new connections
* the peers start exchangin messages through websockets.
* we needto make sure a new peer once connected gets a copy of the blockchain
* new changes to the chain are broadcasted so that all peers can update their chain
* there are 2 possibilities on how an individual server will behave:
	* as initial instace of the app it will start the p2p server and wait for connections
	* as subsequent instance of the app (later server) it will connect to the original server
* we wont use separate classes. the server class will be able to play both roles
* it will know which role to play besed on an env var we will keep updated

### Lecture 25 - Create the Websocker Server

* our goal is to have at least 2 servers running on our blockchain app and through websockets pub-sub make sure all are in same line it terms of chain progress
* we install websockets `npm i ws --save`
* we create a neww sc file in /app named 'p2p-server.js'
* in it we imort ws `const Websocket = require('ws');`
* we set a port like express env var style `const P2P_PORT = process.env.P2P_PORT || 5001;`
* we add a peers const to allow multiple ports for peers on same machine (multiport) e.g 'ws://localhost:5001,ws://localhost:5002' which we split into an array of strings `const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];`
* we define a server class setting the constructor. in the constructor we pass in a blockchain instance which we set as local attribute. also we set n epty list of sockets
```
class P2pServer {
	constructor(blockchain) {
		this.blockchain = blockchain;
		this.sockets = [];
	}
}
```
* we implement a listen method that sets up a websocket server on port 5001 and
set an on 'connection' event handler to listen for new connections.
* in the handler we get the socket obect and add it to the sockets list
```
	listen() {
		const server = new Websocket.Server({port: P2P_PORT});
		server.on('connection',socket=>this.connectSocket(socket));
		console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`);
	}

	connectSocket(socket) {
		this.sockets.push(socket);
		console.log('Socket connected');
	}
```

### Lecture 26 - Connect to Blockchain Peers

* we gave the app the ability to start a server the other app instances can connect to
* we now have to make sure later app instances connect with the first app server ASAP when they specify as app peers
* in the listen method after registering the shocket of incomming connection we add a connectToPeers() method
* in this method we iterate through the peers array opening a comm soocket for each one passing in the peer addr3ess
* we also listen to the open event of the socket in case the p2p server is started after the peers launch
```
	connectToPeers() {
		peers.forEach(peer =>{
			// ws://localhost:5001
			const socket = new Websocket(peer);
			socket.on('open',()=>{
				this.connectSocket(socket);
			});
		});
	}
```
* we export the server class `module.exports = P2pServer;`
* we import it in app/index.js `const P2pServer = require('./p2p-server');` and create an instance `const p2pServer = new P2pServer(bc);`
* after starting the express server we start the p2p server `p2pServer.listen();`
* we run and test `npm run dev` we lauch a second server on different port using the same runnable `HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev` it connects to the open socket
* we launch a 3rd peer that will connect to the formet 2 using the ws endpoints `HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev` we see sockets opening for 3 peers
* we ll use sockets to share the blockchain

### Lecture 27 - Handle Messages from Peers

* we will use the send() method of the websocket object
* we will do that in messageHandler(socket){} helper method of theP2pServer class
* in this method we listen for the the message evend on the socket (when send() is used on the co-peer using the soket)
* for the demo we get the sent message parse it to JSON and log it
```
	messageHandler(socket) {
		socket.on('message',(message)=>{
			const data = JSON.parse(message);
			console.log('data',data);
		});
	}
```
* we attach the handler to the connectSocket() as this is invoked once when the socket is opened
* our sockets can now receive events. we have to send them though.
* in the moment we do the initial connection 'connectSocket()' we send the blockchain to the new peer. `socket.send(JSON.stringify(this.blockchain.chain));`
* we mine some blocks and then laundh our peers to test . we see the blochain sent between the peers
* our p2p prtocol can poorly scale as bc grows as everybody send all the chain to the rest of peers

### Lecture 28 - Synchronize the Blockchain among Peers

* to improvw performance. the one who mines will tell others peers to replace their blochcahin with his
in the messageHandler upon receiveing the blockchain we will call the replace blockchain method to replace the peers existing one `this.blockchain.replaceChain(data);` this will happen in the current implementation only upon creation
* we need to do it also when a block is mined. we add a new method for that 'syncCHains()' that broadcasts to all sockets (peers) the chain.
```
	syncCHains() {
		this.sockets.forEach(socket => {
			this.sendChain(socket);
		});
	}
```
* we move the send chain to a helper method to keep things DRY
```
	sendChain(socket) {
		socket.send(JSON.stringify(this.blockchain.chain));
	}
```
* we use the new method in the post express route handler for /mine `	p2pServer.syncChains();`
* we test