<template>
    <div ref="threeContainer" class="three-container"></div>
</template>
  
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import * as THREE from 'three';
  
  export default defineComponent({
    name: 'ThreeView',
    props:{
      img:{
        type: String,
        required: true,
      },
      tamanho:{
        type: Number,
        required: true,
      }
    },
    setup(props) {
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
          const texture = textureLoader.load(props.img, 
              (texture) => {
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
                texture.needsUpdate = true;
              }
            );
         
  
          // Geometria da esfera
          const geometry = new THREE.SphereGeometry(props.tamanho, 60, 60);
          const material = new THREE.MeshStandardMaterial({ map: texture });
          const planet = new THREE.Mesh(geometry, material);
          scene.add(planet);
  
          // Iluminação
          const light = new THREE.DirectionalLight(0xffffff, 8.0);
          light.position.set(120,30,45);  // Coloca a luz à esquerda da esfera
          scene.add(light);

          const ambient = new THREE.AmbientLight(0x111111,30);
          scene.add(ambient);
  
          // Função de animação
          const animate = () => {
            requestAnimationFrame(animate);
            planet.rotation.y += 0.005;
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
    width: 300px;
    height: 300px;
   
  }
</style>
  