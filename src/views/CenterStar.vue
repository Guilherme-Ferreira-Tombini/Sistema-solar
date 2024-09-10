<template>
    <div>
       <Star/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Star from '../components/ThreeJS/Star.vue';

export default defineComponent({
  name: 'StarView',
  components: {
    Star,
  },
})
</script>

<style scoped>

</style>