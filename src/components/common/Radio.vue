<template>
	<div class="radio-block" id={id}>
		<div>{{ labelText }}</div>
		<div class='radio' v-for="item in options">
			<input
				:id="item.name"
				type="radio"
				:name="name"
				:value="item.name"
				:checked="item.name === value"
				@change="updateRadio($event.target.name, $event.target.value)"
			/>
			<label :for="item.name">{{ item.title }}</label>
		</div>
	</div>
</template>

<script>
export default {
  name: "Radio",
  props: {
    id: String,
    className: String,
    labelText: String,
    name: String,
    error: String,
    options: Array,
    value: String
  },
  methods: {
    updateRadio(name, value) {
      this.$emit("onRadio", name, value);
    }
  }
};
</script>

<style lang="scss" scoped>
  .radio-block{
    padding: 10px 0 53px;
  }
  .radio {
    text-align: left;
    display: flex;
    margin: 12px 0;
    input {
      margin-right: 10px;
      height: 20px;
      width: 20px;
      display: none;
      &:checked + label:after {
        opacity: 1;
        background-color: $tone-green;
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
        height: 16px;
        width: 16px;
        border-radius: 50%;
        border: 1px solid $tone-green;
      }
      &:after {
        content: '';
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: $tone-grey;
        opacity: 0;
        position: absolute;
        top: 4px;
        left: 4px;
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
  .radio.radio_popup {
    padding: 25px 0;
    border-bottom: 1px solid $tone-grey;
  }
</style>
