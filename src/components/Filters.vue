<template>
	<div class="filters__popup">
    <div class="popup__title">Фильтры:</div>
    <div class="filters">
        <Radio
          id="filter_by_date"
          labelText="Фильтры по дате"
          name="filter_by_date"
          :options = "filters"
          :selectedFilter="selected"
          @onRadio="onRadio"
        />
        <Radio
          id="filter_by_player"
          labelText="Фильтры по игроку"
          name="filter_by_player"
          :options = "filters"
          :selectedFilter="selected"
          @onRadio="onRadio"
        /> 
    </div>
    <TButton view="fluid" @click="onApplyFilters(this.active)">Найти</TButton>
    </div>
</template>
<script>
import Radio from "@common/Radio";
import TButton from "@common/TButton";
export default {
  name: "Filters",
  components: {
    Radio,
    TButton
  },
  props: {
    filters: Array,
    selected: String
  },
  data() {
    return {
      active: this.selected
    };
  },
  methods: {
    onApplyFilters(active) {
      this.$emit("onFilter", active);
      console.log(active)
    },
    onRadio(name, value) {
      this.active = value;
      console.log(this.active)
    }
  }  
}  
</script>
<style lang="scss">
  .filters {
    padding: 10px 0 53px;
    &__item {
      padding: 25px 0;
      border-bottom: 1px solid $tone-grey;
    }
  }
</style>