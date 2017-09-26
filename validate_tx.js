// https://chainquery.com/bitcoin-api/getrawtransaction

// 0100000001032e38e9c0a84c6046d687d10556dcacc41d275ec55fc00779ac88fdf357a187000000008c493046022100c352d3dd993a981beba4a63ad15c209275ca9470abfcd57da93b58e4eb5dce82022100840792bc1f456062819f15d33ee7055cf7b5ee1af1ebcc6028d9cdb1c3af7748014104f46db5e9d61a9dc27b8d64ad23e7383a4e6ca164593c2527c038c0857eb67ee8e825dca65046b82c9331586c82e0fd1f633f25f87c161bc6f8a630121df2b3d3ffffffff0200e32321000000001976a914c398efa9c392ba6013c5e04ee729755ef7f58b3288ac000fe208010000001976a914948c765a6914d43f2a7ac177da2c2f6b52de3d7c88ac00000000

const bitprim = require('./bitprim.js');
const express = require('express')
const app = express()

process.stdin.resume();

// const exec = bitprim.open("C:\\development\\btc-mainnet.cfg")
const exec = bitprim.openWithStd("C:\\development\\btc-mainnet.cfg")
// const exec = bitprim.openWithStd("")

var res = exec.initchain()
res = exec.run_wait()
exec.stop()

// ---------------------------------

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

// ---------------------------------

app.get('/last-height', function(request, response) {
    var txhex = request.params.txhex;

    var height = exec.get_last_height()
    response.send(`last-height: ${height}`)
})

app.get('/validate-tx/:txhex', function(request, response) {
    var txhex = request.params.txhex;

    exec.validate_tx(txhex, function (err, message) {
        if (err == 0) {
            response.send(`Transaction is valid!`)
        } else {
            response.send(`Transaction is invalid, err: ${err}, message: ${message}`)
        }
    })
})

app.listen(8080, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${8080}`)
})


// BX
// http://127.0.0.1:8080/validate-tx/0100000001b3807042c92f449bbf79b33ca59d7dfec7f4cc71096704a9c526dddf496ee0970100000069463044022039a36013301597daef41fbe593a02cc513d0b55527ec2df1050e2e8ff49c85c202204fcc407ce9b6f719ee7d009aeb8d8d21423f400a5b871394ca32e00c26b348dd2103c40cbd64c9c608df2c9730f49b0888c4db1c436e8b2b74aead6c6afbd10428c0ffffffff01905f0100000000001976a91418c0bd8d1818f1bf99cb1df2269c645318ef7b7388ac00000000

// Satoshi TX
// http://127.0.0.1:8080/validate-tx/1000100000000000000000000000000000000ffffffff4d4ffff01d14455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff10f252a100043414678afdb0fe5548271967f1a67130b7105cd6a828e0399a67962e0ea1f61deb649f6bc3f4cef38c4f3554e51ec112de5c384df7bab8d578a4c702b6bf11d5fac0000




// test.js

// Windows: Se necesita Python 2.7 y MSVC
//
// npm install -g node-gyp
//
// node-gyp configure
// node-gyp build
// node test.js

