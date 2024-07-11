<HTML>
    <Head>
        <link href="https://fonts.cdnfonts.com/css/seven-segment" rel="stylesheet">
        <link rel="stylesheet" href="style.css">
        <script src="lights.js"></script>
    </Head>
    <Body>
    <button id="start">Start </button>
    <button id="stop"> Stop</button>    
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
                <input type="text" class="talent-text" readonly value="Talent"></input>
                <input type="range" min="1" max="100" value="50" class="volume-slider" id="Volume">
            </div>
            <button class="sidebutton" id="speak" onmousedown="PTT()" onmouseup="releasePTT()">Speak</button>
        </div>
        <button id="change_color" onclick="change_color()">change color</button>
    </Body>
</HTML>