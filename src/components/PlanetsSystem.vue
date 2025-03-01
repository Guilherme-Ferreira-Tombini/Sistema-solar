<template>
  <div v-if="planets.length > 0" class="container">
    <div id="ir">
      <div class="botao" :class="{ disabled: currentIndex === 0 }" @click="prevPlanet">
        <img src="/esquerda.png" />
      </div>
    </div>

    <div class="container-planet">
      <Planet 
        :key="planets[currentIndex].Id" 
        :img="currentImage" 
        :tamanho="planets[currentIndex].Id === 10 ? 1.7 : planets[currentIndex].Id === 9 ? 3 : 2.6"
      /> 
      <h3>
          <a click="">
            {{ currentName }}
          </a>
     </h3>
    </div>

    <div id="ir">
      <div class="botao" :class="{ disabled: currentIndex === planets.length - 1 }" @click="nextPlanet">
        <img src="/direita.png" />
      </div>
    </div>
  </div>
  <h3 v-else>Aterrissando nave....</h3>
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
    const currentName = ref<string>("");
    const currentDescription = ref<string>("");

    const fetchPlanets = async () => {
      try {
        const response = await api.get<Planeta[]>("/");
        planets.value = response.data;
        if (planets.value.length > 0) {
          await fetch(planets.value[0].Id); // Busca a imagem do primeiro planeta
          currentName.value = planets.value[0].Name; // Buscando nome do primeiro planeta
          currentDescription.value = planets.value[0].Description; // Buscando a descrição do primeiro planeta
        }
      } catch (error) {
        console.error("Erro ao buscar planetas:", error);
      }
    };

    // Função para buscar a imagem do planeta atual
    const fetch = async (id: number) => {
        currentImage.value = `${api.defaults.baseURL}${id}/link`;
    };

    // Observa mudanças no índice atual 
    watch(currentIndex, async (newIndex) => {
      if (planets.value.length > 0) {
        await fetch(planets.value[newIndex].Id);
        currentName.value = planets.value[newIndex].Name;
        currentDescription.value = planets.value[newIndex].Description;
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
      currentName,
      currentDescription,
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
.container-planet{
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  
}

h3{
  margin-top: 2px;
  font-family: Michroma;
  font-size: larger;
}
</style>
