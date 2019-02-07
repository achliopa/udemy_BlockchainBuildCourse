const ChainUtil = require('../chain-util');

class Transaction {
	constructor() {
		this.id = ChainUtil.id();
		this.input = null;
		this.output = null;
	}
}