<template>
  <div ref="threeContainer" class="three-container"></div>
</template>
  
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import * as THREE from 'three';
  
  export default defineComponent({
    name: 'ThreeView',
    props: {
      img: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const threeContainer = ref<HTMLElement | null>(null);
  
      onMounted(() => {
        if (threeContainer.value) {
          // Cena
          const scene = new THREE.Scene();
  
          // Tamanhos
          threeContainer.value.style.width = '60vw'
          threeContainer.value.style.height = '360px'
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
          const planetTexture = textureLoader.load(props.img, 
            (texture) => {
              texture.wrapS = THREE.RepeatWrapping;
              texture.wrapT = THREE.RepeatWrapping;
              texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
              texture.needsUpdate = true;
            }
          );
  
          // Geometria da esfera
          const geometry = new THREE.SphereGeometry(3, 30, 30);
          const material = new THREE.MeshStandardMaterial({ map: planetTexture });
          const moon = new THREE.Mesh(geometry, material);
          scene.add(moon);
  
          // Iluminação
          const lightPlanet = new THREE.DirectionalLight(0xffffff, 9);
          lightPlanet.position.set(40,0,15);
          scene.add(lightPlanet);
          
          const ambient = new THREE.AmbientLight(0xffffff,0.1);
          scene.add(ambient);
         
  
          // Função de animação
          const animate = () => {
            requestAnimationFrame(animate);
            moon.rotation.y += 0.005;
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

</style>



