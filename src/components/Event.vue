<template>
    <div class="event">
	    <div class="event__teams">
        <div class="event__team">
          <TeamProfile :team="event.teams[0]" align="left"/>
        </div>
        <div class="event__score" v-if="event.type==='training'">- : -</div>
        <div class="event__score" v-else>{{getReults}}</div>
        <div class="event__team">
          <div class="event__training" v-if="event.type==='training'"><span>Training</span></div>
          <TeamProfile v-else :team="event.teams[1]" align="right"/>
        </div>      
      </div>
    </div>
</template>

<script>
import TeamProfile from "@/components/TeamProfile";
export default {
  name: "MyEvents",
  components: {
    TeamProfile
  },
  props: {
    event: {
      type: Object,
      default: function() {
        return { teams: [], goals: [] };
      }
    },
  },
  data () {
    return {
      align: ""
    }
  },
  computed: {
    getReults(){
      let listOfTeams = this.event.teams.map(item => {return {id: item.id, goal: 0}})
      this.event.data.goals.forEach(goal => {
          for(let i = 0; i < listOfTeams.length; i++){
            if(listOfTeams[i].id === goal.scoringTeam) {
              listOfTeams[i].goal++;
            }
          }
      })
      return `${listOfTeams[0].goal} : ${listOfTeams[1].goal}`
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
    &__team {
      flex: 0 1 40%;
    }
    &__training{
      text-align: center;
      span {
        background-color: lightgrey;
        display: inline-block;
        border-radius: 15px;
        padding: 5px 15px;
      }
    }
    &__score {
      white-space: nowrap;
    }
    &__date {
      margin: 40px 0 20px;
      font-weight: bold;
    }
  }
</style>
