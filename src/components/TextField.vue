<template>
  <div class="fieldtext">
    <transition name="fade"><span v-if="isSaved" class="save">Сохранено</span></transition>
    <label class="fieldtext__label" :for="id" >{{ labelTextVal+':' }}</label>
        <input
        :id="id"
        class="text"
        :name="id"
        :value="value"
        @click="onPopupInner"
        @input="onChangeSome"
        @blur="onBlur"
        :type="type"
        >

    <div v-if="tooltip && !error" class="tooltip">{{ tooltip }}</div>
    <div v-if="error" class="error">{{ error }}</div>

    <span class="mark" @click="onPopupInner">
      <span class="mark__icon" ><!-- @click="this.id=='playerrole' ? onPopupInner : ''" -->
        <img v-if="this.id=='playerrole'||this.id=='playerdate'" :src="require(`../assets/icons/arrow_bottom.svg`)" :alt="this.labelTextVal+' игрока'"/>
        <img v-else :src="require(`../assets/icons/input_text.svg`)" :alt="this.labelTextVal+' игрока'"/>
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
    tooltip: String,
    error: String,
    value: String,
    alt: String,
    isSaved: Boolean
  },
  data() {
    return {
      valueComponent: this.value,
      errortxt: {
        username: "",
        email: ""
      },
      //error: this.error
      
    };
  },
  watch: {
    isSaved: function (val) {
      this.$emit('removeSaved', this.isSaved)
    },
  },
  methods: {
    onBlur(){
      //event.preventDefault();
      //const errors = {};

      // if (!validateName(this.username)) {
      //   errors.username = "Must be 3 characters or more, only letters";
      // }
      // if (!validateEmail(this.email)) {
      //   errors.email = "Неверный формат. Пример: example@gmail.com";
      // }
      // if (!validatePassword(this.password)) {
      //   errors.password = "Неверный формат. Пример: testTest21!";
      // }

      // if (!this.agreeTerms) {
      //   errors.agreeTerms = "You should agree";
      // }

      // if (Object.keys(errors).length > 0) {
      //   this.errors = errors;
      // } else {
      //   this.errors = {};
      //   console.log(
      //     "submit",
      //     this.username,
      //     this.email,
      //     this.password,
      //     this.agreeTerms
      //   );
      // }
      /********************/
     // if(this.id=='playername'||this.id=='playermail'){
      //  if(this.value.length==0)
      //    this.error=true;
      //}
      if (!this.valueComponent.length){ 
        //this.error=true;
        //this.$emit('onError', '*Обязательное поле для заполнения')
        //this.errors.name = '*Обязательное поле для заполнения';
        return; 
      }
      console.log(this.valueComponent.length)
      var obj;
      switch(this.id){
        case('playername'): obj = {name: this.valueComponent}; break;
        case('playermail'): obj = {email: this.valueComponent}; break;
        case('playerphone'): obj = {phone: this.valueComponent}; break;
        case('playercity'): obj = {city: this.valueComponent}; break;
      }
      this.$emit('onBlur', obj)
    },
    onChangeSome() {
      this.valueComponent = event.target.value;

      this.$emit('onChangeInParent', this.valueComponent, this.id);
    },
    onSearch() {
      console.log("search");
    },
    onPopupInner() {
      console.log('onPopupInner');
      console.dir(event.target);
      if(event.target.id=='playerrole'||event.target.alt=='Позиция игрока'){
        console.log(event.target.alt);
        //this.$emit('onPopup', event.target);
        this.$emit('onPopup', event.target);
      }
    },
    onEdit() {
      if(this.id!=='playerrole') {return;}

      console.log("click->onEdit");
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
        &::placeholder {
            color: #24282a;
            font-size: $fs_sm;
            position: relative;
            left: 0px;
            top: -1px; // WHY?!?!
        }
    }
}
::-webkit-calendar-picker-indicator {
  color: transparent;
  opacity: 0;
  background: none;
  background-size: contain;
  width: 50px;
  position: absolute;
  right: 0;
  z-index: 2;
}
input.email {
  background-image: url("../../src/assets/icons/icon_email.svg");
  background-repeat: no-repeat;
  background-position: 20px center;
}

.error {
  color: $errorColor;
  font-size: 12px;
  //text-align: left;
  padding-top: 3px;
  position: absolute;
  padding-left: 0;
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