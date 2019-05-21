<template>
  <div class="tabs">
    <router-link
      class="tabs__inner"
      v-for="item in list"
      :key="item.title"
      @click="onTabChange(item)"
      :class="item.classNames"
      :to="item.to"
    >{{ item.title }}</router-link>
  </div>
</template>

<script>
export default {
  name: "Ttabs",
  props: {
    list: Array
  },
  methods: {
    onTabChange(item) {
      item.action && item.action(item);

      // change tab
      this.list.filter(tab => tab !== item).forEach(tab => {
        tab.classNames = tab.classNames.filter(className => className != 'active')
      })
      item.classNames.indexOf('active') === -1 && item.classNames.push('active');
      console.log(item.to)
    }
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
