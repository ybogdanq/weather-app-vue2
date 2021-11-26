<template>
  <div @click.prevent="someMethod(shItem.name)" class="search-history-item">
    <h4 class="city-name">{{ getCityName }}</h4>
    <ul class="sh-item-list">
      <li>
        {{ shItem.weather[0].main }}
      </li>
      <li>max. {{ getCelsius(shItem.main.temp_max) }}</li>
      <li>min. {{ getCelsius(shItem.main.temp_min) }}</li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SearchHistoryItem",
  props: {
    shItem: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions("weather", ["getLocationWeather"]),
    getCelsius(degree) {
      return (degree - 273.15).toFixed(1) + "°C";
    },
    someMethod(cityName) {
      if (this.shItem.id !== this.weatherInfo.id) {
        this.getLocationWeather(cityName);
      }
    },
  },
  computed: {
    ...mapGetters("weather", ["weatherInfo"]),
    getCityName() {
      return this.shItem ? this.shItem.name.slice(0, 3).toUpperCase() : "City";
    },
  },
};
</script>

<style scoped>
.search-history-item {
  display: inline-block;
  border-radius: 15px;
  padding: 12px 20px;
  margin: 5px;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  text-align: center;
  color: #495057;
  max-width: 120px;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
}
.search-history-item:hover {
  background-color: rgb(248, 248, 248);
}
.city-name {
  text-transform: uppercase;
  font-size: 20px;
}
.sh-item-list li {
  margin: 0 auto;
  list-style: none;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 12px;
  max-width: 100px;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.sh-item-list li + li {
  margin-top: 3px;
}
@media screen and (max-width: 768px) {
  .city-name {
    font-size: 17px;
  }
  .sh-item-list li {
    font-size: 11px;
  }
  .search-history-item {
    padding: 10px 15px;
    max-width: 120px;
  }
}
@media screen and (max-width: 575px) {
  .city-name {
    font-size: 15px;
  }
  .sh-item-list li {
    font-size: 10px;
  }
  .search-history-item {
    padding: 10px 13px;
    max-width: 100px;
  }
}
</style>
