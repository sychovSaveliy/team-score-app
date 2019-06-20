<template>
    <div class="event">
    	<div class="event__date">
    		<span class="event_weekday">СЕГОДНЯ </span>
    		<span>Вторник 10 ноября 2018 </span>
    	</div>
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
    </div>
</template>

<script>
import API from "@/services/ApiService";
import TeamProfile from "@/components/TeamProfile";
export default {
  name: "MyEvents",
  components: {
    TeamProfile
  },
  props: {
    teamId: String
  },
  data () {
    return {
      id: this.teamId,
      align: "",
      teams: [],
      team: {
        data: {
          name: "",
          city: ""
        }
      },
      baseUrl: "/team/"
    }
  },
  created() {
    let url = this.baseUrl + this.id;
    this.getData(url);
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
  .event {
    background-color: white;
    box-shadow: 0px 0px 20px rgba(196, 196, 196, 0.2);
    border-radius: 15px;
    padding: 16px 20px;
    margin-bottom: 14px;
  }
</style>
