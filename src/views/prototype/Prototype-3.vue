<template>
  <form>
    
    <h1>Мой профиль</h1>
    <div class="myprofile">
      <div class="myprofile__avatar">
        <TeamLogo :player-name="player.player.name" class="avatar"/>
        <FileField id="playerphoto" labelTextVal=""/>
      </div>
      <div class="myprofile__info">
        <TextField id="playername" :value="player.player.name" labelTextVal="Имя:" />
        <!--MyField idVal="myposition" @onClick="onFilterChange()" typeVal="text" labelTextVal="Позиция:"/-->
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
        <!--MyField class="profile__radio" typeVal="radio" labelTextVal="Вратарь"/>
        <MyField class="profile__radio" typeVal="radio" labelTextVal="Защитник"/>
        <MyField class="profile__radio" typeVal="radio" labelTextVal="Полузащитник"/>
        <MyField class="profile__radio" typeVal="radio" labelTextVal="Нападающий"/-->
      </Popup>
    </section>

  </form>
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
      isPopupVisible: false
    };
  },
  props: {
    player: {
      type: Object,
      default: function() {
        return { player: { name: "" } };
      }
    },
    //filter: String,
    name: String
  },
  created() {
    let url = this.baseUrl + this.id;
    this.getData(url);
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
    onChange() {
      console.log(event.target.value);
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
          this.player = data;
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