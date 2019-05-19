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
      />
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
}
</script>

<style lang="scss" scoped>
.check{
  text-align: left;
  input{
    margin-right: 10px;
    height: 20px;
    width: 20px;
  }
  label{
    font-size: 14px;
  }
}
.error{
  color: $errorColor;
  font-size: 12px;
  text-align: left;
  padding-left: 10px;
  padding-top: 5px;
}
</style>
