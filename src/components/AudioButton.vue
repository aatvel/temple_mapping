<template>
    <div class="audioButton">
        <h1></h1>
        <p></p>
        <!-- <button v-if="!playFlag" @click="onPlay()">Play</button>
        <button v-else @click="onPause()">Pause</button> -->
        <!-- <button class="btn btn-color">change color</button> -->
    </div>
</template>

<script>

import SpherePillards from "../classes/SpherePillards";

export default {
    name: "AudioButton",
    data() {
        return{
            initFlag: false,
            playFlag: false,
        }
    },
    methods:{
        onPlay(){
            
           if(!this.initFlag){
            this.initFlag = true,
            SpherePillards.init();
            }
            this.video.play();
            this.playFlag = true;
        },
        onPause(){
            this.video.pause();
            this.playFlag = false;
        },
    }
};
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.audioButton{
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    color: white;
    padding: 100px;
    pointer-events:none;
    

    button {
        color: white;
        background: transparent;
        border-radius: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        width: 100px;
        height: 50px;
        position: absolute;
        bottom: 100px;
        right: 100px;
        border: solid #d689d4;
        transition: all 0.3s;
        pointer-events: auto;

        &:hover{
            background: #d689d4;
        }
    }
}
</style>
