const io = require('socket.io-client')



export default function () {
  const socket = io.connect('http://localhost:3000')

  function joinRoom(func){
    socket.on('room list', func)
  }

  function handleHost(key) {
    socket.emit('room list', key)
  }


  return {
    handleHost,
    joinRoom
  }
}

