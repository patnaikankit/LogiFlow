import WebSocket from "ws";

export const trackVehicle = (wsServer) => {
    wsServer.on('connection', (ws) => {
      ws.on('message', (message) => {
        const { vehicleId, location } = JSON.parse(message);
  
        ws.send(JSON.stringify({ vehicleId, location }));
      });
    });
  };