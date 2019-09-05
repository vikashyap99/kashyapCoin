SHA256 = require('crypto-js/sha256');
class Block {
    constructor(index, timeStamp, data, prevHash=''){
        this.index = index;
        this.timeStamp = timeStamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.prevHash + this.timeStamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.blockchain = [this.genesisBlock()];
    }

    genesisBlock(){
        return new Block(0,"01/08/2019","genesis Block",'0');
    }

    addBlock(newBlock){

        newBlock.prevHash = this.getCurrentBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.blockchain.push(newBlock);

    }
    getCurrentBlock(){
        return this.blockchain[this.blockchain.length-1];
    }


    isblockchainValid(){
        for(let i = 1; i<this.blockchain.length-1; i++){
            if(this.blockchain[i].hash !== this.blockchain[i].calculateHash()){
                return false;
            }
            if(this.blockchain[i].hash !== this.blockchain[i+1].prevHash){
                return false;
            }
        }
        return true;
    }

}
CurrentTime = () =>{
    const now = new Date();
    return now;
}
let kashyapCoin = new Blockchain();
kashyapCoin.addBlock(new Block(1,CurrentTime(),{amount: 4}))
kashyapCoin.addBlock(new Block(1,CurrentTime(),{amount: 10}))


console.log(JSON.stringify(kashyapCoin,null,4));

console.log('Is Blockblockchain valid ? ',kashyapCoin.isblockchainValid());

