<template>
	<div class="filters">
    <div class="filters__title">Фильтры:</div>
    <div class="filters__options">
        <slot></slot>
    </div>
    <TButton view="fluid" :onClick="onFilter">Найти</TButton>
    </div>
</template>
<script>
import TButton from "@common/TButton";
export default {
  name: "Filters",
  components: {
    TButton
  },
  props: {
    onFilter: {
      type: Function
    }
  },
  data() {
    return {
    };
  },
  methods: {
  }  
}  
</script>
<style lang="scss">
.filters{
  display: flex;
  flex-direction: column;
}
</style>