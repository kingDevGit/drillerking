let pray = require('socket.io-client')('http://localhost:5000');


let eden = null
pray.on('handshake',()=>{   // Recieve handshake means server does connected you
    console.log('Handshake');


    pray.emit('women','testkey') //

})

pray.on('women',(room)=>{


    console.log('Received created room',room)
})
pray.on('parallel',(whole)=>{



    console.log("received Whole]n",whole)
})