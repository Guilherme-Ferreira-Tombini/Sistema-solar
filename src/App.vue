<template>
  <div>
    <HeaderPag/>
    <RouterView/>
  </div>
</template>

<script setup lang="ts">
  import HeaderPag from './components/HeaderPag.vue';
  import { RouterView } from 'vue-router';
</script>

<style scoped>

</style>