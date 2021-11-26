<template>
  <div class="weather-forecast-item">
    <p>{{ getDateHours(wfItem.dt) }}</p>
    <img :src="getIcon" alt="" class="weather-icon" />
    <p>{{ getDate(wfItem.dt) }}</p>
    <p>{{ getCelsius(wfItem.main, "temp") }}</p>
  </div>
</template>

<script>
export default {
  name: "ForecastSliderItem",
  props: {
    wfItem: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getIcon() {
      return this.hasOwn(this.wfItem)
        ? `https://openweathermap.org/img/w/${this.wfItem.weather[0].icon}.png`
        : "";
    },
  },
  methods: {
    hasOwn(obj) {
      const hasOwn = Object.keys(obj).length !== 0;
      return hasOwn;
    },
    getCelsius(mainObj, type) {
      return mainObj ? (mainObj[type] - 273.15).toFixed(1) + "°C" : "°C";
    },
    getDate(dt) {
      const date = new Date(dt * 1000);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      return `${day}.${month}`;
    },
    getDateHours(dt) {
      const date = new Date(dt * 1000);
      const hours = date.getHours();
      return String(hours).length === 1 ? "0" + hours : hours;
    },
  },
};
</script>

<style scoped>
.weather-forecast-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  pointer-events: none;
  font-weight: 500;
  text-align: center;
  margin: 0px 30px 0px 0px;
}
.weather-forecast-item p {
  margin: 0 auto;
  width: fit-content;
}
.weather-icon {
  width: 40px;
  max-height: 50px;
}
@media screen and (max-width: 768px) {
  .weather-forecast-item {
    margin: 0px 20px 0px 0px;
  }
  .weather-forecast-item p {
    font-size: 14px;
  }
}
@media screen and (max-width: 550px) {
  .weather-forecast-item p {
    font-size: 13px;
  }
}
</style>
