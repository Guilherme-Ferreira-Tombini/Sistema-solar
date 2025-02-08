<template>
  <div class="container">
    <PlanetsSystem/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PlanetsSystem from '@/components/PlanetsSystem.vue';

  export default defineComponent({
    name: 'SolarSystem',
    components: {
      PlanetsSystem,
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