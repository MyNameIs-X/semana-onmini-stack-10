import socketio from 'socket.io-client';

const socket = socketio('http://192.168.141.68:4000/', {
  autoConnect: false
});

function connect(latitude, longitude, techs){
  socket.io.opts.query = {
    latitude,
    longitude,
    techs
  }
  socket.connect();
}

function disconnect(){
  if(socket.connected){
    socket.disconnect();
  }
}

function subscribeNewUser(subscribeFuntion){
  socket.on('newUSer', subscribeFuntion)
}

export {
  connect,
  disconnect,
  subscribeNewUser
}