<template>
  <div class="fieldtext">
      
    <label class="fieldtext__label" :for="id">{{ labelTextVal }}</label>
        <input
        :id="id"
        class="text"
        :name="id"
        :value="value"
        @input="onChange"
        >

    <div v-if="tooltip && !error" class="tooltip">{{ tooltip }}</div>
    <div v-if="error" class="error">{{ error }}</div>

    <span class="mark">
      <span class="mark__icon" @click="onFilter">
        <img :src="require(`../assets/icons/input_text.svg`)" alt/>
      </span>
    </span>
    
  </div>
</template> 

<script>
export default {
  name: "TextField",
  props: {
    labelTextVal: String,
    name: String,
    id: String,
    type: String,
    name: String,
    tooltip: String,
    error: String,
    value: String
  },
  data() {
    return {
    };
  },
  methods: {
    onChange() {
      console.log(event.target.value);
      return value = event.target.value
    },
    onSearch() {
      console.log("search");
    },
    onFilter() {
      console.log("filters");
    },
    
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
    }
  }
};
</script>

<style lang="scss" scoped>

.fieldtext {
    width: 100%;
    position: relative;
    margin: 0 0 30px;
    &__label {
        display: block;
        text-align: left;
        background-color: white;
        font-size: 14px;
        color: #a9a5a5;
    }
    input {
        border-bottom: $border-default;
        border-bottom: 7px solid #ededed;
        border-top: 0 none rgb(36, 41, 46);
        border-left: 0 none rgb(36, 41, 46);
        border-right: 0 none rgb(36, 41, 46);
        border-width: 1px;
        font-size: $fs_mm;
        height: 50px;
        outline: none;
        padding-right: 40px;
        width: 100%;
        &:focus {
        }
        &::placeholder {
            color: #24282a;
            font-size: $fs_sm;
            position: relative;
            left: 0px;
            top: -1px; // WHY?!?!
        }
    }
}

input.email {
  background-image: url("../../src/assets/icons/icon_email.svg");
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


.profile__icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 20px;
    width: 18px;
    cursor: pointer;
    img {
      width: 18px;
    }
}
.mark {
    right: 26px;
    position: absolute;
    bottom: 0;
    justify-content: flex-end;
    display: flex;
    align-items: center;
    height: 65%;
    &__text {
      font-size: 14px;
      color: $color_lightGrey;
      margin-right: 17px;
    }
    &__icon {
      cursor: pointer;
      img {
        width: 18px;
      }
    }
}

.profile__icon img {
    width: 18px;
}
.profile__radio .field {
    display: flex;
    align-items: center;
}
input[type='radio'] {
    width: 20px;
    display: inline-block;
}
input[type='radio'] + label {
    position: relative;
    text-align: left;
    height: 0px;
}
input[type='radio']:after {
    content: '';
    width: 100vw;
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    display: block;
    z-index: 2;
    border-bottom: $border-default;
}
</style>