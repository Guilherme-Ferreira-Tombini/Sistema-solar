<template>
  <div class="container">
    <MenuComponent text="Star" link="/solar-system-star"/>

    <div class="planetsOrganizados">
        <Planets img="/Earth.jpg" :tamanho="2"/>
        <Planets img="/Jupiter.jpg" :tamanho="2"/>
        <Planets img="/Mars.jpg" :tamanho="2"/>
        <Planets img="/Mercury.jpg" :tamanho="2"/>
        <Planets img="/Neptune.jpg" :tamanho="2"/>
        <Planets img="/Saturn.jpg" :tamanho="2"/>
        <Planets img="/Uranus.jpg" :tamanho="2"/>
        <Planets img="/Venus.jpg" :tamanho="2"/>
    </div>
  </div>
</template>

<script lang="ts">
import MenuComponent from '@/components/MenuComponent.vue';
import Planets from '@/components/ThreeJS/Planets.vue';
import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'SolarSystem',
    components: {
      MenuComponent,
      Planets,
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