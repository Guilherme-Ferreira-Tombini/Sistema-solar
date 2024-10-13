<template>
    <div>
       <MenuComponent text="Planets" link="/solar-system"/>
       <Sun/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MenuComponent from '@/components/MenuComponent.vue';
import Sun from '@/components/ThreeJS/Sun.vue';

export default defineComponent({
  name: 'StarView',
  components: {
    Sun,
    MenuComponent,
  },
})
</script>

<style scoped>

</style>