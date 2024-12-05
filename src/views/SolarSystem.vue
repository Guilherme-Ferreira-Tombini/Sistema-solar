<template>
  <div class="container">
    <MenuComponent text="Star" link="/solar-system-star"/>

    <div class="planetsOrganizados">

     <!--AQUI FICARAM OS PLANETAS--> 
    </div>
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

  .planetsOrganizados{
    padding: 20px;
    display: flex;
    align-items:center;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>