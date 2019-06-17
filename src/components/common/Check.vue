<template>
  <div class="check">
    <input
      :id="id"
      :type="type"
      :class="className"
      :placeholder="placeholder"
      :name="name"
      :checked="checked"
      @change="updateCheck($event.target.name, $event.target.checked)"
    >
    <label class="check__label" :for="id">{{ labelText }}</label>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: "Field",
  props: {
    id: String,
    labelText: String,
    type: String,
    className: String,
    placeholder: String,
    name: String,
    checked: Boolean,
    error: String
  },
  methods: {
    updateCheck(name, checked) {
      this.$emit("change", name, checked);
    }
  }
};
</script>

<style lang="scss" scoped>
.check {
  text-align: left;
  display: flex;
  margin: 12px 0;
  input {
    margin-right: 10px;
    height: 20px;
    width: 20px;
    display: none;
    &:checked + .check__label:after {
      opacity: 1;
      transform: rotate(45deg);
    }  
  }
  label {
    font-size: 14px;
    position: relative;
    padding-left: 30px;
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 20px;
      width: 20px;
      background-color: $tone-green;
    }
    &:after {
      content: '';
      width: 5px;
      height: 11px;
      border-right: 2px solid #fff;
      border-bottom: 2px solid #fff;
      transform: rotate(20deg);
      opacity: 0;
      position: absolute;
      top: 2px;
      left: 7px;
      transition: .3s;
    }  
  }
}
.error {
  color: $errorColor;
  font-size: 12px;
  text-align: left;
  padding-left: 10px;
  padding-top: 5px;
}
</style>
