<template>
    <div class="menu">
        <h5>{{text}}</h5>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
   // import Planets from './ThreeJS/Planets.vue';

    export default defineComponent({
        props:{
            text:{
                type: String,
                required: true,
            },
            link:{
                type: String,
                required: true,
            },
        }
    })
</script>

<style scoped>
    .menu{
        background-color: #3E4374;
        padding: 20px;
        border-radius: 30px;
        position: absolute;
    }
</style>