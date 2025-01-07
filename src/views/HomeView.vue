<template>
  <div class="container">
      <TextAstronaut/>
      <Foguete/>
      <div class="container-start">
        <a href="/solar-system">
          <div class="start">
            <h3>START</h3>
          </div>
        </a>
      </div>
    
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Foguete from '@/components/ThreeJS/Foguete.vue';
  import TextAstronaut from '@/components/TextAstronaut.vue';

  export default defineComponent({
  name: 'HomeView',
  components: {
    TextAstronaut,
    Foguete,
  },
});
</script>

<style scoped>
  .container{
    height: 100vh;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-items: center;
  }
  .container-start{
    margin-top: 66px;
    padding: 4px;
    width: 90px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    background-color: white;
  }
  .start{
    width: 80px;
    height: 80px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: red;
    border-radius: 100%;
    font-family: "Reddit";
  }

  .start:hover{
    transition-duration: 0.5s;
    width: 90px;
    height: 90px;
  }

</style>