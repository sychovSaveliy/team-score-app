<template>
  <main class="main">
    <div class="content">
      <slot></slot>
    </div>
    <slot name="popup"/>
  </main>
</template>

<script>
export default {
  name: "LayoutWithoutMenu",
  components: {
  }
};
</script>

<style lang="scss">
.main {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  //height: 100%;
  background-color: #fcfcfc;
  background-image: url(../assets/images/main-bg.png);
  background-repeat: repeat-y;
  background-position: left 200px;
  background-size: 100% auto;
  min-height: 100%;
}
.content {
  flex-grow: 1;
  width: 100%;
  &:after {
    content: '';
    position: absolute;
    bottom: 10px;
    left: 50%;
    height: 5px;
    width: 134px;
    border-radius: 5px;
    transform: translateX(-50%);
    background-color: $nav;
  }
}
.section {
  padding: 10px;
}
</style>