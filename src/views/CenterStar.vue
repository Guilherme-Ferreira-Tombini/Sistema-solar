<template>
    <div>
       <Planets img="/Sun.jpg" :tamanho="2"/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Planets from '../components/ThreeJS/Planets.vue';

export default defineComponent({
  name: 'StarView',
  components: {
    Planets,
  },
})
</script>

<style scoped>

</style>