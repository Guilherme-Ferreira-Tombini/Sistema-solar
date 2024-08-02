<template>
  <div ref="threeContainer" class="three-container"></div>
  <div v-if="selectedPlanet" class="info-container">
    <DescriptionPlanet :img="selectedPlanet.texture" :name="selectedPlanet.name" :description="selectedPlanet.name"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import DescriptionPlanet from '../DescriptionPlanet.vue'

export default defineComponent({
  name: 'ThreeView',
  components:{DescriptionPlanet},
  setup() {
    const threeContainer = ref<HTMLElement | null>(null);
    const selectedPlanet = ref<{ name: string; texture: string } | null>(null);

    onMounted(() => {
      if (threeContainer.value) {
        // Cena
        const scene = new THREE.Scene();

        // Tamanhos
        const width = threeContainer.value.clientWidth;
        const height = threeContainer.value.clientHeight;

        // Câmera
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.set(0, 20, 50);
        camera.lookAt(0, 0, 0);

        // Renderizador
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0); // Definir a cor de fundo para transparente
        threeContainer.value.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // Habilitar amortecimento (inércia)
        controls.dampingFactor = 0.25; // Fator de amortecimento
        controls.screenSpacePanning = false; // Desabilitar o pan em espaço de tela

        // Raycaster e Vector2 para o mouse
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        // Sol
        const textureLoader = new THREE.TextureLoader();
        const sunTexture = textureLoader.load('/Sun.jpg');
        const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
        const sunMaterial = new THREE.MeshStandardMaterial({ map: sunTexture });
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        scene.add(sun);

        // Luz ambiente
        const ambient = new THREE.AmbientLight(0xffffff, 3);
        scene.add(ambient);

        // Planetas
        const planets: { 
          mesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>; 
          distance: number; 
          angle: number; 
          speed: number;
          name: string;
          texture: string;
        }[] = [];

        const planetData = [
          { name: 'Mercúrio', texture: '/Mercury.jpg', size: 0.5, distance: 10 },
          { name: 'Vênus', texture: '/Venus.jpg', size: 0.7, distance: 15 },
          { name: 'Terra', texture: '/Earth.jpg', size: 0.8, distance: 20 },
          { name: 'Marte', texture: '/Mars.jpg', size: 0.6, distance: 25 },
          { name: 'Júpiter', texture: '/Jupiter.jpg', size: 1.2, distance: 35 },
          { name: 'Saturno', texture: '/Saturn.jpg', size: 1.0, distance: 45 },
          { name: 'Urano', texture: '/Uranus.jpg', size: 0.7, distance: 55 },
          { name: 'Netuno', texture: '/Neptune.jpg', size: 0.6, distance: 65 }
        ];

        planetData.forEach((data) => {
          const planetTexture = textureLoader.load(data.texture);
          const geometry = new THREE.SphereGeometry(data.size, 20, 20);
          const material = new THREE.MeshStandardMaterial({ map: planetTexture });
          const planet = new THREE.Mesh(geometry, material);
          planet.position.set(data.distance, 0, 0);
          scene.add(planet);

          planets.push({
            mesh: planet,
            distance: data.distance,
            angle: Math.random() * Math.PI * 2,
            speed: 0.005,
            name: data.name,
            texture: data.texture,
          });
        });

        // Lua
        const moonTexture = textureLoader.load('/IMGMoon.jpg');
        const moonGeometry = new THREE.SphereGeometry(0.2, 20, 20);
        const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });
        const moon = new THREE.Mesh(moonGeometry, moonMaterial);
        scene.add(moon);

        // Evento de clique
        const onMouseClick = (event: MouseEvent) => {
          if (!threeContainer.value) return;

          // Calcula a posição do mouse em coordenadas normalizadas do dispositivo
          const rect = threeContainer.value.getBoundingClientRect();
          mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
          raycaster.setFromCamera(mouse, camera);

          // Calcula os objetos intersectados
          const intersects = raycaster.intersectObjects(scene.children, true);

          if (intersects.length > 0) {
            const intersectedObject = intersects[0].object;

            // Encontra o planeta correspondente
            const planet = planets.find(p => p.mesh === intersectedObject);
            if (planet) {
              selectedPlanet.value = {
                name: planet.name,
                texture: planet.texture,
              };
            }
          }
        };

        // Adiciona o evento de clique ao contêiner
        if (threeContainer.value) {
          threeContainer.value.addEventListener('click', onMouseClick, false);
        }

        // Animação
        const animate = () => {
          requestAnimationFrame(animate);

          // Atualiza a posição dos planetas
          planets.forEach(planet => {
            planet.angle += planet.speed;
            planet.mesh.position.x = planet.distance * Math.cos(planet.angle);
            planet.mesh.position.z = planet.distance * Math.sin(planet.angle);
          });

          // Atualiza a posição da Lua
          const earth = planets.find(planet => planet.name === 'Terra');
          if (earth) {
            moon.position.x = earth.mesh.position.x + 1.5 * Math.cos(earth.angle * 12);
            moon.position.z = earth.mesh.position.z + 1.5 * Math.sin(earth.angle * 12);
          }

          renderer.render(scene, camera);
          controls.update();
        };
        animate();
      }
    });

    return {
      threeContainer,
      selectedPlanet,
    };
  },
});
</script>

<style scoped>
.three-container {
  width: 100%;
  height: 98vh;
  position: relative;
}

.info-container {
  color: rgb(255, 255, 255);
  display: grid;
  font-family: "Michroma";
  grid-template-columns: 90%;
  justify-items: center;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 80%;
  height: 100vh;
  left: 10%;
  bottom: 0 auto;
  border-top-left-radius: 95px;
  border-top-right-radius: 95px;
  background-color: #202340;
}

</style>
