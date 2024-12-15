<template>
    <div ref="sceneContainer" class="scene-container"></div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref } from "vue";
  import * as THREE from "three";
  
  export default defineComponent({
    name: "RocketScene",
    setup() {
      const sceneContainer = ref<HTMLDivElement | null>(null);
  
      onMounted(() => {
        if (sceneContainer.value) {
          // Configuração da cena
          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
          camera.position.z = 5;
  
          const renderer = new THREE.WebGLRenderer();
          renderer.setSize(window.innerWidth, window.innerHeight);
          sceneContainer.value.appendChild(renderer.domElement);
  
          // Criação do foguete (forma realista)
          const rocketBodyGeometry = new THREE.CylinderGeometry(0.4, 0.4, 3, 32);
          const rocketBodyMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
          const rocketBody = new THREE.Mesh(rocketBodyGeometry, rocketBodyMaterial);
  
          const rocketNoseGeometry = new THREE.ConeGeometry(0.4, 1, 32);
          const rocketNoseMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
          const rocketNose = new THREE.Mesh(rocketNoseGeometry, rocketNoseMaterial);
          rocketNose.position.y = 2;
  
          const rocketFinGeometry = new THREE.BoxGeometry(0.1, 0.5, 0.2);
          const rocketFinMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
          const fins = [];
          for (let i = 0; i < 4; i++) {
            const fin = new THREE.Mesh(rocketFinGeometry, rocketFinMaterial);
            fin.position.set(0.4 * Math.cos((Math.PI / 2) * i), -1.5, 0.4 * Math.sin((Math.PI / 2) * i));
            fin.rotation.y = (Math.PI / 2) * i;
            fins.push(fin);
            rocketBody.add(fin);
          }
  
          rocketBody.rotation.z = Math.PI / 2;
          rocketNose.rotation.z = Math.PI / 2;
  
          rocketBody.add(rocketNose);
          scene.add(rocketBody);
  
          // Chama do motor (forma realista)
          const fireGeometry = new THREE.ConeGeometry(0.3, 1, 16);
          const fireMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500, emissive: 0xff4500 });
          const fire = new THREE.Mesh(fireGeometry, fireMaterial);
          fire.position.set(-1.8, 0, 0);
          fire.rotation.z = Math.PI;
          rocketBody.add(fire);
  
          // Luz ambiente
          const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
          scene.add(ambientLight);
  
          // Luz direcional
          const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
          directionalLight.position.set(10, 10, 10);
          scene.add(directionalLight);
  
          // Animação
          const clock = new THREE.Clock();
          const animate = () => {
            requestAnimationFrame(animate);
  
            // Animação de rotação do foguete
            rocketBody.rotation.x += 0.01;
            
  
            // Animação da chama (mudança de escala)
            fire.scale.y = 0.8 + Math.sin(clock.elapsedTime * 20) * 0.2;
  
            renderer.render(scene, camera);
          };
  
          animate();
  
          // Ajustar o tamanho do canvas ao redimensionar a janela
          window.addEventListener("resize", () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
          });
        }
      });
  
      return {
        sceneContainer,
      };
    },
  });
  </script>
  
  <style scoped>
  .scene-container {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
  </style>