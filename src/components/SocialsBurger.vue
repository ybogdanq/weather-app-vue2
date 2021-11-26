<template>
  <div class="socials-burger" :class="isActive">
    <div class="container">
      <ul class="socials-list">
        <li class="socials-list-item">
          <a href="https://www.instagram.com/y.bogdank/">Instagram</a>
        </li>
        <li class="socials-list-item">
          <a href="https://github.com/ybogdanq">Github</a>
        </li>
        <li class="socials-list-item">
          <a href="https://ybogdanq.github.io/profile/">Portfolio</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SocialsBurger",
  props: {
    isActive: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.socials-burger {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2);
  padding: 15px 0px;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}
.socials-burger.active {
  transform: translateY(0%);
}
.socials-list {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  list-style: none;
}
.socials-list-item {
  margin: 7px 0px;
}
.socials-list-item a {
  text-decoration: none;
  font-size: 14px;
  color: #000;
}
</style>
