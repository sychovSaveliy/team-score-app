<template>
  <div>
    <h1>Мой профиль</h1>
    <div class="myprofile">
      <div class="myprofile__avatar">
        <TeamLogo :player-name="model.player.name" :img="bgImageLogo" class="avatar"/>
        <FileField id="playerphoto" labelTextVal="" @onChangeFile="encodeImageFileAsURL"/>
      </div>
      <div class="myprofile__info">
        <TextField id="playername" :value="model.player.name" labelTextVal="Имя:" @onChangeInParent="onChange" @onBlur="onBlur"/>
        <TextField id="playerrole" :value="getRole" @onClick="onPopup" labelTextVal="Позиция:"/>
      </div>
    </div>
    <br>
    <hr>
    <br>
    <h2>Личная информация</h2>
    <!--MyField idVal="myborn" typeVal="date" labelTextVal="Дата рождения"/>
    <MyField idVal="mycity" typeVal="text" labelTextVal="Город"/-->
    <TextField id="playermail" :value="model.player.contact.email" @onChangeInParent="onChange" labelTextVal="e-mail" @onBlur="onBlur"/>
    <TextField id="playerphone" :value="model.player.contact.phone" @onChangeInParent="onChange" labelTextVal="phone number" @onBlur="onBlur"/>

    <section name="popup">
      <Popup :visible="isPopupVisible" @onClose="onCloseAction">
          <Radio
            id="allRoles"
            className="radio_popup"
            labelText="Позиция"
            :options = "roles"
            :value="currentRole"
            @onRadio="onRadio"
          /> 
          <TButton @сlick="onSendRadio" view="fluid" >Ok</TButton>
      </Popup>
    </section>
  </div>
</template>

<script>
import API from "@/services/ApiService";
import TextField from "@/components/TextField";
import FileField from "@/components/FileField";
import TeamLogo from "@/components/TeamLogo";
import TeamProfile from "@/components/TeamProfile";
import TButton from "@common/TButton";
import Popup from "@common/Popup";
import Radio from "@common/Radio";
export default {
  name: "ProfileMe",
  components: {
    TeamProfile,
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
      isPopupVisible: true,
      model: { 
        player: { 
          name: "", 
          role: "", 
          photo: "", 
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
      bgImageLogo: ''
      //onSend: { type: Function }
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
      }
      //this.model.player.name = name;
      //this.model.player.photo = photo;
    },
    // onChangeMail(email){
    //   console.log('arg email=');
    //   console.log(arguments);
    //   this.model.player.contact.email = email;
    // },
    onBlur({name, email, phone, age, role, photo}){
       API.fetch(this.url, {
         method: 'POST',
         body: { name, email, phone, age, role, photo }
       })
    },
    getData(url) {
      API.fetch(url)
        .then(data => {
          this.model = data;
          this.currentRole = this.model.player.role;
          // console.log(data)
        })
        .catch(function(ex) {
          console.log("fetch data failed", ex);
        });
    },
    //onFilterChange() {
    //  this.isPopupVisible = true;
    //},
    //onCloseAction(){
    //  this.isPopupVisible = false;
    //},
    onRadio(name, selectedValue){
      this.currentRole = selectedValue; // FINAL STEP
      console.log('radio')
    },
    onSend(name, selectedValue){
      this.currentRole = selectedValue; // FINAL STEP
      console.log('radio2');
      this.onCloseAction();
    },
    onCloseAction(){
      this.isPopupVisible = false;
    },
    onPopup(active) {
      this.isPopupVisible = !this.isPopupVisible;
    }
  }

}
</script>

<style>
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
</style>
