let pray = require('socket.io-client')('http://localhost:5000');


let eden = null
pray.on('handshake',()=>{   // Recieve handshake means server does connected you
    console.log('Handshake');

    pray.emit('lonely',null) //

})

pray.on('lonely',(key)=>{

    console.log('Received room key',key)
})

pray.on('women',(room)=>{

    console.log('Received created room',room)
})


pray.on('parallel',(whole)=>{

    console.log("received Whole\n",whole)
})