<template>
    <div class="container">
        <div>
            <img src="/Simbol.png" class="simbol">
        </div>
        <nav class="navigation">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/solar-system">System</RouterLink>
        </nav>
    </div>
</template>

<script setup lang="ts">
    import { RouterLink } from 'vue-router';
    
</script>

<style scoped>
    .container{
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .simbol{
        width: 100px;
        height: 90px;
        margin-left: 40px;
        margin-top: 10px;
    }
    .navigation{
        width: 17%;
        display: grid;
        grid-template-columns: 50% 50%;
        align-items: center;
    }
</style>