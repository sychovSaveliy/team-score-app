<template>
  <div class="tabs">
    <div
      class="tabs__inner"
      v-for="item in list"
      :key="item.title"
      @click="onTabChange(item,list)"
      :class="item.classNames"
      
    >{{ item.title }}</div>
  </div>
</template>

<script>
export default {
  name: "Ttabs",
  props: {
    list: Array,
    
  },
  methods: {
    onTabChange (item, list) {
      // -- LOGIC 
      list.forEach(function(elem){
        for(let key in elem){
          if(key === "classNames"){
            let index = elem[key].indexOf("active");
            elem[key].splice(index,1)
          } 
        }
      });
      item.actionTab(item);
    }
  },
  watch: {

  }
};
</script>

<style lang="scss" scoped>
$color: #2bbb3a;

.tabs {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: 10px 0;
  padding: 0;
  background: white;
  color: $color;
  border: 2px solid $color;
  border-radius: 20px;
  overflow: hidden;
}
.tabs__inner {
  font-size: 16px;
  line-height: 27px;
  position: relative;
  height: 26px;
  flex-grow: 1;
  text-align: center;
  color: $color;
  letter-spacing: 0.4px;
  text-transform: lowercase;
  border-right: 1px solid $color;
}
.tabs__inner:last-child {
  border-right: none;
}
.active {
  color: white;
  background: $color;
}
</style>
