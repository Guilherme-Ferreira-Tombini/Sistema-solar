<template>
  <div ref="sceneContainer" class="scene-container"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

export default defineComponent({
  name: "BlenderModelScene",
  setup() {
    const sceneContainer = ref<HTMLDivElement | null>(null);

    onMounted(() => {
      if (sceneContainer.value) {
        // Configuração da cena
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(-0.3, 2.9, 5);

        const renderer = new THREE.WebGLRenderer({ alpha: true }); // Fundo transparente
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0); // Transparência
        sceneContainer.value.appendChild(renderer.domElement);

        // Luzes
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 7.5);
        scene.add(ambientLight, directionalLight);

        // Variáveis para as estrelas
        let stars: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>;

        // Adicionar estrelas
        const addStars = () => {
          const starGeometry = new THREE.BufferGeometry();
          const starMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.1,
          });

          const starCount = 1000;
          const starVertices = [];
          for (let i = 0; i < starCount; i++) {
            const x = (Math.random() - 0.5) * 200; // Espaço 3D
            const y = (Math.random() - 0.5) * 200;
            const z = (Math.random() - 0.5) * 200;
            starVertices.push(x, y, z);
          }

          starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3));
          stars = new THREE.Points(starGeometry, starMaterial);
          scene.add(stars);
        };

        addStars(); // Chamar a função para adicionar as estrelas

        // Carregar o modelo GLTF/GLB
        const loader = new GLTFLoader();
        loader.load(
          "src/components/ThreeJS/FogueteGirando.glb",
          (gltf: GLTF) => {
            const model = gltf.scene;
            model.position.set(-0.3, 3, -1);
            model.rotation.x = 0;
            model.rotation.z = -(Math.PI / 2);
            model.scale.set(0.7, 0.7, 0.7);
            scene.add(model);

            const mixer = new THREE.AnimationMixer(model);
            if (gltf.animations && gltf.animations.length > 0) {
              gltf.animations.forEach((clip) => {
                const action = mixer.clipAction(clip);
                action.timeScale = 0.5;
                action.play();
              });
            }

            // Animação
            const clock = new THREE.Clock();
            const animate = () => {
              requestAnimationFrame(animate);

              // Atualizar posição das estrelas
              const starPositions = stars.geometry.attributes.position.array as Float32Array;
              for (let i = 0; i < starPositions.length; i += 3) {
                starPositions[i] -= 0.2; // Move da direita para a esquerda
                if (starPositions[i] < -100) {
                  starPositions[i] = 100; // Reposiciona para o lado direito
                }
              }
              stars.geometry.attributes.position.needsUpdate = true;

              // Atualizar animações
              const delta = clock.getDelta();
              mixer.update(delta);

              renderer.render(scene, camera);
            };

            animate();
          },
          undefined,
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
  width: 100%; /* Aumenta a largura */
  height: 598px; /* Aumenta a altura */
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: -1; /* Garantir que fique no fundo */
}
</style>
