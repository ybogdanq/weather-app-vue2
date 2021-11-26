<template>
  <div class="searchbar-wrapper service-item">
    <div class="container">
      <input
        class="searchbar service-item-wrapper"
        placeholder="City name / POST code"
        v-model="searchbar"
        @keyup="onSearch(getLocationWeather, searchbar)"
      />
    </div>
  </div>
</template>

<script>
import { debounce } from "../plugins/helpers";
import { mapActions } from "vuex";
export default {
  name: "SearchBar",
  data: () => ({
    searchbar: "",
  }),
  methods: {
    ...mapActions("weather", ["getLocationWeather"]),
    onSearch: debounce((getWeather, value) => {
      if (value.length !== 0) {
        getWeather(value);
      }
    }, 1000),
  },
};
</script>

<style scoped>
.searchbar {
  display: block;
  border: none;
  width: 60%;
  margin: 0 auto;
  padding: 15px 20px;
  outline: none;
}
@media screen and (max-width: 575px) {
  .searchbar {
    width: 80%;
    padding: 15px 20px;
    font-size: 13px;
  }
}
@media screen and (max-width: 450px) {
  .searchbar {
    padding: 12px 15px;
    font-size: 12px;
  }
}
</style>
