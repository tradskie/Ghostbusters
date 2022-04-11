var minersAddr = '0x1b1bF75551B1E12C9f8f19Eb87178cdaF8a17960'; //0xe2B6f94C06E75818557870515ee32678a3ADaC1B
var minersAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"beanRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"ref","type":"address"}],"name":"buyEggs","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"eth","type":"uint256"},{"internalType":"uint256","name":"contractBalance","type":"uint256"}],"name":"calculateEggBuy","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"eth","type":"uint256"}],"name":"calculateEggBuySimple","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"eggs","type":"uint256"}],"name":"calculateEggSell","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"getEggsSinceLastHatch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"getMyEggs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"getMyMiners","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"ref","type":"address"}],"name":"hatchEggs","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"seedMarket","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"sellEggs","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
var minersContract;

var canSell = true;
var canHatch = true;


function contractBalance(callback){
    web3.eth.getBalance(minersAddr).then(result => {
        callback(web3.utils.fromWei(result));
    }).catch((err) => {
        console.log(err)
    });
}


function buyEggs(ref, trx,callback){
    minersContract.methods.buyEggs(ref).send({value:trx, from:currentAddr}).then(result => {
        callback();
    }).catch((err) => {
        console.log(err)
    });
}


function hatchEggs(ref,callback){
    if (canHatch) {
        canHatch = false;
        minersContract.methods.hatchEggs(ref).send({from:currentAddr}).then(result => {
            callback();
        }).catch((err) => {
            console.log(err)
        });
        setTimeout(function(){
            canHatch = true;
        },10000);
    } else {
        console.log('Cannot hatch yet...')
    };
}


function sellEggs(callback){
    if (canSell) {
        canSell = false;
        console.log('Selling');
        minersContract.methods.sellEggs().send({from:currentAddr}).then(result => {
            callback();
        }).catch((err) => {
            console.log(err)
        });
        setTimeout(function(){
            canSell = true;
        },10000);
    } else {
        console.log('Cannot sell yet...')
    };
}


function calculateEggBuy(trx,contractBalance,callback){
    minersContract.methods.calculateEggBuy(trx,contractBalance).call().then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}


function calculateEggBuySimple(trx,callback){
    minersContract.methods.calculateEggBuySimple(trx).call().then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}


function calculateEggSell(eggs,callback){
    minersContract.methods.calculateEggSell(eggs).call().then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}

function claimedEggs(callback){
    minersContract.methods.claimedEggs().call().then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}


function devFee(amount,callback){
    minersContract.methods.devFee(amount).call().then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}

function getBalance(callback){
    minersContract.methods.getBalance().call().then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}

function getEggsSinceLastHatch(address,callback){
    minersContract.methods.getEggsSinceLastHatch(address).call().then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}


function getMyEggs(callback){
    minersContract.methods.getMyEggs().call({from:currentAddr}).then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}

function getMyMiners(callback){
    minersContract.methods.getMyMiners().call({from:currentAddr}).then(result => {
        if (result == '0x') {
            result = 0;
        }
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}

function lastHatch(address,callback){
    minersContract.methods.lastHatch(address).call({from:currentAddr}).then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}

function marketEggs(callback){
    minersContract.methods.marketEggs().call().then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}
