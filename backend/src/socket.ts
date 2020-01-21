import socketio from 'socket.io';
import { parseStringToArray, getDistanceFromLatLonInKm } from './utils';

let io;
const connections = [];
export function setupWebsocket(server){
  io = socketio(server);

  io.on('connection', socket => {
    const { latitude, longitude, techs } = socket.handshake.query;
  
    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude)
      },
      techs: parseStringToArray(techs)
    });
  });
}

export function findConnections(
  coordinates: { latitude: Number, longitude: Number },
  techs: Array<String>
){
  return connections.filter(connection => {
    return getDistanceFromLatLonInKm(coordinates, connection.coordinates) < 10
      && connection.techs.some(item => techs.includes(item))
  });
}

export function sendMessage(to: Array<any>, message, data){
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
}