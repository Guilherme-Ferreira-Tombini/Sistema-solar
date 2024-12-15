<template>
  <div class="container">
   
    
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Foguete from '@/components/ThreeJS/Foguete.vue';

  export default defineComponent({
  name: 'HomeView',
  components: {
   // Foguete,
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