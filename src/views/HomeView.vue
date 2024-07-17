<template>
  <div class="container">
    <div class="rectangle">
      <img src="/Rectangle1.png" class="img">
    </div>
    <div class="moon">
      <Moon/>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Moon from '../components/ThreeJS/Moon.vue'

  export default defineComponent({
  name: 'AboutView',
  components: {
    Moon,
  },
});

 
</script>

<style scoped>
  .container{
    display: grid;
    grid-column: 100%;
    width: 100%;
  }
  .rectangle{
    position: absolute;
    width: 100%;
    z-index: 1;
  }

  .rectangle, img{
   width: 100%;
   height: 680px;
   left: -4px;
  }

  .moon{
    z-index: 2;
  }
</style>