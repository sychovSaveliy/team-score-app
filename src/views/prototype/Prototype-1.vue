<template>
  <div class="prototype">
    {{ text }}

    <button class="btn" @click="btnClick">Click</button>
  </div>
</template>

<script>
export default {
  name: "Prototype-1",
  data() {
    return {
      text: "Example text prototype 1"
    };
  },
  methods: {
    btnClick() {
      console.log('click')
    }
  }
};
</script>

<style lang="scss" scoped>
.prototype {
  font-size: 24px;
}

.btn {
  font-size: 24px;
  padding: 5px;
}
</style>
