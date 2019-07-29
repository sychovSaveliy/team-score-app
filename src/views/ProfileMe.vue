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
          <TextField id="playername" :value="model.player.name" labelTextVal="Имя" @onChangeInParent="onChange" @onBlur="onBlur" :error="errors.email"/>
          <TextField id="playerrole" :value="getRole" @onPopup="onPopup" labelTextVal="Позиция"/>
        </div>
      </div>
      <br>
      <hr>
      <br>
      <div class="info">
        <h2>Личная информация</h2>
        <TextField id="playerdate" type="date" labelTextVal="Дата рождения"/>
        <TextField id="playercity" type="text" labelTextVal="Город"/>
        <TextField id="playermail" type="email" :value="model.player.contact.email" @onChangeInParent="onChange" labelTextVal="e-mail" @onBlur="onBlur" :tooltip="tooltips.email" :error="errors.email"/>
        <TextField id="playerphone" type="tel" :value="model.player.contact.phone" @onChangeInParent="onChange" labelTextVal="Телефон" @onBlur="onBlur"/>

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
import {COUNTRIES} from "@/services/ConstService";

export default {
  name: "ProfileMe",
  components: {
    MainLayout,
    TeamLogo,
    TButton,
    FileField,
    TextField,
    Popup,
    Radio
  },
  data() {
    return {
      value: "",
      id: "9",
      baseUrl: "/player/",
      isPopupVisible: false,
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
      errors: {
        email: "*Обязательное поле для заполнения",
        name: "*Обязательное поле для заполнения"
      },
      img: {
        tshirt: '',
      }
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
  methods: {
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
      this.potentialRole = selectedValue; // FINAL STEP
    },
    onSubmit(selectedValue){
      this.currentRole = this.potentialRole; // FINAL STEP
      this.onCloseAction();
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

</style>
