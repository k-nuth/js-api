// test.js

// Windows: Se necesita Python 2.7 y MSVC
//
// npm install -g node-gyp
//
// node-gyp configure
// node-gyp build
// node test.js


const bitprim = require('./bitprim.js');
const express = require('express')
const app = express()
const port = 8080

process.stdin.resume();//so the program will not close instantly

// const exec = bitprim.open("/home/fernando/exec/btc-mainnet.cfg")
const exec = bitprim.openWithStd("/home/fernando/exec/btc-mainnet.cfg")

var res = exec.initchain()
// console.log(`res: ${res}`)
res = exec.run_wait()
// console.log(`res: ${res}`)

if (res != 0) {
    exec.close()
    process.exit();
}

process.on("SIGINT", function () {
    console.log("captured SIGINT...");
    process.exit();
});


process.on("exit", function () {
    // console.log("on exit");
    exec.close()
});


// app.get('/', (request, response) => {
//     response.send('Hello from Express!')
// })



app.get('/validate-tx/:txhex', function(request, response) {

    var txhex = request.params.txhex; //or use request.param('txhex')
    console.log(`validate_tx request txhex: ${txhex}`)

    exec.validate_tx(txhex, function (err, message) {
        console.log(`validate_tx callback - err: ${err}, message: ${message}`)
        response.send(`validate_tx callback - err: ${err}, message: ${message}`)
    })
})

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})



// BX
// http://127.0.0.1:8080/validate-tx/0100000001b3807042c92f449bbf79b33ca59d7dfec7f4cc71096704a9c526dddf496ee0970100000069463044022039a36013301597daef41fbe593a02cc513d0b55527ec2df1050e2e8ff49c85c202204fcc407ce9b6f719ee7d009aeb8d8d21423f400a5b871394ca32e00c26b348dd2103c40cbd64c9c608df2c9730f49b0888c4db1c436e8b2b74aead6c6afbd10428c0ffffffff01905f0100000000001976a91418c0bd8d1818f1bf99cb1df2269c645318ef7b7388ac00000000

// Satoshi TX
// http://127.0.0.1:8080/validate-tx/1000100000000000000000000000000000000ffffffff4d4ffff01d14455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff10f252a100043414678afdb0fe5548271967f1a67130b7105cd6a828e0399a67962e0ea1f61deb649f6bc3f4cef38c4f3554e51ec112de5c384df7bab8d578a4c702b6bf11d5fac0000


