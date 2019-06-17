<template>
    <div class="event">
    	<div class="event__date">
    		<span class="event_weekday">СЕГОДНЯ </span>
    		<span>Вторник 10 ноября 2018 </span>
    	</div>
	    <div class="event__teams">
        <div>
          <TeamProfile :team="teams[0]" align="left"/>
        </div>
        <div class="event__score">2 : 3</div>
        <div>
          <TeamProfile :team="teams[0]" align="right"/>
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
  data () {
    return {
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
    }
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
  .event {
    background-color: white;
    box-shadow: 0px 0px 20px rgba(196, 196, 196, 0.2);
    border-radius: 15px;
    padding: 16px 20px;
    margin-bottom: 14px;
    &__teams {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &__score {
      white-space: nowrap;
    }
  }
</style>
