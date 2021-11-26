<template>
  <div class="search-history service-item">
    <div class="container">
      <h4 class="service-item-title">Search history</h4>
      <div class="search-history-wrapper service-item-wrapper">
        <VueSlickCarousel
          v-if="searchHistory.length"
          :arrows="false"
          :dots="false"
          :variableWidth="true"
          :slidesToScroll="2"
          :infinite="false"
          :focusOnSelect="true"
          :key="carouselKey"
        >
          <SearchHistoryItem
            v-for="shItem in searchHistory"
            :key="shItem.dt + Math.random() * 100"
            :shItem="shItem"
          />
        </VueSlickCarousel>
      </div>
    </div>
  </div>
</template>

<script>
import SearchHistoryItem from "./SearchHistoryItem.vue";
import VueSlickCarousel from "../plugins/slick/index";
import { mapGetters } from "vuex";
export default {
  name: "SearchHistory",
  components: {
    SearchHistoryItem,
    VueSlickCarousel,
  },
  data: () => ({
    carouselKey: 1,
  }),
  watch: {
    searchHistory: {
      handler: function () {
        this.carouselKey++;
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters("weather", ["searchHistory"]),
  },
};
</script>

<style scoped>
.search-history-wrapper >>> .slick-slide {
  margin: 0 5px;
}
/* the parent */
.search-history-wrapper >>> .slick-list {
  margin: 0 -5px;
}
</style>
