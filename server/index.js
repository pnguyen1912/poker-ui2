const server = require('http').createServer()
const io = require('socket.io')(server)

const roomArray = []

function handleHost(key) {
  roomArray.push({key: key, currentAverage: 0 })
 console.log(roomArray);
}


io.on('connection', function (client) {

  console.log('client connected...', client.id)

  client.on('room list', (key) =>{
    handleHost(key)
    io.emit('room list', roomArray)
  })

  // client.on('join', handleJoin)

  // client.on('leave', handleLeave)

  // client.on('message', handleMessage)

  // client.on('chatrooms', handleGetChatrooms)

  // client.on('availableUsers', handleGetAvailableUsers)

  client.on('disconnect', function () {
    console.log('client disconnect...', client.id)
  })

  client.on('error', function (err) {
    console.log('received error from client:', client.id)
    console.log(err)
  })
})

server.listen('http://igluapp.com.s3-website.us-east-2.amazonaws.com/', function (err) {
  if (err) throw err
  console.log('listening on port')
})
