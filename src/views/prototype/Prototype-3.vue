<template>
  <div>
    
    <h1>Мой профиль</h1>
    <div class="myprofile">
      <div class="myprofile__avatar">
        <TeamLogo :player-name="model.player.name" class="avatar"/>
        <FileField id="playerphoto" labelTextVal=""/>
      </div>
      <div class="myprofile__info">
        <TextField id="playername" :value="model.player.name" labelTextVal="Имя:" @onChangeName="onChange" @onBlur="onBlur"/>
        <TextField id="playerrole" :value="model.player.role"@onClick="onFilterChange()"  labelTextVal="Позиция:"/><!--typeVal="text"-->
      </div>
    </div>
      
    <br>
    <hr>
    <br>

    <!--MyField idVal="myborn" typeVal="date" labelTextVal="Дата рождения"/>
    <MyField idVal="mycity" typeVal="text" labelTextVal="Город"/>
    <MyField idVal="mymail" typeVal="email" labelTextVal="e-mail"/-->
  

    <section name="popup">
      <Popup :visible="isPopupVisible" @onClose="onCloseAction">
        <TextField class="profile__radio" type="radio" labelTextVal="Вратарь"/>
        <TextField class="profile__radio" type="radio" labelTextVal="Защитник"/>
        <TextField class="profile__radio" type="radio" labelTextVal="Полузащитник"/>
        <TextField class="profile__radio" type="radio" labelTextVal="Нападающий"/>
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
export default {
  name: "Prototype3",
  components: {
    TeamProfile,
    TeamLogo,
    TButton,
    FileField,
    TextField,
    Popup
  },
  data() {
    return {
      value: "",
      id: "9",
      baseUrl: "/player/",
      //filter: "Будущие",
      isPopupVisible: true,
      model: { player: { name: "", role: "" } }
    };
  },
  created() {
    this.getData(this.url);
  },
  computed: {
    url(){
      return this.baseUrl + this.id;
    }
  },
  methods: {
    uploadImage(event) {
      //const URL = 'http://localhost:8080/upload'; 

      //let data = new FormData();
      //data.append('name', 'my-picture');
      //data.append('file', event.target.files[0]); 

      //let config = {
      //  header : {
      //    'Content-Type' : 'image/png'
      //  }
      //}

      //axios.put(
      //  URL, 
      //  data,
      //  config
      //).then(
      //  response => {
      //    console.log('image upload response > ', response)
      //  }
      //)
    },
    onChange(name) {
      this.model.player.name = name;
    },
    onBlur({name, email, age, role}){
       API.fetch(this.url, {
         method: 'POST',
         body: { name, email, age, role }
       })
    },
    onSearch() {
      console.log("search");
    },
    onFilter() {
      console.log("filters");
    },
    getData(url) {
      API.fetch(url)
        .then(data => {
          this.model = data;
          console.log(data)
        })
        .catch(function(ex) {
          console.log("fetch data failed", ex);
        });
    },
    onFilterChange() {
      this.isPopupVisible = true;
    },
    onCloseAction(){
      this.isPopupVisible = false;
    }
  }
}
</script>

<style lang="scss" scoped>

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