<template>
  <label for="search"
    >Найти пользователя
    <input
      v-model="searchQuery"
      type="text"
      placeholder="найти логин"
      name="search"
  /></label>
  <label for="status"
    ><input
      v-model="searchStatus"
      type="text"
      name="status"
      placeholder="найти статус"
  /></label>
  <label>
    Отфильтровать по количеству заказов от<input
      v-model="firstRange"
      type="number"
    />
    до
    <input v-model="lastRange" type="number" />
  </label>

  <table border="1px" cellpadding="3px" rules="groups rows" align="center">
    <thead>
      <tr>
        <th @click="() => setSortedList('id')">
          Место {{ setFingerVision("id") }}
        </th>
        <th @click="() => setSortedLogin('login')">
          Логин{{ setFingerVision("login") }}
        </th>
        <th @click="() => setSortedList('order')">
          Подтвержденные заказы {{ setFingerVision("order") }}
        </th>
        <th @click="() => setSortedLogin('status')">
          Статус {{ setFingerVision("status") }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="info in setRangeOrder" :key="info.id">
        <td>{{ info.id }}</td>
        <td @click="login">{{ info.login }}</td>
        <td @click="order">{{ info.order }}</td>
        <td @click="status">{{ info.status }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      searchStatus: "",
      firstRange: "0",
      lastRange: "312",
      sortParam: "",
      sortDirection: {
        login: false,
        id: false,
        order: false,
        status: false,
      },
      data: [
        {
          id: 1,
          login: "smith@gmail.com",
          order: 312,
          status: "Ценитель красоты",
        },
        {
          id: 2,
          login: "lenin@gmail.com",
          order: 120,
          status: "Поставщик аксессуаров",
        },
        {
          id: 3,
          login: "mask@gmail.com",
          order: 98,
          status: "Конкурент минздрава",
        },
        {
          id: 4,
          login: "dog@mail.ru",
          order: 64,
          status: "рыбак",
        },
        {
          id: 5,
          login: "nightmare@mail.ru",
          order: 34,
          status: "охотник",
        },
        {
          id: 6,
          login: "cat@mail.ru",
          order: 1,
          status: "Ценитель красоты",
        },
      ],
    };
  },
  computed: {
    setSearchLogin() {
      // eslint-disable-next-line max-len
      return [...this.data].filter((info) =>
        info.login.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    setSearchStatus() {
      return this.setSearchLogin.filter((info) =>
        info.status.includes(this.searchStatus)
      );
    },
    setRangeOrder() {
      return this.setSearchStatus.filter(
        (info) => this.firstRange <= info.order && info.order <= this.lastRange
      );
    },
  },
  methods: {
    setSortedList(param) {
      if (this.sortDirection[param]) {
        this.data.sort((a, b) => a[param] - b[param]);
      } else {
        this.data.sort((a, b) => b[param] - a[param]);
      }
      this.sortDirection[param] = !this.sortDirection[param];
    },
    setSortedLogin(param) {
      if (this.sortDirection[param]) {
        this.data.sort((a, b) => (a[param] > b[param] ? 1 : -1));
      } else {
        this.data.sort((a, b) => (a[param] < b[param] ? 1 : -1));
      }
      this.sortDirection[param] = !this.sortDirection[param];
    },
    setFingerVision(param) {
      return this.sortDirection[param] ? "☝" : "👇";
    },
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

$var1: #ffffff;
$var2: #706d97;
$var3: #696969;
$var4: #eeeeee;

th {
  text-align: left;
  color: $var1;
  background-color: $var2;
  &:last-child {
    text-align: right;
  }
}
td {
  min-width: 250px;
  color: $var3;
  border-bottom: 1px solid $var4;
  &:first-child {
    width: 150px;
    min-width: 0;
  }
  &:last-child {
    width: 80px;
    min-width: 0;
    text-align: right;
  }
}
th,
td {
  padding: 10px;
  height: 20px;
}
tr:nth-child(odd) {
  background-color: $var4;
}
</style>
