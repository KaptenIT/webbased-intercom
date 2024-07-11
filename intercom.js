let localStream;

document.getElementById("start").addEventListener("click", async () => {
    try {
        document.getElementById("start").disabled = true;
        console.log("aktiverar mic");
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        localStream = stream;
        /*document.querySelector("audio").srcObject = stream;*/
        document.getElementById("stream1").srcObject = stream;
        document.getElementById("stop").disabled = false;
        audioLevel(stream);
        calculateAudioLevels();
    } catch (err) {
        console.warn("Could not start audio: ", err);
    }
});

document.getElementById("stop").addEventListener("click", () => {
    document.getElementById("stop").disabled = true;
    localStream.getAudioTracks().forEach(track => track.stop());
    document.getElementById("start").disabled = false;
});

function PTT() {
    elements = document.getElementById("speak");
    elements.style.backgroundColor="#FF0000";
    stream.audio.enabled();

}

function releasePTT() {
    elements = document.getElementById("speak");
    elements.style.backgroundColor="#e7e7e7"
    stream.audio.disabled();
}

function audioLevel(audioStream) {
    var _mediaStream    = audioStream;
    var _audioContext   = new AudioContext();
    var _audioAnalyser  = [];
    var _freqs          = [];
    var audioLevels     = [0];

    var _audioSource          = _audioContext.createMediaStreamSource(_mediaStream);
    var _audioGain1           = _audioContext.createGain();
    var _audioChannelSplitter = _audioContext.createChannelSplitter(_audioSource.channelCount);

    _audioSource.connect(_audioGain1);
    _audioGain1.connect(_audioChannelSplitter);
    _audioGain1.connect(_audioContext.destination);

    for (let i = 0; i < _audioSource.channelCount; i++) {
        _audioAnalyser[i]                       = _audioContext.createAnalyser();
        _audioAnalyser[i].minDecibels           = -100;
        _audioAnalyser[i].maxDecibels           = 0;
        _audioAnalyser[i].smoothingTimeConstant = 0.8;
        _audioAnalyser[i].fftSize               = 32;
        _freqs[i]                               = new Uint8Array(_audioAnalyser[i].frequencyBinCount);

        _audioChannelSplitter.connect(_audioAnalyser[i], i, 0);
    }

    function calculateAudioLevels()  {
        setTimeout(() => {
            for (let channelI = 0; channelI < _audioAnalyser.length; channelI++) {
                _audioAnalyser[channelI].getByteFrequencyData(_freqs[channelI]);
                let value = 0;
                for (let freqBinI = 0; freqBinI < _audioAnalyser[channelI].frequencyBinCount; freqBinI++) {
                    value = Math.max(value, _freqs[channelI][freqBinI]);
                }
                audioLevels[channelI] = value / 256;
                console.log(audioLevels[channelI]);
            }
            requestAnimationFrame(calculateAudioLevels.bind(this));
        }, 1000 / 15); // Max 15fps — not more needed
}
}