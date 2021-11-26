<template>
  <div id="app">
    <Loader v-if="onToggleLoader" />
    <Header @toggleBM="onToggleBM" />
    <main>
      <SearchBar />
      <CityWeatherInfo v-if="isObjExists(weatherInfo)" />
      <SearchHistory />
    </main>
    <Footer />
    <SocialsBurger :isActive="toggleSocials" />
    <div v-if="errorMsg" class="error-message">{{ errorMsg }}</div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Loader from "./components/Loader.vue";
import SearchHistory from "./components/SearchHistory";
import CityWeatherInfo from "./components/CityWeatherInfo";
import SearchBar from "./components/SearchBar.vue";
import SocialsBurger from "./components/SocialsBurger.vue";

import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "App",
  components: {
    Header,
    Loader,
    Footer,
    SearchBar,
    SearchHistory,
    CityWeatherInfo,
    SocialsBurger,
  },
  data: () => ({
    isSocialsActive: false,
  }),
  mounted() {
    this.toggleLoaderInstace(true);
    window.navigator.geolocation.getCurrentPosition(
      this.getUserLocation,
      this.getLocationError
    );
  },
  computed: {
    ...mapGetters("weather", [
      "userPostCode",
      "toggleLoader",
      "weatherInfo",
      "errorMsg",
    ]),
    onToggleLoader() {
      return this.toggleLoader ? true : false;
    },
    toggleSocials() {
      return this.isSocialsActive ? "active" : "";
    },
  },
  methods: {
    ...mapMutations("weather", ["GET_ERROR"]),
    ...mapActions("weather", [
      "getUserLocation",
      "getLocationWeather",
      "toggleLoaderInstace",
    ]),
    onToggleBM(bool) {
      this.isSocialsActive = bool;
    },
    isObjExists(object) {
      return Object.keys(object).length !== 0 ? true : false;
    },
    getLocationError(errorObject) {
      this.GET_ERROR(errorObject.message);
    },
  },
  watch: {
    userPostCode: function (code) {
      this.getLocationWeather(code);
    },
  },
};
</script>

<style>
*,
*::after,
*::before {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: inherit;
  background-color: rgb(248, 248, 248);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
main {
  flex: 1 0 auto;
}
button {
  display: block;
  cursor: pointer;
  border: 1px solid #fff;
}
input:focus,
select:focus {
  outline: none;
}
.container {
  max-width: 940px;
  margin: 0 auto;
  padding: 0px 20px;
}
.error-message {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1000;
  padding: 10px 15px;
  border-radius: 15px;
  background-color: #fff;
  border: 1px solid rgb(255, 0, 0);
  box-shadow: 0px 0px 6px 0px rgba(255, 0, 0, 0.17) !important;
  max-width: 320px;
}
.service-item-wrapper {
  border-radius: 15px;
  padding: 20px 20px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15) !important;
  background-color: #fff;
}
.service-item + .service-item {
  margin-top: 20px;
}
.service-item-title {
  color: #495057;
  margin: 0px 10px 5px;
  font-size: 15px;
}

@media screen and (max-width: 768px) {
  .service-item-wrapper {
    padding: 15px;
  }
}
@media screen and (max-width: 425px) {
  .service-item-wrapper {
    padding: 13px;
  }
}
</style>
