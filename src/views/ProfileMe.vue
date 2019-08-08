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

      <check-box @onCheck="onCheck" :isCheck="isCheck">Я травмирован!<br>Оповестить мои комманды</check-box>

      <div class="info">
        <h2>Личная информация</h2>
        <TextField id="playerdate" type="date" labelTextVal="Дата рождения"/>

        <TextField id="playercity" type="text" labelTextVal="Город"
          :value="model.player.location.city" 
          list="cities-list"
          :opt="getCities"/>

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
            <Radio v-if="!this.isAdjustment"
              id="allRoles"
              className="radio_popup"
              labelText="Позиция"
              :options = "roles"
              :value="potentialRole"
              @onRadio="onRadio"
            /> 
            
            <Radio v-else
              id="adjustment"
              className="adjustment_popup"
              labelText="Настройки уведомлений"
            >
            <check-box @onCheck="onCheck" :isCheck="isCheck" class="ext">Уведомлять<br>о начале игры за один день</check-box>
            <check-box @onCheck="onCheck" :isCheck="isCheck" class="ext">Сообщения внутри игр</check-box>
            </Radio>
            <TButton :onClick="onSubmit" view="fluid">Ok</TButton>
          </Popup>
          
        </section>

        <h2>Мои Команды</h2>
        <h2>Настройки приложения</h2>
        <div class="adjust">
          <div class="adjust__info" @click="popupInfo" ><p id="info">Уведомления</p></div>
          <div class="adjust__signout"><p>Выйти – Сменить Аккаунт</p></div>
          <div class="adjust__contact"><p>Написать в поддержку</p></div>
        </div>
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
      errors: {
        username: "",
        email: "",
        phone: ""
      },
      tooltips: {
        username: "",
        email: "",
        phone: ""
      },
      img: {
        tshirt: `url('${require(`../assets/images/team-profile-avatar.svg`)}')`,
        logoBlue: `url('${require(`../assets/images/team-logo-blue.svg`)}')`,
        logoGreen: `url('${require(`../assets/images/team-logo-green.svg`)}')`,
        type: String
      },
      isCheck: false,
      opt: [],
      isAdjustment: false
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
    },
    getCities(){
      CITIES.map(item=>this.opt.push(item.name));
      return this.opt
    }
  },
  methods: {
    onCheck(val) {
      this.isCheck = val;
    },
    getErrorText(txt) {
      this.error=txt;
    },
    removeSavedEnd(val) {
      if(this.isSaved) {
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

      }
      reader.readAsDataURL(fileToLoad);
    },
    onChange(value, id) {
      switch(id) {
        case('playername'): this.model.player.name = value; break;
        case('playermail'): this.model.player.contact.email = value; break;
        case('playerphone'): this.model.player.contact.phone = value; break;
        case('playercity'): this.model.player.location.city = value; break;
      }
    },
    onBlur({name, email, phone, city, role, photo}){
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


      if (Object.keys(errors).length > 0) {
        this.errors = errors;
      } else {
        this.errors = {};
        console.log(
          "submit", name, email, phone, city, role, photo
        );
        API.fetch(this.url, {
          method: 'POST',
          body: { name, email, phone, city, role, photo }
        })
      }

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
      this.potentialRole = selectedValue; 
    },
    onSubmit(selectedValue){
      this.currentRole = this.potentialRole; // FINAL STEP
      this.onCloseAction();
      this.isSaved=true; 
    },
    onCloseAction(){
      this.isPopupVisible = false;
      this.isAdjustment = false;
    },
    onPopup() {
      console.log('onPopup')
      this.isPopupVisible = !this.isPopupVisible;
    },
    popupInfo() {
      if(event.target.id=='info'){
        this.isAdjustment = true;
        this.isPopupVisible = !this.isPopupVisible;
      }
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
  margin-top: 38px;
}
#playerdate {
  #picker {
    display: none;
  }
}
span.save{
    position: absolute;
    font-size: 11px;
    background: $tone-social;
    padding: 3px 10px;
    border-radius: 11px;
    color: white;
}
.adjust {
  text-align:left;
  div {
    border-bottom: 7px solid #ededed;
    border-top: 0 none #24292e;
    border-left: 0 none #24292e;
    border-right: 0 none #24292e;
    border-width: 1px;
    font-size: 16px;
    height: 50px;
    line-height:50px;
    padding-left:69px; 
  }
  &__info {
    background: url('../../src/assets/icons/adjust-info.svg') no-repeat center left;
  }
  &__signout {
    background: url('../../src/assets/icons/adjust-signout.svg') no-repeat center left;
  }
  &__contact {
    border-bottom: none !important;
    background: url('../../src/assets/icons/adjust-contact.svg') no-repeat center left;
  }
}
h2,h1 {
  font-size:$fs_md;
  line-height:$fs_md;
  color:$color_darkGrey;
}
</style>
