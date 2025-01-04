<template>
  <div ref="sceneContainer" class="scene-container"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import type { GLTF } from "three/examples/jsm/Addons.js";

export default defineComponent({
  name: "BlenderModelScene",
  setup() {
    const sceneContainer = ref<HTMLDivElement | null>(null);

    onMounted(() => {
      if (sceneContainer.value) {
        // Configuração da cena
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 2, 5);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        sceneContainer.value.appendChild(renderer.domElement);

        // Luzes
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 7.5);
        scene.add(ambientLight, directionalLight);

        // Carregar o modelo GLTF/GLB
        const loader = new GLTFLoader();
        loader.load(
          "src/components/ThreeJS/Foguete.glb", 
          (gltf: GLTF) => {
            const model = gltf.scene; // Tipagem do modelo carregado
            model.position.set(0, 2, 0);
            model.scale.set(1, 1, 1); // Ajuste o tamanho do modelo
            scene.add(model);
            scene.background = new THREE.Color(0xcccccc);

          },
          undefined, // onProgress
          (error) => {
            console.error("Erro ao carregar o modelo:", error);
          }
        );

        // Animação
        const animate = () => {
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
        };

        animate();

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
