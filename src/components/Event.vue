<template>
    <div class="event">
      <router-link :to="'/event/' + event.id">
	    <div class="event__teams">
        <div class="event__team">
          <TeamProfile :team="event.teamA" align="left"/>
        </div>
        <div class="event__score" v-if="event.typeOfEvent==='training'">- : -</div>
        <div v-else>
          <div class="event__score">
            {{ `${event.stat.teamA_.goals} : ${event.stat.teamB_.goals}`}}
            </div>
          <div class="event__score">
            {{ event.startTime }}
          </div>          
        </div>
        <div class="event__team">
          <div class="event__training" v-if="event.typeOfEvent==='training'"><span>Training</span></div>
          <TeamProfile v-else :team="event.teamB" align="right"/>
        </div>      
      </div>
      </router-link>
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
