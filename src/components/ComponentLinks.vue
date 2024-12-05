<template>
    <a :id="id" href="">
        <Planets :img="imagem" :tamanho="tamanho"/>
    </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Planets from './ThreeJS/Planets.vue';

export default defineComponent({
    name: 'LinksView',
    components:{
         Planets,
    },
    props: {
            id:{
                type: String,
                required: true,
            },
            imagem: {
                type: String,
                required: true,
            },
            tamanho: {
                type: Number,
                required: true,
            },
            
        },
})
</script>

<style scoped>

</style>