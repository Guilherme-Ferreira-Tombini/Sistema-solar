<template>
    <div ref="threeContainer" class="three-container"></div>
</template>
  
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import * as THREE from 'three';
  
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
          camera.position.z = 5;
  
          // Renderizador
          const renderer = new THREE.WebGLRenderer({ alpha: true });
          renderer.setSize(width, height);
          renderer.setClearColor(0x000000, 0); // Definir a cor de fundo para transparente
          threeContainer.value.appendChild(renderer.domElement);

          // Textura
          const textureLoader = new THREE.TextureLoader();
          const sunTexture = textureLoader.load('/Sun.jpg', 
            (texture) => {
              texture.wrapS = THREE.RepeatWrapping;
              texture.wrapT = THREE.RepeatWrapping;
              texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
              texture.needsUpdate = true;
            }
          );
  
          // Geometria da esfera
          const geometry = new THREE.SphereGeometry(3, 45, 45);
          const material = new THREE.MeshStandardMaterial({ map: sunTexture });
          const mercury = new THREE.Mesh(geometry, material);
          scene.add(mercury);
  
          // Iluminação

          const ambient = new THREE.AmbientLight(0x111111, 1000);
          scene.add(ambient);
  
          // Função de animação
          const animate = () => {
            requestAnimationFrame(animate);
            mercury.rotation.y += 0.005;
            renderer.render(scene, camera);
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
  