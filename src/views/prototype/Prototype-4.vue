<template>
  <div class="prototype">
    {{ /* Logo Component */ }}
    <ProfilePicture :profile-name="team.data.teamName" align="left"/>
    <ProfilePicture :profile-name="team.data.teamName" align="right"/>

    <br>
    <hr>
    <br>
    {{ /* TeamProfile Component */ }}
    <TeamProfile :team="team" align="left"/>
    <TeamProfile :team="team" align="right"/>

    <br>
    <hr>
    <br>

    <div class="teams">
      <div v-for="(item, i) in teams" :key="item.name">
        <div v-if="i%2 == 0" class="teams__item teams__item_left">
          <TeamProfile :team="item" align="left"/>
        </div>
        <div v-else class="teams__item teams__item_right">
          <TeamProfile :team="item" align="right"/>
        </div>
      </div>
    </div>
    {{ /* teams */}}
  </div>
</template>

<script>
import API from "@/services/ApiService";
import TeamProfile from "@/components/TeamProfile";
import ProfilePicture from "@/components/ProfilePicture";
export default {
  name: "Prototype4",
  components: {
    TeamProfile,
    ProfilePicture
  },
  data() {
    return {
      text: "Example text prototype 4",
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
  created() {
    let url = this.baseUrl + this.id;
    this.getData(url);
    this.getDataAll(this.baseUrl);
  },
  methods: {
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
    }
  }
};
</script>

<style lang="scss">
.prototype {
  font-size: 24px;
}
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
