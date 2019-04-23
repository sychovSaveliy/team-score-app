<template>
  <div>
    <button :class="['btn', view]">{{text}}</button>
  </div>
</template>

<script>
export default {
  name: "TButton",
  data () {
    return {
    }
  },
  props: {
      view: String,
      text: String,
      imgURL: String
      // onClick: '',
      // buttonText: '',
  },
};
</script>

<style lang="scss" scoped>
.btn {
  background-color: $tone-green;
  border-radius: 30px;
  padding: 12px;
  height: 50px;
  color: $color_white;
  line-height: 24px;
  font-weight: bold;
  letter-spacing: 0.4px;
  margin: 30px 12px 0;
  width: 400px;
    
    &.active{

    }

    &.disable{

    }



}

</style>
