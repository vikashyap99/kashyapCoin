SHA256 = require('crypto-js/sha256');
class Block {
    constructor(index, timeStamp, data, prevHash=''){
        this.index = index;
        this.timeStamp = timeStamp;
        this.data = data;
        this.prevHash = prevHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
        
    }

    calculateHash(){
        return SHA256(this.index + this.prevHash + this.timeStamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    minedBlock(difficulty){
        while(this.hash.substring(0,difficulty) !== Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log('Mined Block: '+ this.hash);
    }
}

class Blockchain{
    constructor(){
        this.blockchain = [this.genesisBlock()];
        this.difficulty = 4;
    }

    genesisBlock(){
        return new Block(0,"01/08/2019","genesis Block",'0');
    }

    addBlock(newBlock){

        newBlock.prevHash = this.getCurrentBlock().hash;
        newBlock.minedBlock(this.difficulty);
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

console.log('Mining of Block 1...... ');
kashyapCoin.addBlock(new Block(1,CurrentTime(),{amount: 4}));
console.log('Mining of Block 2...... ');
kashyapCoin.addBlock(new Block(2,CurrentTime(),{amount: 10}));




console.log('Is Blockblockchain valid ? ',kashyapCoin.isblockchainValid());

