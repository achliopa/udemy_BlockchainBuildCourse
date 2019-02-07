const { INITIAL_BALANCE } = require('../config');

class Wallet {
	constructor() {
		this.balance = INITIAL_BALANCE;
		this.kyPair = null;
		this.publicKey = null;
	}

	toString() {
		return `Wallet - 
			publicKey : ${this.publicKey.toString()}
			balance   : ${this.balance}`
	}
}