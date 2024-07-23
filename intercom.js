for(var i = 0; i< stream_Channels; i++)
{
    console.log(stream_Channels);
}
const localAudio = document.getElementById('producer');
//console.log(localAudio);
const remoteAudiosContainer = document.getElementById('remoteAudios') || document.createElement('div');

let localStream;
let peerConnections = {};
let serverConnection;

const servers = {
    iceServers: [
        {
            urls: 'stun:stun.l.google.com:19302' // STUN-server
        }
        // Lägg till TURN-server här om nödvändigt
    ]
};

async function start() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        localAudio.srcObject = localStream;
        // Initiera WebSocket-anslutning till signaleringsservern
        serverConnection = new WebSocket('ws://localhost:8080'); //change this to server-IP?
        serverConnection.onmessage = event => {
            const message = JSON.parse(event.data);
            handleMessage(message);
        };

        serverConnection.onopen = () => {
            createOfferForNewPeer();
        };
    } catch (err) {
       console.error('Error accessing media devices.', err);
       console.log("errors found")
    }
}

start();

function createPeerConnection(peerId) {
    const peerConnection = new RTCPeerConnection(servers);

    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
    });

    peerConnection.onicecandidate = event => {
        if (event.candidate) {
            sendToServer({ type: 'ice-candidate', candidate: event.candidate, peerId: peerId });
        }
    };

    peerConnection.ontrack = event => {
        let remoteAudio = document.getElementById(`remoteAudio_${peerId}`);
        if (!remoteAudio) {
            remoteAudio = document.createElement('audio');
            remoteAudio.id = `remoteAudio_${peerId}`;
            remoteAudio.autoplay = true;
            remoteAudiosContainer.appendChild(remoteAudio);
        }
        remoteAudio.srcObject = event.streams[0];
    };

    return peerConnection;
}

function sendToServer(message) {
    serverConnection.send(JSON.stringify(message));
}

function handleMessage(message) {
    const peerId = message.peerId;
    if (message.type === 'offer') {
        handleOffer(message.offer, peerId);
    } else if (message.type === 'answer') {
        handleAnswer(message.answer, peerId);
    } else if (message.type === 'ice-candidate') {
        handleIceCandidate(message.candidate, peerId);
    }
}

async function handleOffer(offer, peerId) {
    const peerConnection = createPeerConnection(peerId);
    peerConnections[peerId] = peerConnection;

    try {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        sendToServer({ type: 'answer', answer: answer, peerId: peerId });
    } catch (err) {
        console.error(err);
    }
}

async function handleAnswer(answer, peerId) {
    const peerConnection = peerConnections[peerId];
    if (peerConnection) {
        try {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        } catch (err) {
            console.error(err);
        }
    }
}

async function handleIceCandidate(candidate, peerId) {
    const peerConnection = peerConnections[peerId];
    if (peerConnection) {
        try {
            await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (err) {
            console.error(err);
        }
    }
}

async function createOfferForNewPeer() {
    const peerId = generateUniquePeerId(); // Replace with a unique ID for the new peer
    const peerConnection = createPeerConnection(peerId);
    peerConnections[peerId] = peerConnection;

    try {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        sendToServer({ type: 'offer', offer: offer, peerId: peerId });
    } catch (err) {
        console.error(err);
    }
}

function generateUniquePeerId() {
    return Math.random().toString(36).substr(2, 9);
}

// Functions for PTT and other controls (example implementations)
function PTT(channel) {
    // Handle Push-To-Talk functionality
}

function releasePTT() {
    // Handle release of Push-To-Talk functionality
}

function listen_to_channel(channel) {

    if(channel.muted = false) {
        channel.muted = true;
    }
    else{
        channel.muted = false;
    }
    // Handle listen functionality
}

function change_color() {
    // Handle color change functionality
}


function change_Vol(channel, new_value) {
    channel.volume = new_value/100;
}
