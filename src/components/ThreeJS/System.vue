<template>
  <div ref="threeContainer" class="three-container"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default defineComponent({
  name: 'ThreeView',
  setup() {
    const threeContainer = ref<HTMLElement | null>(null);

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

        // Sol
        const textureLoader = new THREE.TextureLoader();
        const sunTexture = textureLoader.load('/Sun.jpg', 
          (texture) => {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
            texture.needsUpdate = true;
          }
        );
        const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
        const sunMaterial = new THREE.MeshStandardMaterial({ map: sunTexture });
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        scene.add(sun);

        // Luz
        const ambient = new THREE.AmbientLight(0x111111, 400);
        scene.add(ambient);

        // Planetas
        const planets: { mesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>; distance: number; angle: number; speed: number; }[] = [];
        const planetData = [
          { texture:'/Mercury.jpg', size: 0.5, distance: 10, speed: 0.04 },  // Mercury
          { texture:'/Venus.jpg', size: 0.7, distance: 15, speed: 0.02 },  // Venus
          { texture:'/Earth.jpg', size: 0.8, distance: 20, speed: 0.01 },  // Earth
          { texture:'/Mars.jpg', size: 0.6, distance: 25, speed: 0.008 },  // Mars
          { texture:'/Jupiter.jpg', size: 1.2, distance: 35, speed: 0.005 },  // Jupiter
          { texture:'/Saturn.jpg', size: 1.0, distance: 45, speed: 0.004 },  // Saturn
          { texture:'/Uranus.jpg', size: 0.7, distance: 55, speed: 0.003 },  // Uranus
          { texture:'/Neptune.jpg', size: 0.6, distance: 65, speed: 0.002 }   // Neptune
        ];

        const earthGroup = new THREE.Group();
        scene.add(earthGroup);

        planetData.forEach((data) => {
          const planetTexture = textureLoader.load(`${data.texture}`, 
            (texture) => {
              texture.wrapS = THREE.RepeatWrapping;
              texture.wrapT = THREE.RepeatWrapping;
              texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
              texture.needsUpdate = true;
            }
          );
          const geometry = new THREE.SphereGeometry(data.size, 20, 20);
          const material = new THREE.MeshStandardMaterial({ map: planetTexture });
          const planet = new THREE.Mesh(geometry, material);
          planet.position.x = data.distance;

          if (data.texture === '/Earth.jpg') {
            earthGroup.add(planet);
          } else {
            scene.add(planet);
          }

          planets.push({
            mesh: planet,
            distance: data.distance,
            angle: Math.random() * Math.PI * 2,  // Ângulo inicial aleatório
            speed: data.speed
          });
        });

        // Lua
        const moonTexture = textureLoader.load('/IMGMoon.jpg', 
          (texture) => {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
            texture.needsUpdate = true;
          }
        );
        const moonGeometry = new THREE.SphereGeometry(0.2, 20, 20);
        const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });
        const moon = new THREE.Mesh(moonGeometry, moonMaterial);
        earthGroup.add(moon);

        // Animação
        const animate = () => {
          requestAnimationFrame(animate);

          // Atualiza a posição dos planetas
          planets.forEach(planet => {
            planet.angle += planet.speed;  // Velocidade de rotação
            planet.mesh.position.x = planet.distance * Math.cos(planet.angle);
            planet.mesh.position.z = planet.distance * Math.sin(planet.angle);
          });

          // Atualiza a posição da Lua
          const earth = planets.find(planet => planet.mesh === earthGroup.children[0]);
          if (earth) {
            moon.position.x = earth.mesh.position.x + 1.5 * Math.cos(earth.angle * 12);  // Órbita da Lua ao redor da Terra
            moon.position.z = earth.mesh.position.z + 1.5 * Math.sin(earth.angle * 12);  // Órbita da Lua ao redor da Terra
          }

          renderer.render(scene, camera);
          controls.update();
        };
        animate();
      }
    });

    return {
      threeContainer,
    };
  },
});
</script>

<style scoped>
.three-container {
  width: 100%;
  height: 100vh;
}
</style>
