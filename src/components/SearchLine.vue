<template>
  <div class="search">
    <Field
      id="search"
      labelText="Search"
      type="text"
      className='search'
      placeholder=""
      name="search"
      :value="value"
      @input="onChange"
    />
    <span class="search__icon" @click="onSearchWrapper"><img :src="require(`../assets/icons/search_dark.svg`)" alt/></span>  
  </div>
</template>

<script>
import Field from "@common/Field";
export default {
  name: "Search",
  components: {
    Field
  },
  props: {
    searchQuery: String,
    onSearch: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      value: "",
      errors: {
        search: ""
      },
      tooltips: {
        search: ""
      },
    };
  },
  methods: {
    onChange() {
      console.log(event.target.value);
    },
    onSearchWrapper() {
      this.onSearch()
    }
  }
};
</script>

<style lang="scss">
  .search {
    margin-bottom: 22px;
    width: 100%;
    position: relative;
    .field {
      margin-bottom: 0;
      .input {
        padding-left: 50px;
      }
    }
  }
  .search__icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 20px;
    width: 18px;
    cursor: pointer;
    img {
      width: 18px;
    }
  }
  .filter {
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
