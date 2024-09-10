<template>
    <div class="menu">
       <a :href="link">
         <p>{{text}}</p>
       </a> 
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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
        border-radius: 30px 0 0 30px;
        position: absolute;
        right: 0;
        font-family: "Michroma";
    }
</style>