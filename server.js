const express = require('express')
const { get } = require('http')
const app = express()

const args = require('minimist')(process.argv.slice(2))
args["port"]

const port = args.port || process.env.port || 5000

const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});

function coinFlip() {
    const result = (0 == Math.round(Math.random()) ? "heads" : "tails")
    return result
}

function coinFlips(flips) {
    let result = []
    for (let i = 0; i < flips; i++) {
      result[i] = coinFlip()
    }
    return result
}

function countFlips(array) {
    const result = {
      heads: 0,
      tails: 0,
    }
    let res = [0, 0]
    for (let i = 0; i < array.length; i++) {
      if (array[i] == "heads") {
        result.heads++
      } else {
        result.tails++
      }
    }
    return result
}

function flipACoin(call) {
    const result = {
      call: call
    }
    result.flip = coinFlip()
    result.result = call == result.flip ? "win" : "lose"
    return result;
  }

app.get('/app/', (req, res) => {
    // res.status(200).end('OK')
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
    });

app.get('/app/flip/', (req, res) => {
    res.status(200).json({ 'flip' : coinFlip() })
});

app.get('/app/flip/call/heads', (req, res) => {
    res.status(200).send(flipACoin('heads'))
})

app.get('/app/flip/call/tails', (req, res) => {
    res.status(200).send(flipACoin('tails'))
})

app.get('/app/flips/:number', (req, res) => {
    const arr = coinFlips(req.params.number)
    res.status(200).json({ 'raw' : arr, 'summary' : countFlips(arr) })
})

app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});
