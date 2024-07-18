<template>
  <div class="container">
    <System/>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import System from '../components/ThreeJS/System.vue'

  export default defineComponent({
    name: 'SolarSystem',
    components: {
      System,
    },
  });

</script>

<style scoped>
  .container{
    display: grid;
    grid-column: 100%;
    width: 100%;
  }
</style>