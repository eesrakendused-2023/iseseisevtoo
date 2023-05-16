import { createStore } from 'vuex';
import axios from 'axios';

const APP_ID = 'fc438396';
const API_KEY = '89c6476881a47fa787088d473971d819';

const store = createStore({
    state: {
        results: [],
        searchTerm: '',
        isLoading: false

  },
  mutations: {
    storeResults(state, payload = []) {
      //console.log(state, payload)
      state.results = payload;
    },
    updateSearchTerm(state, payload) {
      state.searchTerm = payload;
    },
    setLoadingState(state, payload) {
      console.log('test1')
      state.isLoading = payload;
      console.log('test2')
    }
  },
  getters: {
    getResults(state) {
      //console.log(state.results)
      return state.results.map(rec => rec.recipe);
    },
    getLoadingState(state) {
      //console.log(state.isLoading)
      return state.isLoading;
    }
  },
  actions: {
    async searchFood({ commit, state }) {
      commit('setLoadingState', true);
      try {
        
        const response = await axios.get(`https://api.edamam.com/search?q=${state.searchTerm}&app_id=${APP_ID}&app_key=${API_KEY}&from=0&to=50`);
        console.log(response.data.hits)
        commit('storeResults', response.data.hits);
        commit('setLoadingState', false);
      } catch (error) {
        console.error(error);
      }
    }
  }
});

export default store;