<template>
  <div class="grid grid-cols-4 gap-4">
    <div v-if="results.length === 0" class="col-span-full">
      <h1 class="text-center text-4xl">Search for a recipe!</h1>
    </div>
    
    <div v-for="(recipe, i) in results" :key="i" class="col-span-1 border">
      <Card :item="recipe" />
    </div>
  </div>
</template>




<script>
import Card from "./Card.vue";
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  components: {
    Card,
  },
  computed: {
    results() {
      //console.log(this.$store.getters.getResults);
      return this.$store.getters.getResults;
    },
    isLoading() {
      return this.$store.getters.getLoadingState;
    },
  },
});
</script>