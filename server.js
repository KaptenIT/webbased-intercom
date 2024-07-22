const WebSocket = require('websocket');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
    ws.on('message', message => {
        const parsedMessage = JSON.parse(message);
        const peerId = parsedMessage.peerId;

        // Broadcast received message to all connected clients except the sender
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ ...parsedMessage, peerId: ws.peerId || peerId }));
            }
        });
    });

    // Assign a unique ID to each connected client
    ws.peerId = generateUniquePeerId();
});

function generateUniquePeerId() {
    return Math.random().toString(36).substr(2, 9);
}
