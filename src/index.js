const Wallet = require('./wallet/Wallet')

const wallet = new Wallet()

const address = wallet.createAdress()

console.table([{
	"adress": address,
	"mnemonic": wallet.getMnemonic,
	"privateKey": wallet.getPrivateKey,
}], ["adress", "mnemonic", "privateKey"]);