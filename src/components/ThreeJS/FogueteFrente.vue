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
          "src/components/ThreeJS/FogueteGirando.glb", 
          (gltf: GLTF) => {
            const model = gltf.scene;
            model.position.set(-0.3, 3, -1);
            model.rotation.x = 0; 
            model.rotation.z = -(Math.PI/2); 
            model.scale.set(0.7, 0.7, 0.7); // Ajuste o tamanho do modelo
            scene.add(model);

            const mixer = new THREE.AnimationMixer(model);
            if (gltf.animations && gltf.animations.length > 0) {
              gltf.animations.forEach((clip) => {
                const action = mixer.clipAction(clip);
                action.timeScale = 0.5;
                action.play();
              });
            }

            // Animação para girar o foguete no eixo X mantendo o Y
            const clock = new THREE.Clock();
            const animate = () => {
              requestAnimationFrame(animate);
              mixer.update(clock.getDelta()); // Atualiza a animação do modelo
             // model.position.x += 0.03;
            // model.position.z = 0;
             // model.position.y = 3;
              renderer.render(scene, camera);
            };

            animate();
          },
          undefined, // onProgress
          (error) => {
            console.error("Erro ao carregar o modelo:", error);
          }
        );
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
  height: 340px;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
</style>
