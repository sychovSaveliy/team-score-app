import API from "@/services/ApiService";
import {
    MUTATION_UPDATE_EVENTS,
    ACTION_FETCH_EVENTS,
    ACTION_FILTER_EVENTS,
    MUTATION_FILTRED_EVENTS
} from './constants';   

export default {
  state: {
      events: [],
      fevents: [],
      filters: {
        status: {
          name: "all",
          title: "Все"
        },
        typeOfEvent: {
          name: "all",
          title: "Все"
        },
      }
  },
  mutations: {
      [MUTATION_UPDATE_EVENTS](state, payload){
          state.fevents = payload.list;
          state.events = payload.list;
      },
      [MUTATION_FILTRED_EVENTS](state, payload){
          state.fevents = payload.list;
      },
  },
  actions: {
      [ACTION_FILTER_EVENTS]({ state, commit }, payload) {
          let filterResults = [];
          switch (payload.method) {
              case 'search':
                  filterResults = payload.events.filter(item => item.teamA.teamName.indexOf(payload.searchQuery) >= 0 || item.teamB.teamName.indexOf(payload.searchQuery) >= 0 || item.field.city.indexOf(payload.searchQuery) >= 0);
                  break;
              case 'filter':
                  filterResults = payload.events.filter(item => Object.keys(state.filters).every(key => (item[key] === state.filters[key].name) || (state.filters[key].name == "all")));
                  break;
          }
          commit({
              type: MUTATION_FILTRED_EVENTS,
              list: filterResults
          });
      },
      [ACTION_FETCH_EVENTS]({ commit }, payload){
           API.fetch(payload.url)
            .then(resp => { 
                let events = resp.map(item => item.data)
            
                commit({
                    type: MUTATION_UPDATE_EVENTS,
                    list: events
                })
            })
            .catch(function(ex) {
            console.log("fetch data failed", ex);
            });
      }
  },
  getters: {
      getEvents(state) {
          return state.events;
      },
      getFiltredEvents(state) {
          return state.fevents;
      }
  }
}