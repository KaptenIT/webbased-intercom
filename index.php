<HTML>
    <Head>
        <link href="https://fonts.cdnfonts.com/css/seven-segment" rel="stylesheet">
        <link rel="stylesheet" href="style.css">
        <script src="lights.js"></script>
    </Head>
    <Body>
        <div class="controls">
            <button class="sidebutton" id="listen" onclick="listen_to_channel()">Listen</button>
            <div clas="centercolumn">
                <div class="lightbar">
                    <span class="bulb" id="bulb-1"></span>
                    <span class="bulb" id="bulb-2"></span>
                    <span class="bulb" id="bulb-3"></span>
                    <span class="bulb" id="bulb-4"></span>
                    <span class="bulb" id="bulb-5"></span>
                    <span class="bulb" id="bulb-6"></span>
                    <span class="bulb" id="bulb-7"></span>
                    <span class="bulb" id="bulb-8"></span>
                </div>
                <audio id="stream1" autoplay></audio>
                <input type="text" class="talent-text" readonly value="Talent"></input>
                <input type="range" min="1" max="100" value="50" class="volume-slider" id="Volume">
            </div>
            <button class="sidebutton" id="speak" onmousedown="PTT()" onmouseup="releasePTT()">Speak</button>
        </div>
        <button id="change_color" onclick="change_color()">change color</button>
        <script src="intercom.js"></script>
    </Body>
</HTML>