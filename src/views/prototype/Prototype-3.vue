<template>
  <div>

      <TeamLogo :team-name="team.data.teamName" :align="align" class="avatar"/>
      <TButton view="upload-button" @click="uploadPhoto"/>
    
    
    <br>
    <hr>
    <br>
    <MyField :filter="filter" typeVal="text" labelTextVal="Имя:"/>
    <MyField :filter="filter" @onClick="onFilterChange()" typeVal="text" labelTextVal="Позиция:"/>
    <MyField :filter="filter" typeVal="date" labelTextVal="Дата рождения"/>
    <MyField :filter="filter" typeVal="text" labelTextVal="Город"/>
    <MyField :filter="filter" typeVal="email" labelTextVal="e-mail"/>
  

    <section name="popup">
      <Popup :visible="isPopupVisible" @onClose="onCloseAction">
        <MyField class="profile__radio" :filter="filter" typeVal="radio" labelTextVal="Вратарь"/>
        <MyField class="profile__radio" :filter="filter" typeVal="radio" labelTextVal="Защитник"/>
        <MyField class="profile__radio" :filter="filter" typeVal="radio" labelTextVal="Полузащитник"/>
        <MyField class="profile__radio" :filter="filter" typeVal="radio" labelTextVal="Нападающий"/>
      </Popup>
    </section>
    <!--button id="show-modal" @click="showModal = true">Show Modal</button>
    <-- use the modal component, pass in the prop ->
    <modal v-if="showModal" @close="showModal = false">
      <--
        you can use custom content here to overwrite
        default content
      ->
      <h3 slot="header">custom header</h3>
    </modal-->
  </div>
</template>

<script>
import API from "@/services/ApiService";
import Field from "@/components/common/Field";
import TeamLogo from "@/components/TeamLogo";
import TeamProfile from "@/components/TeamProfile";
import TButton from "@common/TButton";
import MyField from "@/components/MyField";
import Popup from "@common/Popup";
export default {
  name: "Prototype3",
  components: {
    TeamProfile,
    TeamLogo,
    TButton,
    Field,
    MyField,
    Popup
  },
  data() {
    return {
      value: "",
      id: "12",
      align: "",
      teams: [],
      team: {
        data: {
          name: "",
          city: ""
        }
      },
      baseUrl: "/team/",
      filter: "Будущие",
      isPopupVisible: true
    };
  },
  props: {
    filter: String,
    //align: { default: "left", type: String }
  },
  created() {
    let url = this.baseUrl + this.id;
    this.getData(url);
    this.getDataAll(this.baseUrl);
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
    },
    getDataAll(url) {
      API.fetch(url)
        .then(data => {
          this.teams = data;
        })
        .catch(function(ex) {
          console.log("fetch data failed", ex);
        });
    },
    getData(url) {
      API.fetch(url)
        .then(data => {
          this.team = data;
        })
        .catch(function(ex) {
          console.log("fetch data failed", ex);
        });
    },
    uploadPhoto() {
      alert("Upload your photo")
    },
    onFilterChange() {
      this.isPopupVisible = true;
    },
    onCloseAction(){
      this.isPopupVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>

.teams {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-around;
  &__item {
    flex: 0 1 50%;
    padding: 0 10px;
  }
}

</style>