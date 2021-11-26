<template>
  <div class="city-weather-info service-item">
    <div class="container">
      <h4 class="service-item-title">City weather</h4>
      <div class="city-weather-info-wrapper service-item-wrapper">
        <div class="city-info-leftside">
          <img :src="getIcon" alt="" class="weather-icon" />
          <h3 class="weather-city-name">{{ weatherInfo.name }}</h3>
          <ul class="weather-temperature-list">
            <li>{{ weatherInfo.weather[0].main }}</li>
            <li>Temperature now: {{ getCelsius(weatherInfo.main, "temp") }}</li>
            <li>min.: {{ getCelsius(weatherInfo.main, "temp_min") }}</li>
            <li>max.: {{ getCelsius(weatherInfo.main, "temp_max") }}</li>
          </ul>
        </div>
        <div class="city-info-rightside">
          <div class="city-info-item">
            <ul class="city-info-item-list">
              <li>Sunrise: {{ getTime(weatherInfo.sys.sunrise) }}am</li>
              <li>Sunset: {{ getTime(weatherInfo.sys.sunset) }}pm</li>
              <li>Visibility: {{ weatherInfo.visibility / 1000 }}km</li>
              <li>Pressure: {{ weatherInfo.main.pressure }}pHa</li>
              <li>Humidity: {{ weatherInfo.main.humidity }}%</li>
              <li>Clouds: {{ weatherInfo.clouds.all }}%</li>
            </ul>
          </div>
          <CityWeatherForecast :weatherForecast="weatherForecast" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CityWeatherForecast from "./CityWeatherForecast.vue";
import { mapGetters } from "vuex";

export default {
  name: "CityWeatherInfo",
  components: {
    CityWeatherForecast,
  },
  computed: {
    ...mapGetters("weather", ["weatherInfo", "weatherForecast"]),
    getIcon() {
      return this.hasOwn(this.weatherInfo)
        ? `https://openweathermap.org/img/w/${this.weatherInfo.weather[0].icon}.png`
        : "";
    },
  },
  methods: {
    getCelsius(mainObj, type) {
      return mainObj ? (mainObj[type] - 273.15).toFixed(1) + "°C" : "°C";
    },
    hasOwn(obj) {
      const hasOwn = Object.keys(obj).length !== 0;
      return hasOwn;
    },
    getTime(dt) {
      const date = new Date(dt * 1000);
      const hours = date.getHours();
      const minutes = "0" + date.getMinutes();
      var formattedTime = hours + ":" + minutes.substr(-2);
      return formattedTime;
    },
  },
};
</script>

<style scoped>
.city-info-leftside {
  min-width: fit-content;
  height: 100%;
  padding: 0px 30px 0px 10px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  color: #495057;
  border-right: 1px solid #eee;
}
.city-info-rightside {
  overflow-x: hidden;
}
.city-info-item {
  font-weight: 500;
  margin-left: 20px;
  margin-bottom: 20px;
}
.city-info-item + .city-info-item {
  margin-left: 40px;
}
.city-info-title {
  font-size: 17px;
}
.city-info-item-list {
  list-style: none;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}
.weather-icon {
  width: 70px;
  max-height: 100px;
}
.weather-city-name {
  font-size: 22px;
  margin-bottom: 10px;
}
.weather-temperature-list li {
  list-style: none;
  font-size: 17px;
  font-weight: 500;
  padding: 4px 0px;
}

.city-weather-info-wrapper {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(200px, 35%) 65%;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .city-weather-info-wrapper {
    grid-template-columns: 1fr;
  }
  .city-info-item-list {
    text-align: center;
  }
  .city-info-item {
    margin: 0;
    padding: 20px 0px;
  }
  .city-info-leftside {
    padding: 10px 0px;
    border-right: none;
    border-bottom: 1px solid #eee;
  }
}
@media screen and (max-width: 550px) {
  .city-weather-info-wrapper {
    grid-template-columns: 1fr;
  }
  .city-info-item-list {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 7px;
    font-size: 14px;
  }
  .city-info-item {
    margin: 0;
    padding: 20px 0px;
  }
  .weather-city-name {
    font-size: 19px;
    margin-bottom: 5px;
  }
  .weather-temperature-list li {
    list-style: none;
    font-size: 15px;
    font-weight: 500;
    padding: 2px 0px;
  }
}
</style>
