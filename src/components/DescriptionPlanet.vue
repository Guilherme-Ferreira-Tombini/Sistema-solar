<template>
    <div class="data-container">
        <Planets :img="img" />
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
    import Planets from './ThreeJS/Planets.vue';

    export default defineComponent({
        name: 'ThreeView',
        components:{
            Planets
        },
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
    .button-arrow {
        background-color: #0C0D1C;
        border-radius: 100%;
        display: inline-block;
        padding: 10px;
        width: 50px;
        height: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    img{
        transform: rotate(180deg);
        width: 30px;
        height: 40px;
    }
    .data-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
    }
</style>
