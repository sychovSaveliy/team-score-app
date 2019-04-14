<template>
  <div class="prototype">
    {{ text }}
    <TeamProfile :team="team" align="left" />
    <TeamProfile :team="team" align="right" />
    <ul>
      <li v-for="item in teams"> {{ item.data.name }} </li>
     </ul>
     {{ teams }}
  </div>
</template>

<script>
import TeamProfile from "@/components/TeamProfile";
export default {
  name: "Prototype-4",
  components: {
    TeamProfile
  },
  data() {
    return {
      text: "Example text prototype 4",
      id: '24',
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
</style>
