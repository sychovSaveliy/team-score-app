<template>
  <div>

      <TeamLogo :team-name="team.data.teamName" :align="align" class="avatar"/>
      <TButton view="upload-button" @click="uploadPhoto">
      </TButton>
    
    
    <br>
    <hr>
    <br>

    <Field
      id="search"
      labelText="Имя"
      type="text"
      className='search'
      placeholder=""
      name="search"
      :value="value"
      @input="onChange"
    />


  </div>
</template>

<script>
import API from "@/services/ApiService";
import Field from "@/components/common/Field";
import TeamLogo from "@/components/TeamLogo";
import TeamProfile from "@/components/TeamProfile";
import TButton from "@common/TButton";
export default {
  name: "Prototype3",
  components: {
    TeamProfile,
    TeamLogo,
    TButton,
    Field
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
      baseUrl: "/team/"
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