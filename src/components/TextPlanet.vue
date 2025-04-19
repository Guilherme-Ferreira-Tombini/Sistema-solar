<template>
    <div class="data-container">
      <img @src="image" alt="" srcset="">
      <h2>{{ name }}</h2>
      <p>{{ description }}</p>
  
      <div class="button-arrow">
          <a @click="toggleV">
              Voltar
          </a>
      </div>
    </div>
  </template>
  
  <script lang="ts">
    import { defineComponent, type PropType} from 'vue';
    import ToggleDetails from './ToggleDetails';

    export default defineComponent({
      name: 'ThreeView',
      props: {
        image: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        element:{
          type: Object as PropType<HTMLElement>,
          required:false,
        },
        
      },
      setup(props) {
        const toggleV = () => {
          if(props.element){
            ToggleDetails(props.element);
          }
        }
        return {
          toggleV
        }
      },
    });
  </script>
  
  <style scoped>
    .data-container {
      display: flex;
      flex-direction: column;
      text-align: justify;
      justify-content: center;
      align-items: center;
      width: 97%;
      height: auto;
      padding: 20px;
      background-color: #202340;
      border-radius: 20px;
      font-family: Michroma;
    }
    h2 {
      font-size: 30px;
    }
    p {
      font-family: Abel;
      font-size: 20px;
    }
  </style>
  