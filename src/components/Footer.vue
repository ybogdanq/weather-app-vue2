<template>
  <footer class="footer">
    <div class="container">
      <h4>Powered by</h4>
      <div class="powered-api-logo">
        <img src="../assets/openWeather-logo.jpg" alt="" />
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  flex: 0 0 auto;
  padding: 20px 20px 20px;
  background-color: #fff;
  box-shadow: 5px 0px 5px 0px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  color: rgb(83, 82, 83);
  font-weight: 700;
  margin-top: 20px;
}
.footer .container {
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.powered-api-logo img {
  position: relative;
  z-index: 0;
  margin-left: 10px;
  transform: translateY(3px);
  display: inline-block;
  max-width: 90px;
}
@media screen and (max-width: 768) {
  .footer {
    padding: 15px 15px;
    font-size: 15px;
  }
  .powered-api-logo img {
    max-width: 80px;
    transform: translateY(3px);
  }
}
@media screen and (max-width: 425px) {
  .footer {
    padding: 15px 15px;
    font-size: 12px;
  }
  .powered-api-logo img {
    max-width: 80px;
    transform: translateY(3px);
  }
}
</style>
