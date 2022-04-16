<template>
  <div class="page">
    <div class="sort">
      <label for="search" class="sort__label"
        >Сортировать по логину<input
          @input="() => setUrlValue('login', 'searchQuery')"
          class="sort__input"
          v-model="searchQuery"
          type="text"
          placeholder="найти логин"
          name="search"
      /></label>
      <label for="status" class="sort__label"
        >Сортировать по статусу<input
          @input="() => setUrlValue('status', 'searchStatus')"
          class="sort__input"
          v-model="searchStatus"
          type="text"
          name="status"
          placeholder="найти статус"
      /></label>
    </div>
    <label class="sort__num" for="num">
      Отфильтровать по количеству заказов от<input
        @input="() => setUrlValue('firstRange', 'firstRange')"
        class="sort__input-number"
        v-model="firstRange"
        type="number"
        min="0"
        name="num"
      />
      до
      <input
        @input="() => setUrlValue('lastRange', 'lastRange')"
        v-model="lastRange"
        class="sort__input-number"
        type="number"
        max="325"
        name="num"
      />
    </label>

    <table>
      <thead>
        <tr>
          <th
            @click="() => setSortedList('id')"
            v-on:click="() => setSortDirection('directionId', 'id')"
          >
            Место {{ setFingerVision("id") }}
          </th>
          <th
             @click="() => setSortedList('login')" v-on:click="() => setSortDirection('directionLogin', 'login')"
          >
            Логин{{ setFingerVision("login") }}
          </th>
          <th
            @click="() => setSortedList('order')"
            v-on:click="() => setSortDirection('directionOrder', 'order')"
          >
            Подтвержденные заказы {{ setFingerVision("order") }}
          </th>
          <th
            @click="() => setSortedList('status')"
            v-on:click="() => setSortDirection('directionStatus', 'status')"
          >
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      searchStatus: "",
      firstRange: "0",
      lastRange: "312",
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
      this.sortDirection[param] = !this.sortDirection[param];
      this.setSorted(param);
    },
    setSorted(param) {
      if (this.sortDirection[param]) {
        this.data.sort((a, b) => (a[param] > b[param] ? -1 : 1));
      } else {
        this.data.sort((a, b) => (b[param] > a[param] ? -1 : 1));
      }
    },
    setFingerVision(param) {
      return this.sortDirection[param] ? "☝🏻" : "👇";
    },
    setUrlValue(key, param) {
      const data = Object.assign({}, this.$route.query);
      data[key] = this[param];
      this.$router.push({ query: data });
    },
    setSortDirection(key, param) {
      const data = Object.assign({}, this.$route.query);
      data[key] = this.sortDirection[param];
      this.$router.push({ query: data });
    },
  },
  created() {
    this.searchQuery = this.$route.query.login || "";
    this.searchStatus = this.$route.query.status || "";
    this.firstRange = this.$route.query.firstRange || "0";
    this.lastRange = this.$route.query.lastRange || "312";
    this.sortDirection = {
      login: JSON.parse(this.$route.query.directionLogin || "false"),
      id: JSON.parse(this.$route.query.directionId || "false"),
      order: JSON.parse(this.$route.query.directionOrder || "false"),
      status: JSON.parse(this.$route.query.directionStatus || "false"),
    };

    this.$route.query.directionLogin !== undefined && this.setSorted("login");
    this.$route.query.directionId !== undefined && this.setSorted("id");
    this.$route.query.directionOrder !== undefined && this.setSorted("order");
    this.$route.query.directionStatus !== undefined && this.setSorted("status");
  },
};
</script>

<style lang="scss">
.page {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sort {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-row-gap: 4px;
  row-gap: 4px;

  &__label {
    width: 100%;
    font-size: 16px;
    line-height: 13px;
    display: flex;
    font-weight: 500;
    padding-bottom: 8px;
    align-items: center;
  }

  &__input {
    border-radius: 5px;
    outline: none;
    font-family: Inter;
    font-style: normal;
    font-weight: 400;
    font-size: inherit;
    margin-left: 5px;
  }

  &__num {
    width: 100%;
    font-size: 16px;
    line-height: 13px;
    font-weight: 500;
    padding-bottom: 8px;
    align-items: center;
    display: flex;
  }

  &__input-number {
    outline: none;
    width: 40px;
    margin: 3px 5px 5px 5px;
    border-radius: 5px;
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

tr th {
  cursor: pointer;
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
  text-align: center;
}
tr:nth-child(odd) {
  background-color: $var4;
}
</style>
