<template>
  <div class="container">
    <MenuComponent text="Planets" link="/solar-system-star"/>
  </div>
</template>

<script lang="ts">
import MenuComponent from '@/components/MenuComponent.vue';
import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'SolarSystem',
    components: {
      MenuComponent,
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