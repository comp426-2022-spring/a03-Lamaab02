const express = require('express')
const app = express()

var port =5000

const server = app.listen(port, () =>{
    console.log('App is running on port %PORT%'.replace('%PORT%', port))
});


function coinFlip() {
    return Math.random() > 0.5 ? 'heads' : 'tails'
}

function coinFlips(flips) {
    const result = []
    for(let i = 0; i < flips; i++){
      result[i] = coinFlip()
    }
    return result
}

function countFlips(array) {
    let head = 0
    let tail = 0
    array.forEach(element => {
      if(element == "heads") head++
      else tail++
    });
    if (head == 0) {
      return {'tails': tail}
    } else if (tail == 0) {
      return {'heads': head}
    } else {
      return {'heads': head, 'tails': tail}
    }
}


function flipACoin(call) {
    let flip = coinFlip()
    const result = ""
    if(call == flip) return {call: call, flip: flip, result: 'win'}
    else return {call: call, flip: flip, result: 'lose'}
}




app.get('/app/', (req, res)=>{
    res.statusCode = 200;
    res.statusMessage = "OK"
    res.writeHead(res.statusCode, {'Content-Type' : 'text/plain'});
    res.end(res.statusCode+ ' ' +res.statusMessage)
});

app.get('/app/flip/', (req, res)=>{
    res.status(200).json({'flip' : coinFlip()})
});

app.get('/app/flips/:number', (req, res) => {
    const flips = coinFlips(req.params.number)
    res.status(200).json({'raw' : flips, 'summary' : countFlips(flips)})
});

app.get('/app/flip/call/heads', (req, res) =>{
    res.status(200).send(flipACoin('heads'))
});

app.get('/app/flip/call/tails', (req, res) =>{
    res.status(200).send(flipACoin('tails'))
});

app.use(function(req, res){
    res.status(404).send("404 NOT fOUND")
    res.type("text/plain")
})