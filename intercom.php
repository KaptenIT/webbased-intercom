<?php

$Stream_channels = ["producer", "sound", "lights","gfx"];
//$Stream_channels = ["poop"];

?>
<HTML>
    <Head>
        <link href="https://fonts.cdnfonts.com/css/seven-segment" rel="stylesheet">
        <link rel="stylesheet" href="style.css">
        <script src="lights.js"></script>
    </Head>
    <Body>
        <p style:"color:white;"> you are <?php echo $_POST["username"];?>

        <div class="control_panel">
        <?php
        foreach ($Stream_channels as $channel){
            
        echo'
        <div class="control_per_channel">
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
                <audio id="'.$channel.'" autoplay></audio>
                <input type="text" class="talent-text" readonly value="'.$channel.'"></input>
                <input type="range" min="1" max="100" value="50" onchange="change_Vol('.$channel.';this.value);w" class="volume-slider" id="'.$channel.'_volume">
            </div>
            <button class="sidebutton" id="'.$channel.'_PTT" onmousedown="PTT('.$channel.')" onmouseup="releasePTT('.$channel.')">Speak</button>
        </div>';
        }
        ?>
        </div>
        <script>
            var Stream_Channels = <?php echo json_encode($Stream_channels);?>;
        </script>
        <button id="change_color" onclick="change_color()">change color</button>
        <script src="intercom.js"></script>
    </Body>
</HTML>