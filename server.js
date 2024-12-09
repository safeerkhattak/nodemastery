const express = require('express');
const cluster = require('cluster')


const app = express();
/*
Real life blocking functions.
JSON.stringify() if many requests are using the method then this will make the app to respond slowly
JSON.parse()
array.sort() if array is large
*/

function delay(duration) {
    const startTime = Date.now()
    while (Date.now() - startTime < duration) {// this will block the event loop, and app will not be able to handle the other requests untill this unfreeze the event loop
    }
}


app.get('/', (req, res) => {
    return res.send("hello world")
})

app.get('/blockReq', (req, res) => {
    delay(9000)
    return res.send("hello world")
})
if(cluster.isMaster){ //isMastered flag differeciate the master process from the worker process
    
}
app.listen(3000)