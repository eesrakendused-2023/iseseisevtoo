<template>
  <header class="pb-7">
    <nav class="bg-primary navbar bg-sky-600">
      <div class="flex justify-center h-20 ">
        <div class="navbar-item">
          <!-- <img src="@/assets/logo.svg" height="28" alt="logo" /> -->
          <span class="text-zinc-100 text-3xl font-bold navbar-item cursor-pointer" @click="reloadPage">Vue recipe app</span>
        </div>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <div class="flex justify-center">
            <form class="navbar-item" @submit.prevent="submitSearch">
              <div class="field">
                <input
                  class=" py-2 px-4 rounded-lg border border-gray-300"
                  type="text"
                  placeholder="Search for a recipe..."
                  @input="submitSearchTerm"
                  v-model="searchTerm"
                />
              </div>
              <button class="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded" type="submit"></button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>






<script>
export default {
  name: "Header",
  data() {
    return {
      searchTerm: ""
    };
  },
  methods: {
    submitSearch() {
      this.$store.dispatch("searchFood");
    },
    submitSearchTerm() {
      this.$store.commit("updateSearchTerm", this.searchTerm);
    },
    reloadPage() {
    window.location.reload();
  }
  }
};
</script>
