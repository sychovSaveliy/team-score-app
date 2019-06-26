<template>
	<div class="form-radio" id={id}>
		<div>{{ labelText }}</div>
		<div v-for="item in options">
			<input
				:id="item.name"
				type="radio"
				class="radio__label"
				:name="name"
				:value="item.name"
				:checked="'item.name === this.selectedFilter'"
				@change="updateRadio($event.target.name, $event.target.value)"
			/>
			<label class="radio__label" :for="item.name">{{ item.title }}</label>
		</div>
	</div>
</template>

<script>
export default {
  name: "Radio",
  props: {
    id: String,
    labelText: String,
    name: String,
    error: String,
    options: Array,
    selectedFilter: String
  },
  methods: {
    updateRadio(name, value) {
      this.$emit("onRadio", name, value);
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
