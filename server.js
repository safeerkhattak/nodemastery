const express = require('express');
const cluster = require('cluster')
const os = require('os')

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
    return res.send(`Performance test${process.pid}`)//process.pid give current process id from OS 
})

app.get('/blockReq', (req, res) => {
    delay(9000)
    return res.send(`timer endpoint${process.pid}`)
})
//Each process uses seperate processor in your cpu
console.log("Running server.js")
if(cluster.isMaster){ //isMastered flag differeciate the master process from the worker process
console.log("MASTER has been started")  
const NUM_WORKERS = os.cpus().length;
console.log("corss>",NUM_WORKERS)
for(let i=0; i<NUM_WORKERS; i++){
cluster.fork()
}  
// cluster.fork() //the fork from cluster module create a worker process
// cluster.fork() 
}else{
    console.log("WORKER process started/")
    app.listen(3000)
}