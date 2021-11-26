<template>
  <VueSlickCarousel
    :arrows="false"
    :dots="false"
    :variableWidth="true"
    :slidesToScroll="4"
    :infinite="false"
    :focusOnSelect="true"
  >
    <ForecastSliderItem
      v-for="wfItem in weatherForecast"
      :key="wfItem.id"
      :wfItem="wfItem"
    />
  </VueSlickCarousel>
</template>

<script>
import VueSlickCarousel from "../plugins/slick/index";
import ForecastSliderItem from "./ForecastSliderItem.vue";
export default {
  name: "CityWeatherForecast",
  components: {
    VueSlickCarousel,
    ForecastSliderItem,
  },
  props: {
    weatherForecast: {
      type: Array,
      required: true,
    },
  },
  methods: {},
};
</script>

<style scoped>
.city-weather-forecast {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
}
.slider-item {
  /* width: 100px; */
  margin: 0px 20px;
}
</style>
