<template>
  <div class="container">
      <TextAstronaut/>
      <Foguete id="rocket"/>
      <FogueteFrente id="rocket2"/>
      <h1 class="messageText"></h1>
      <div id="button" class="container-start">
        <a @click="handle">
          <div class="start">
            <h3>START</h3>
          </div>
        </a>
      </div>
    
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import Foguete from '@/components/ThreeJS/Foguete.vue';
  import FogueteFrente from '@/components/ThreeJS/FogueteFrente.vue';
  import TextAstronaut from '@/components/TextAstronaut.vue';
  import { useRouter } from 'vue-router';

  export default defineComponent({
  name: 'HomeView',
  components: {
    TextAstronaut,
    Foguete,
    FogueteFrente,
  },
  setup() {
    const router = useRouter();
    const button = ref<HTMLElement | null>(null);
    const text = ref<HTMLElement | null>(null);
    const load = ref<HTMLElement | null>(null);
    const rocket = ref<HTMLElement | null>(null);
    const rocket2 = ref<HTMLElement | null>(null);

    onMounted(() => {
      button.value = document.getElementById("button");
      text.value = document.getElementById("text");
      load.value = document.querySelector('.messageText');
      rocket.value = document.getElementById('rocket');
      rocket2.value = document.getElementById('rocket2');
    });

    const handle = () => {
      setTimeout(() => {
        router.push("/solar-system");
      }, 8000); // Tempo de espera (8 segundos)

      if (button.value && text.value && load.value && rocket.value && rocket2.value) {
        button.value.style.display = 'none';
        text.value.style.display = 'none';

        load.value.style.display = "flex";
        load.value.style.padding = "20px";
        load.value.textContent = 'Aguarde o deslocamento...';
        rocket.value.style.display = "none";
        rocket2.value.style.display = "block";
      }
    };

    return {
      handle,
    };
  },
})
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

  .messageText{
    display: none;
    font-family: "Abel";
    font-size: 35px;
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
    cursor: pointer;
  }
  
  .start:hover{
    transition-duration: 0.5s;
    width: 90px;
    height: 90px;
  }

  #rocket2{
    display: none;
  }

</style>