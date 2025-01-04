<template>
    <div class="container">
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
    .container{
        width: 500px;
        height: 200px;
        display: flex;
        flex-direction: row;
    }
    .image{
        width: 30%;
    }
    .image > img{
       margin-top: 35px;
        width: 175px;
        transform: scaleX(-1);
    }
    .container-text{
        width: 70%;
        padding: 10px;
    }
    .cloud-text{
        background-color: white;
        padding: 15px;  
        border-radius: 20px;
        color: black;
        position: relative;
        text-align: justify;
        font-family: "Abel";
        font-size: 16.5px;
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
