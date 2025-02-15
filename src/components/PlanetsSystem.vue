<template>
    <div class="container">
      <div id="ir">
        <div class="botao" :class="{ disabled: currentIndex === 0 }" @click="prevPlanet">
          <img src="/esquerda.png" />
        </div>
      </div>
  
      <div>
        <Planet 
          v-if="planets.length > 0" 
          :key="planets[currentIndex].Id" 
          :img="currentImage" 
          :tamanho="planets[currentIndex].Id === 10 ? 1.7 : planets[currentIndex].Id === 9 ? 3 : 2.6" 
          :alt="planets[currentIndex].Name"
        /> 
      </div>
  
      <div id="ir">
        <div class="botao" :class="{ disabled: currentIndex === planets.length - 1 }" @click="nextPlanet">
          <img src="/direita.png" />
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref, watch } from "vue";
  import Planet from "./ThreeJS/Planet.vue";
  import api from "@/api/Api";
  
  interface Planeta {
    Id: number;
    Name: string;
    Description: string;
    Link: string;
  }
  
  export default defineComponent({
    name: "PlanetsSystem",
    components: {
      Planet,
    },
    setup() {
      const planets = ref<Planeta[]>([]);
      const currentIndex = ref<number>(0);
      const currentImage = ref<string>("");
  
  
      const fetchPlanets = async () => {
        try {
          const response = await api.get<Planeta[]>("/");
          planets.value = response.data;
            console.log(planets.value[0].Id)
          if (planets.value.length > 0) {
            await fetchImage(planets.value[0].Id); // Busca a imagem do primeiro planeta
          }
        } catch (error) {
          console.error("Erro ao buscar planetas:", error);
        }
      };
  
      // Função para buscar a imagem do planeta atual
      const fetchImage = async (id: number) => {
          currentImage.value = `${api.defaults.baseURL}${id}/link`;
      };
  
      // Observa mudanças no índice atual e carrega a nova imagem
      watch(currentIndex, async (newIndex) => {
        if (planets.value.length > 0) {
          await fetchImage(planets.value[newIndex].Id);
        }
      });
  
      // Funções de navegação
      const nextPlanet = () => {
        if (currentIndex.value < planets.value.length - 1) {
          currentIndex.value++;
        }
      };
  
      const prevPlanet = () => {
        if (currentIndex.value > 0) {
          currentIndex.value--;
        }
      };
  
      onMounted(fetchPlanets);
  
      return {
        planets,
        currentIndex,
        currentImage,
        nextPlanet,
        prevPlanet,
      };
    },
  });
  </script>
  
  <style scoped>
  .container {
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: 20% 60% 20%;
    justify-content: center;
    justify-items: center;
  }
  .botao {
    background-color: rgb(23, 13, 168);
    padding: 15px;
    border-radius: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .botao img {
    width: 40px;
  }
  #ir {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .botao.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  </style>
  