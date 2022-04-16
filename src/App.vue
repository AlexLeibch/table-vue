<template>
    <router-view />
</template>

<script>
import Table from "@/Views/Table.vue";

export default {
  name: "Table",
  components: {
    Table,
  },
};
</script>

<style lang="scss">
#app {
  max-width: 1024px;
  margin: 0 auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
