<template>
    <div class="container">
        <div id="ir">
            <div class="botao">
                <a href="http://">
                    <img src="/esquerda.png">
                </a>
            </div>
        </div>
        <Planet img="exemplo" :tamanho="4"/>
        <div id="ir">
           <div class="botao">
                <a href="http://">
                    <img src="/direita.png">
                </a>
           </div>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Planet from './ThreeJS/Planet.vue';
import api from '@/api/Api';

    export default defineComponent({
    name: 'PlanetsSystem',
    components: {
        Planet,
    },
    })

</script>

<style scoped>
    .container{
        width: 100%;
        height: auto;
        display: grid;
        grid-template-columns: 20% 60% 20%;
        justify-content: center;
        justify-items: center;
    }
   .botao{
    background-color: rgb(23, 13, 168);
    padding: 15px;
    border-radius: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
   }
   .botao img{
    width: 40px;
   }
   #ir{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
   }
</style>