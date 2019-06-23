<template>
  <div class="profile">
    <Field
      id="profile"
      :labelText="labelTextVal"
      :type="typeVal"
      className='profile'
      placeholder=""
      name="profile"
      :value="value"
      @input="onChange"
    />
    
    <span class="mark">
      <span class="mark__text">{{ /*labelTextVal*/ }}</span>
      <span class="mark__icon" @click="onFilter">
        <img v-if="typeVal=='email' || typeVal=='text'" :src="require(`../assets/icons/input_text.svg`)" alt/>
        <img v-if="typeVal=='date'" :src="require(`../assets/icons/arrow_bottom.svg`)" alt/>
      </span>
    </span>
    
  </div>
</template> 

<script>
import Field from "@common/Field";
export default {
  name: "MyField",
  components: {
    Field
  },
  props: {
    filter: String,
    labelTextVal: String,
    localType: String,
    typeVal: String
  },
  data() {
    return {
      value: "",
      localType: localType,
      localType: "email"
    };
  },
  methods: {
    onChange() {
      console.log(event.target.value);
    },
    onSearch() {
      console.log("search");
    },
    onFilter() {
      console.log("filters");
    }
  }
};
</script>

<style lang="scss">
  .profile {
    margin-bottom: 22px;
    width: 100%;
    position: relative;
    .field {
      margin-bottom: 0;
      .input {
        padding-left: 50px;
      }
    }
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
    right: 20px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    justify-content: flex-end;
    display: flex;
    align-items: center;
    height: 100%;
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
.field.profile .input {
  border-bottom: 7px solid #ededed;
  border-radius: 0;
  border-top: 0 none rgb(36, 41, 46);
  border-left: 0 none rgb(36, 41, 46);
  border-right: 0 none rgb(36, 41, 46);
  border-width: 1px;
  background: #ffffff;
  padding-left: 0;
  font-size: 16px;
  margin-left: 15px;
}
.field.profile label {
  display:block;
  left: 14px;
  font-weight:normal;
}
.profile__icon img {
    width: 18px;
}
</style>
