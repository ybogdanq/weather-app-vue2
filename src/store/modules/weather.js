import Vue from "vue";
import axios from "axios";
import mutations from "../mutations";

const {
  ADD_SEARCH_HISTORY,
  TOGGLE_LOADER,
  CHANGE_POST,
  CHANGE_WEATHER,
  CITY_FORECAST,
  GET_ERROR,
} = mutations;

const weather = {
  namespaced: true,
  state: {
    userPostCode: null,
    weatherInfo: {},
    toggleLoader: null,
    searchHistory: [],
    weatherForecast: [],
    errorMsg: null,
  },
  getters: {
    userPostCode: ({ userPostCode }) => userPostCode,
    weatherInfo: ({ weatherInfo }) => weatherInfo,
    toggleLoader: ({ toggleLoader }) => toggleLoader,
    searchHistory: ({ searchHistory }) => searchHistory,
    weatherForecast: ({ weatherForecast }) => weatherForecast,
    errorMsg: ({ errorMsg }) => errorMsg,
  },
  mutations: {
    [CHANGE_POST](state, userLoc) {
      state.userPostCode = userLoc.components.postcode;
    },
    [CHANGE_WEATHER](state, weatherInfo) {
      state.weatherInfo = weatherInfo;
      console.log(weatherInfo);
    },
    [TOGGLE_LOADER](state, bool) {
      state.toggleLoader = bool;
    },
    [ADD_SEARCH_HISTORY](state, weatherObj) {
      if (state.weatherInfo.id !== weatherObj.id) {
        Vue.set(state.searchHistory, state.searchHistory.length, weatherObj);
      }
    },
    [CITY_FORECAST](state, weatherForecast) {
      state.weatherForecast = weatherForecast.list;
    },
    [GET_ERROR](state, errorMsg) {
      state.errorMsg = errorMsg;
      setTimeout(() => {
        state.errorMsg = null;
      }, 3000);
    },
  },
  actions: {
    async getUserLocation({ commit, dispatch }, position) {
      try {
        const { latitude, longitude } = position.coords;
        const request = axios.get(
          `${process.env.VUE_APP_LOC_API_URL}?q=${latitude}+${longitude}&key=${process.env.VUE_APP_LOC_API_KEY}`
        );
        const response = await Promise.resolve(request);
        commit(CHANGE_POST, response.data.results[0]);
      } catch (err) {
        console.log(err);
      } finally {
        dispatch("toggleLoaderInstace", false);
      }
    },
    async getLocationWeather({ commit, dispatch }, countryCode) {
      try {
        dispatch("toggleLoaderInstace", true);
        const request = axios.get(
          `${process.env.VUE_APP_WTHR_API_URL}/weather?q=${countryCode}&appid=${process.env.VUE_APP_WTHR_API_KEY}`
        );
        const response = await Promise.resolve(request);
        const forecastReq = axios.get(
          `${process.env.VUE_APP_WTHR_API_URL}/forecast?q=${countryCode}&appid=${process.env.VUE_APP_WTHR_API_KEY}`
        );
        const forecastRes = await Promise.resolve(forecastReq);
        commit(CITY_FORECAST, forecastRes.data);
        commit(ADD_SEARCH_HISTORY, response.data);
        commit(CHANGE_WEATHER, response.data);
      } catch (err) {
        commit(GET_ERROR, err.response.data.message);
      } finally {
        dispatch("toggleLoaderInstace", false);
      }
    },
    toggleLoaderInstace({ commit }, bool) {
      commit(TOGGLE_LOADER, bool);
    },
  },
};

export default weather;
