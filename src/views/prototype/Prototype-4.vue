<template>
  <div class="prototype">
    {{ /* Logo Component */ }}
    <TeamLogo :team-name="team.data.teamName" align="left" />
    <TeamLogo :team-name="team.data.teamName" align="right" />

    <br><hr><br>
    
    {{ /* TeamProfile Component */ }}
    <TeamProfile :team="team" align="left" />
    <TeamProfile :team="team" align="right" />

    <br><hr><br>

    <div class="teams">
      <template v-for="item, i in teams">
        <div v-if="i%2 == 0" class="teams__item teams__item_left">
          <TeamProfile :team="item" align="left" />
        </div> 
        <div v-else class="teams__item teams__item_right">
          <TeamProfile :team="item" align="right" />
        </div>  
      </template>
     </div>

     {{ /* teams */}}
  </div>
</template>

<script>
import TeamProfile from "@/components/TeamProfile";
import TeamLogo from "@/components/TeamLogo";
export default {
  name: "Prototype-4",
  components: {
    TeamProfile,
    TeamLogo
  },
  data() {
    return {
      text: "Example text prototype 4",
      id: '12',
      align: "",
      teams: [],
      team: {
        data: {
          name: "",
          city: ""
        }
      },
      baseUrl: 'http://localhost:5000/team/'
    };
  },
  created() {
    let url = this.baseUrl + this.id
    this.getData(url)
    this.getDataAll(this.baseUrl)
  },
  methods: {
    getDataAll(url) {
        fetch(url)
        .then((response) => {
            return response.json()
        }).then((data) => {
            this.teams = data;
            console.log(this.teams)
        }).catch(function(ex) {
            console.log('fetch data failed', ex)
        })
    },
    getData(url) {
        fetch(url)
        .then((response) => {
            return response.json()
        }).then((data) => {
            this.team = data;
            console.log(this.team)
        }).catch(function(ex) {
            console.log('fetch data failed', ex)
        })
    }
  }

};
</script>

<style lang="scss">
.prototype {
  font-size: 24px;
}
.teams{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-around;
  &__item{
    flex: 0 1 50%;
    padding: 0 10px;
  }
}
</style>
