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

* 