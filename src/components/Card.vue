<template>
  <div class="">
    <div class="text-center">
      <div>
        <img :src="item.image" :alt="item.label" class="mx-auto" />
      </div>
      <div>
        <p class="text-lg font-bold">{{ item.label }}</p>
        <button data-modal-target="defaultModal" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" @click="isCardModalActive = true">Show Recipe</button>
      </div>
    </div>

    <div v-if="isCardModalActive" class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
        <div class="bg-white p-4 rounded shadow-md w-full max-w-2xl ">
        <div class="flex justify-center">
          <figure class="image aspect-w-4 aspect-h-3 ">
            <img :src="item.image" :alt="item.label" class="w-9/12 " />
          </figure>
        </div>
        <div class="modal-card-content">
          <div class="content">
            <div class="media">
              <div class="media-content">
                <p class="text-xl font-bold">{{ item.label }}</p>
                <p class="text-sm">By: {{ item.source }}</p>
              </div>
            </div>

            <div class="content">
              <p v-if="item.totalTime > 0">Time to make: {{ item.totalTime }} minutes.</p>
              <p class="text-sm">{{ item.yield }} servings.</p>
              <div class="taglist">
                <span v-for="label in item.healthLabels" :key="label" class="inline-block bg-blue-200 text-blue-800 text-xs font-semibold rounded-full px-2 py-1 mr-1">{{ label }}</span>
              </div>
              <p>Ingredients:</p>
              <ul class="pb-4">
                <li v-for="(ingredient, i) in item.ingredientLines" :key="i">{{ ingredient }}</li>
              </ul>
              <a target="_blank" rel="noreferrer" class=" bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" :href="item.url">View source</a>
            </div>
          </div>
        </div>
        <button class="absolute top-0 right-0 m-4 text-gray-200" @click="isCardModalActive = false">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["item"],
  data() {
    return {
      isCardModalActive: false
    };
  }
};
</script>

<style>
.image {
  display: block;
  width: 100%;
  height: auto;
}
</style>
