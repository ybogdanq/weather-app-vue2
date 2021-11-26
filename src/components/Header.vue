<template>
  <header class="header">
    <a href="#"><img src="../assets/logo.png" class="header-logo" alt="" /></a>
    <div class="burger-menu" @click.prevent="onBurgerClick">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data: () => ({
    isActiveBM: false,
  }),
  methods: {
    onBurgerClick() {
      const bool = this.isActiveBM ? false : true;
      this.$emit("toggleBM", bool);
      this.isActiveBM = bool;
    },
  },
};
</script>

<style scoped>
.header {
  padding: 10px 20px;
  background-color: #fff;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}
.header-logo {
  display: block;
  width: 100%;
  max-width: 150px;
  margin: 0 auto;
}
.burger-menu {
  display: none;
  cursor: pointer;
}
.burger-menu span {
  display: block;
  width: 20px;
  height: 3px;
  margin: 3px 0px;
  background-color: #000;
}
@media screen and (max-width: 768px) {
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .burger-menu {
    display: block;
  }
}
@media screen and (max-width: 425px) {
  .header {
    padding: 10px;
    margin-bottom: 15px;
  }
  .header-logo {
    max-width: 130px;
  }
}
</style>
