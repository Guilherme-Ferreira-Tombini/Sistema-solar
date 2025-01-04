<template>
  <div class="container">
    <div class="astro">
      <TextAstronaut/>
    </div>

    <!-- <Foguete/> -->
    
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Foguete from '@/components/ThreeJS/Foguete.vue';
  import TextAstronaut from '@/components/TextAstronaut.vue';

  export default defineComponent({
  name: 'HomeView',
  components: {
   // Foguete,
    TextAstronaut,
  },
});
</script>

<style scoped>
  .container{
  }

</style>