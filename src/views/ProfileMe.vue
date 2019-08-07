<template>
  <main-layout>
    <div>
      <h1>Мой профиль</h1>
      <div class="myprofile">
        <div class="myprofile__avatar">
          <TeamLogo :player-name="model.player.name" v-photo="img.tshirt" :img="bgImageLogo" class="avatar"/>
          <FileField id="playerphoto" labelTextVal="" @onChangeFile="encodeImageFileAsURL"/>
        </div>
        <div class="myprofile__info">
          <TextField id="playername" labelTextVal="Имя" 
            :value="model.player.name" 
            @onChangeInParent="onChange" 
            @onBlur="onBlur" 
            :tooltip="tooltips.username" 
            :error="errors.username"/>
          <TextField id="playerrole" labelTextVal="Позиция" 
            :value="getRole" 
            @onPopup="onPopup"
            :isSaved="isSaved" 
            @removeSaved="removeSavedEnd" />
        </div>
      </div>
      <br>
      <check-box @onCheck="onCheck" :isCheck="isCheck">Я травмирован!<br>Оповестить мои комманды</check-box><!--@onCheck="toggleStatus"-->
      <br>
      <div class="info">
        <h2>Личная информация</h2>
        <TextField id="playerdate" type="date" labelTextVal="Дата рождения"/>
        <TextField id="playercity" type="text" labelTextVal="Город"/>
        <TextField id="playermail" type="email" labelTextVal="e-mail" 
          :value="model.player.contact.email" 
          @onChangeInParent="onChange"
          @onBlur="onBlur" 
          :tooltip="tooltips.email" 
          :error="errors.email"/>
        <TextField id="playerphone" type="tel" labelTextVal="Телефон" 
          :value="model.player.contact.phone" 
          @onChangeInParent="onChange" 
          @onBlur="onBlur"
          :tooltip="tooltips.phone"
          :error="errors.phone"/>

        <section name="popup">
          <Popup :visible="isPopupVisible" @onClose="onCloseAction">
            <Radio
              id="allRoles"
              className="radio_popup"
              labelText="Позиция"
              :options = "roles"
              :value="potentialRole"
              @onRadio="onRadio"
            /> 
            <TButton :onClick="onSubmit" view="fluid">Ok</TButton>
          </Popup>
        </section>
      </div>
    </div>
  </main-layout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout";
import API from "@/services/ApiService";
import TextField from "@/components/TextField";
import FileField from "@/components/FileField";
import TeamLogo from "@/components/TeamLogo";
import TButton from "@common/TButton";
import Popup from "@common/Popup";
import Radio from "@common/Radio";
import {CITIES} from "@/services/ConstService";
import {
    validateName,
    validateEmail,
    validatePhone
} from "@/services/InputFieldsService";
import CheckBox from "@/components/CheckBox";

export default {
  name: "ProfileMe",
  components: {
    MainLayout,
    TeamLogo,
    TButton,
    FileField,
    TextField,
    Popup,
    Radio,
    CheckBox
  },
  data() {
    return {
      value: "",
      id: "9",
      baseUrl: "/player/",
      isPopupVisible: false,
      isSaved: false,
      model: { 
        player: { 
          name: "", 
          role: "", 
          photo: "",
          location: {
            city: "",
            district: ""
          },
          contact: {
            email: "",
            phone: ""
          } 
        } 
      },
      roles: [ 
        {title: "Вратарь", name: 'Вратарь'}, 
        {title: "Защитник", name: 'Защитник'}, 
        {title: "Полузащитник", name: 'Полузащитник'}, 
        {title: "Нападающий", name: 'Нападающий'}
      ],
      currentRole: '',
      potentialRole: '',
      bgImageLogo: '',
      tooltips: {
        email: "",
        name: ""
      },
      //error: false,
      errors: {
        username: "",
        email: "",
        password: "",
        agreeTerms: "",
        phone: ""
      },
      tooltips: {
        username: "",
        email: "",
        password: "не менее 8 знаков",
        phone: ""
      },
      img: {
        tshirt: `url('${require(`../assets/images/team-profile-avatar.svg`)}')`,
        logoBlue: `url('${require(`../assets/images/team-logo-blue.svg`)}')`,
        logoGreen: `url('${require(`../assets/images/team-logo-green.svg`)}')`,
        type: String
      },
      isCheck: false
    };
  },
  created() {
    this.getData(this.url);
  },
  computed: {
    url(){
      return this.baseUrl + this.id;
    },
    getRole(){
      return this.currentRole || this.model.player.role;
    }
  },
  watch: {
  },
  methods: {
    // toggleStatus(val){
    //   this.isCheck=val;
    // },
    // onCheck(val) {
    //   console.log(val)
    // },
    onCheck(val) {
      this.isCheck = val;
    },
    getErrorText(txt) {
      this.error=txt;
    },
    removeSavedEnd(val) {
      if(this.isSaved) {
        console.log('removeSaveEnd= ',val);
        this.isSaved = true;
        setTimeout((bool)=>{this.isSaved=bool}, 1000, false);
      }
    },
    encodeImageFileAsURL(fileToLoad) {
      let reader = new FileReader();
      reader.onload = function(fileLoadedEvent) {
        let srcData = fileLoadedEvent.target.result; // <--- data: base64
        document.querySelector(".logo.avatar").classList.add("myimg");
        document.querySelector(".myimg").innerHTML = "";
        document.querySelector(".logo.avatar").style.backgroundImage = `url(${srcData})`;
        this.bgImageLogo = srcData;
        console.log(this.bgImageLogo)
      }
      reader.readAsDataURL(fileToLoad);
    },
    onChange(value, id) {
      console.log('arg name=');
      console.log(arguments);
      switch(id) {
        case('playername'): this.model.player.name = value; break;
        case('playermail'): this.model.player.contact.email = value; break;
        case('playerphone'): this.model.player.contact.phone = value; break;
        case('playercity'): this.model.player.location.city = value; break;
      }
    },
    onBlur({name, email, phone, city, role, photo}){
      //event.preventDefault();
      const errors = {};

      if (!validateName(name)) {
        errors.username = "Must be 3 characters or more, only letters";
      }
      if (!validateEmail(email)) {
        errors.email = "Неверный формат. Пример: example@gmail.com";
      }
      if (!validatePhone(phone)) {
        errors.phone = "Неверный формат. Пример: ?!";
      }

      // if (!this.agreeTerms) {
      //   errors.agreeTerms = "You should agree";
      // }

      if (Object.keys(errors).length > 0) {
        this.errors = errors;
      } else {
        this.errors = {};
        console.log(
          "submit", name, email, phone, city, role, photo
          // this.username,
          // this.email,
          // this.password,
          // this.agreeTerms
        );
      }

        //if(email.length==0){
          // console.log('onBlue email Event='+event);
          // event.preventDefault();
          // const errors = {};
          // if (!validateEmail(this.email)) {
          //   errors.email = "Неверный формат. Пример: example@gmail.com";
          // }
          // if (!validatePassword(this.password)) {
          //   errors.password = "Неверный формат. Пример: testTest21!";
          // }
          // if (Object.keys(errors).length > 0) {
          //   this.errors = errors;
          // } else {
          //   this.errors = {};
          // }
        //}
        API.fetch(this.url, {
          method: 'POST',
          body: { name, email, phone, city, role, photo }
        })
    },
    getData(url) {
      API.fetch(url)
        .then(data => {
          this.model = data;
          this.currentRole = this.model.player.role;
          this.potentialRole = this.model.player.role;
        })
        .catch(function(ex) {
          console.log("fetch data failed", ex);
        });
    },
    onRadio(name, selectedValue){
      console.log(selectedValue)
      this.potentialRole = selectedValue; // FINAL STEP
    },
    onSubmit(selectedValue){
      this.currentRole = this.potentialRole; // FINAL STEP
      this.onCloseAction();
      this.isSaved=true;
      //document.querySelector('label[for="playerrole"]').classList.add('saved');
    },
    onCloseAction(){
      this.isPopupVisible = false;
    },
    onPopup() {
      console.log('onPopup')
      this.isPopupVisible = !this.isPopupVisible;
    }
  }

}
</script>

<style lang="scss">
.myprofile {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 20px;
  &__info {
    width: 80vw;
  }
  &__avatar {
    margin-top: -10px;
  }
}
.info {
  background: white;
  padding: 25px 15px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
#playerdate {
  #picker {
    display: none;
  }
}
span.save{
    position: absolute;
    font-size: 11px;
    background: $tone-social;//#0080008c;
    padding: 3px 10px;
    border-radius: 11px;
    color: white;
}
</style>
