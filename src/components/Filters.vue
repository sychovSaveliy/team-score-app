<template>
	<div class="filters__popup">
    <div class="popup__title">Фильтры:</div>
    <div class="filters">
      <div class="filters__item" v-for="item in filters">
        <Check
          :id="item.name"
          class="check"
          type="checkbox"
          :labelText="item.title"
          :name="item.name"
          :checked="item.checked"
          @change="onCheck"
        />      
      </div>
    </div>
    <TButton view="fluid" @click="onApplyFilters">Найти</TButton>
    </div>
</template>
<script>
import Check from "@common/Check";
import TButton from "@common/TButton";
export default {
  name: "SignIn",
  components: {
    Check,
    TButton
  },
  props: {
    filters: Array,
  },
  data() {
    return {
    };
  },
  methods: {
    onCheck(name, checked) {
      this[name] = checked;
    },
    onApplyFilters() {},
  }  
}  
</script>
<style lang="scss">
  .filters {
    padding: 10px 0 53px;
    &__item {
      padding: 25px 0;
      border-bottom: 1px solid lightgrey;
    }
  }
</style>