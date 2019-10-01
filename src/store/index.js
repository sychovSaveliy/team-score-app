import API from "@/services/ApiService";
import { filtersList } from "@/services/Filters";
import {
    MUTATION_UPDATE_EVENTS,
    ACTION_FETCH_EVENTS,
    ACTION_FILTER_EVENTS,
    MUTATION_FILTRED_EVENTS,
    MUTATION_UPDATE_FILTERS,
    ACTION_FETCH_PLAYER,
    MUTATION_SET_PLAYER,
    ACTION_LOGIN,
    MUTATION_LOGIN,
    MUTATION_LOGOUT,
    MUTATION_SET_USER,
    ACTION_FETCH_USER
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
      },
      player: {},
      user: {}
  },
  mutations: {
      [MUTATION_UPDATE_EVENTS](state, payload){
          state.fevents = payload.list;
          state.events = payload.list;
      },
      [MUTATION_FILTRED_EVENTS](state, payload){
          state.fevents = payload.list;
      },
      [MUTATION_UPDATE_FILTERS](state, payload){
          state.filters = {
            ...state.filters,
            [payload.name]: payload.value
          }
      },
      [MUTATION_SET_PLAYER](state, payload){
          state.player = payload.player
      },
      [MUTATION_LOGIN](state, payload){
          API.setToken(payload.token)
      },
      [MUTATION_LOGOUT](state){
          state.user = {}
          API.setToken('')
      },
      [MUTATION_SET_USER](state, payload){
          state.user = payload.user
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
              let events = resp.results.map(item => item.data)
              commit({
                  type: MUTATION_UPDATE_EVENTS,
                  list: events
              })                  
            })
            .catch(function(ex) {
              console.log("fetch data failed", ex);
            });
      },
      [ACTION_FETCH_PLAYER]({ commit }, payload){
        console.log(payload.url);
           API.fetch(payload.url)
            .then(resp => {  
                commit({
                    type: MUTATION_SET_PLAYER,
                    player: resp.player
                })
            })
            .catch(function(ex) {
            console.log("fetch data failed", ex);
            });
      },
      [ACTION_LOGIN]({ commit, dispatch }, payload){
        return new Promise((resolve, reject) => {
           API.fetch(payload.url, { method: 'POST', body: payload.values })
          .then(data => {
              commit({
                  type: MUTATION_LOGIN,
                  token: data.token
              })
              console.log('data.token ', data);
              return data.token              
            })
            .then(token => {
              return API.fetch(payload.url2, { headers : {authorization: `Play ${token}`}})
            })
            .then(data => {
                console.log('user',data)
                commit({
                    type: MUTATION_SET_USER,
                    user: data
                })
                resolve(data)
              })
            .catch(ex => {
              console.log("fetch data failed", ex);
              commit({
                  type: MUTATION_LOGOUT
              })
              reject(ex)
            })
        })
      },
      [ACTION_FETCH_USER]({ commit }, payload){
           API.fetch(payload.url)
            .then(data => {
              console.log('user', data);
              commit({
                  type: MUTATION_SET_USER,
                  user: data
              })              
            })
      }
  },
  getters: {
      getEvents(state) {
          return state.events;
      },
      getFiltredEvents(state) {
          return state.fevents;
      },
      getFiltres(state) {
          return state.filters;
      },
      getPlayer(state) {
          return state.player;
      },
      getUser(state) {
          return state.user;
      }
  }
}
