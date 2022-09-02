const bip32 = require('bip32')
const bip39 = require('bip39')
const btc = require('bitcoinjs-lib')


module.exports = class Wallet {
	network;
	bip32Path;
	#address;
	#mnemonic;
	#root;
	#node;

	constructor() {
		this.network = btc.networks.testnet;
		this.bip32Path = "m/49'/1'/0'";  //  "m/49'/0'/0'"
	}

	 createAdress (){

		 this.#createMnemonic()
		 this.#createPrivateKey()

		const {address} = btc.payments.p2pkh({
			pubkey: this.node.publicKey,
			network: this.network
		})

		this.#address = address

		return address
	}

	 #createMnemonic(){
		this.mnemonic = bip39.generateMnemonic()
		const seed =  bip39.mnemonicToSeedSync(this.mnemonic)

		this.root = bip32.fromSeed(seed, this.network)

		return this.root

	}

	 #createPrivateKey(){
		const account = this.root.derivePath(this.bip32Path)
		this.node = account.derive(0).derive(0)

		return this.node
	}

	get getMnemonic(){
			return this.mnemonic
	}

	get getPrivateKey(){
		return this.node.toWIF()
	}

	get getAddress(){
		return this.node.toWIF()
	}
}
