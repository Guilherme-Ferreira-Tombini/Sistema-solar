<template>
  <div class="container">
    <div class="rectangle">
      <img src="/Rectangle1.png" class="img">
    </div>

    <div class="moon">
      <Planet/>
    </div>

    <div class="info-container">
      <div class="info">
        <h2>Quer saber mais sobre o sistema solar? Então acessou o site certo. 
        Vamos mostrar algumas informações sobre os planetas do nosso grandioso sistema solar em 3D.
        </h2>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Planet from '../components/ThreeJS/Mercury.vue'

  export default defineComponent({
  name: 'HomeView',
  components: {
    Planet,
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

  .info-container{
    margin-top: 30px;
    margin-bottom: 180px;
    font-family: "Abel";
    z-index: 2;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
  }

  .info{
    width: 60%;
    padding: 40px;
    background-color: #202340;
    border-radius: 50px;
    opacity: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
  }

  .info, h2{
    font-size: 23px;
    text-align: justify;
  }
</style>