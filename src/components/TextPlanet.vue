<template>
    <div class="data-container">
       <!-- <Planets :img="img" /> -->
        <h2>{{ name }}</h2>
        <p>{{ description }}</p>
        
        <div class="button-arrow">
            <a href="/solar-system">
                <img src="/Arrow.png" alt="Arrow">
            </a>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
   // import Planets from './ThreeJS/Planets.vue';

    export default defineComponent({
        name: 'ThreeView',
        props: {
            img: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            description:{
                type: String,
                required: true,
            }
        },
    })
</script>

<style scoped>
</style>
