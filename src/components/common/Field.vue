<template>
  <div class="field" :class="className">
    <input
      :id="id"
      :type="localType"
      class="input"
      :placeholder="placeholder"
      :name="name"
      :value="value"
      @input="update($event.target.name, $event.target.value)"
    >
    <span v-if="localType == 'password'" class="eye" @click="onEyeClick"></span>
    <label :for="id">{{ labelText }}</label>
    <div v-if="tooltip && !error" class="tooltip">{{ tooltip }}</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  name: "Field",
  props: {
    id: String,
    labelText: String,
    type: String,
    className: String,
    placeholder: String,
    name: String,
    value: String,
    tooltip: String,
    error: String
  },
  data() {
    return {
      localType: this.type
    };
  },
  methods: {
    update(name, value) {
      this.$emit("input", name, value);
    },
    onEyeClick() {
      if(this.localType != 'password'){
        return;
      }
      const oldType = this.localType;

      this.localType = 'text';
      setTimeout(this.timerForPassword, 1000, oldType);
    },
    timerForPassword(type) {
      this.localType = type;
    },
  }
};
</script>

<style lang="scss">
.field {
  width: 100%;
  position: relative;
  margin: 0 0 30px;
  label {
    display: none;
    position: absolute;
    top: -10px;
    left: 30px;
    background-color: white;
    font-size: 14px;
    color: #a9a5a5;
  }
  input:focus {
    border: 1px solid green;
    & ~ label {
      display: block;
    }
  }
}
.input {
  border: $border-default;
  box-sizing: border-box;
  border-radius: 45px;
  height: 50px;

  outline: none;
  padding-left: 40px;
  padding-right: 40px;
  width: 100%;

  &:focus {
    border: $border-active;
    transition: border 0.1s;
  }

  &::placeholder {
    color: #24282a;
    font-size: $fs_sm;
    position: relative;
    left: 0px;
    top: -1px; // WHY?!?!
  }
}

.input.email {
  background-image: url("../../../src/assets/icons/icon_email.svg");
  background-repeat: no-repeat;
  background-position: 20px center;
}

.input.password {
  background-image: url("../../../src/assets/icons/icon_lock.svg");
  background-repeat: no-repeat;
  background-position: 20px center;
}
.error {
  color: $errorColor;
  font-size: 12px;
  text-align: left;
  padding-left: 10px;
  padding-top: 5px;
}
.tooltip {
  font-size: 12px;
  text-align: left;
  color: $color_lightGrey;
  padding-left: 10px;
  padding-top: 5px;
}
.password {
  position: relative;
  z-index: 1;
}
.eye {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
  height: 50px;
  width: 60px;
  cursor: pointer;
  background-image: url("../../../src/assets/icons/icon_eye.svg");
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
