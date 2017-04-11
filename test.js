let pray = require('socket.io-client')('http://localhost:5000');


let eden = null
pray.on('handshake',()=>{
    console.log('Handshake');


    pray.emit('genesis',null)

})


pray.on('logos',(universe)=>{

    console.log('Universe Received',universe)
    pray.emit('eden');

})


pray.on('eden',(universe)=>{
    console.log('World updated')
    eden = universe;
    eden.adam={
        row: 5,
        column: 2,
        countdown: 4,
        depth: 2
    }
    pray.emit('pray',eden)
})
