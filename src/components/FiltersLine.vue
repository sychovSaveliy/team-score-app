<template>
  <div class="filtersLine">
    <span class="filtersLine__text">{{ filter }}</span>
    <span class="filtersLine__icon" @click="onFilterWrapper"><img :src="require(`../assets/icons/filters.svg`)" alt/></span>
  </div>
</template>

<script>
export default {
  name: "FiltersLine",
  components: {
  },
  props: {
    filter: String,
    onFilter: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      filters: {
        filtersAllTeams: [
          {
            name: "future",
            title: "Будущие"
          },
          {
            name: "finished",
            title: "Прошлые"
          },
          {
            name: "all",
            title: "Все"
          }
        ],
        filtersMyTeams: [
          {
            name: "future",
            title: "Будущие",
            checked: true
          },
          {
            name: "finished",
            title: "Прошлые",
            checked: true
          },
          {
            name: "all",
            title: "Все",
            checked: false
          },
          {
            name: "future",
            title: "Будущие",
            checked: true
          },
          {
            name: "finished",
            title: "Прошлые",
            checked: true
          },
        ],
        filtersByRole: [
          {
            name: "role01",
            title: "Вратарь"
          },
          {
            name: "role02",
            title: "Защитник"
          },
          {
            name: "role03",
            title: "Полузащитник"
          },
          {
            name: "role04",
            title: "Нападающий"
          }
        ],
      },
    };
  },
  methods: {
    onFilter(active) {
     this.$emit("onFilter", active);
    }
  }
};
</script>

<style lang="scss">

  .filtersLine {
    right: 20px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    justify-content: flex-end;
    display: flex;
    align-items: center;
    height: 100%;
    &__text {
      font-size: 14px;
      color: $color_lightGrey;
      margin-right: 17px;
    }
    &__icon {
      cursor: pointer;
      img {
        width: 18px;
      }
    }
  }
</style>