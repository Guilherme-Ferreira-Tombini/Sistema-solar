<template>
    <div id="text" class="container1">
        <div class="image">
            <img src="/Astronauta.png" alt="">
        </div>
        <div class="container-text">
            <div class="cloud-text">
                <p>Olá serei o seu ajudante nessa jornada emocionante pelo sistema 
                   solar. Para começar sua aventura, aperte o botao START logo abaixo.</p>
            </div> 
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    
})
</script>

<style scoped>
    .container1{
        top: 30px;
        right: 70px;
        width: 520px;
        height: 200px;
        display: flex;
        flex-direction: row;
        position: absolute;
    }
    .image{
        width: 23%;
    }
    .image > img{
        margin-top: 40px;
        width: 145px;
        transform: scaleX(-1);
    }
    .container-text{
        width: 78%;
        padding: 10px;
    }
    .cloud-text{
        background-color: white;
        padding-top: 5px; 
        padding-bottom: 5px;
        padding-right: 25px;
        padding-left: 25px; 
        border-radius: 20px;
        color: black;
        position: relative;
        text-align: justify;
        font-family: "Abel";
        font-size: 16.3px;
        line-height: 23px;
    }
    .cloud-text::before{
       content: '';
       position: absolute;
       width: 24px;
       height: 24px;
       left: -6px;
       bottom: 18px;
       background: #fff;
       -webkit-transform: rotate(45deg);
    }
</style>
