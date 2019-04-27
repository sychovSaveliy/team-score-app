<template>
  <div class="prototype">
    <Ttabs :list='list' />
    <br>
    <hr>
    <br>
    <Tlabel :txt="txt"></Tlabel>
    <br>
    <br>
    <hr>
    <br>
    <br>
    <div class="teams">
      <Tlabel :txt="txt" :team-events="events"></Tlabel>
      <TeamProfile :team="team" align="right"/>
    </div>
    <br>
    <br>
    <div class="teams">
      <TeamProfile :team="team" align="left"/>
      <Tlabel :txt="txt" :team-events="events"></Tlabel>
    </div>


  </div>
</template>

<script>
import Ttabs from "@/components/Ttabs";
import Tlabel from "@/components/Tlabel";

import API from "@/services/ApiService";
import TeamProfile from "@/components/TeamProfile";
import TeamLogo from "@/components/TeamLogo";

export default {
  name: "Prototype5",
  components: {
    Ttabs,
    Tlabel,
    TeamProfile,
    TeamLogo
  },
  data() {
    return {
      txt: "тренировка",
      list: [
        { title: "мои игры", actionTab: this.showMyGames, classNames: ["active"] },
        { title: "все игры", actionTab: this.showAllGames, classNames: [] }
      ],
      item: ["item"],

      id: "12",/**/
      align: "",
      teams: [],
      team: {
        data: {
          name: "",
          city: "",
          events: ['training']
        }
      },
      baseUrl: "/team/"/**/
    };
  },

  created() {/**/
    let url = this.baseUrl + this.id;
    this.getData(url);
    this.getDataAll(this.baseUrl);
  },/**/
  methods: {
    showMyGames(tabItem) {
      tabItem.classNames = ["active"];
      console.log('do showMyGame');

    },
    showAllGames(tabItem) {;
      tabItem.classNames = ["active"];
      console.log('do showAllGames');
    },
    getDataAll(url) {/**/
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
    }/**/

  },
};
</script>

<style lang="scss">

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
