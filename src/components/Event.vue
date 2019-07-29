<template>
  <div class="event__teams">
    <div class="event__team">
      <TeamProfile :team="event.teamA" align="left"/>
    </div>
    <router-link :to="'/event/' + event.id">
      <div v-if="event.typeOfEvent !== 'training'">
        <div class="event__score" v-if="new Date(event.date).setHours(0,0,0,0) > new Date().setHours(0,0,0,0)">- : -</div>
        <div class="event__score" v-else>
          {{ event.stat.teamA_.goals }} : {{ event.stat.teamB_.goals }}
        </div>        
      </div>
      <div>
         <span class="event__status" v-if="new Date(event.date).setHours(0,0,0,0) < new Date().setHours(0,0,0,0)">окончен</span>
         <span class="event__time" v-else>{{ event.startTime }}</span>
      </div>         
    </router-link>
    <div class="event__team">
      <div class="event__training" v-if="event.typeOfEvent==='training'"><span>ТРЕНИРОВКА</span></div>
      <TeamProfile v-else :team="event.teamB" align="right"/>
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
  }
};
</script>

<style lang="scss">
  .event {
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
      display: inline-block;
      span {
        background-color: #F5F5F5;
        color: #0E72CF;
        display: inline-block;
        border-radius: 15px;
        padding: 5px 15px;
        font-size: 16px;
      }
    }
    &__score {
      white-space: nowrap;
      font-weight: bold;
      font-size: 24px;
    }
    &__date {
      margin: 40px 0 20px;
      font-weight: bold;
      font-size: 14px;
    }
    &__time {
      color: #2BBB3A;
      font-size: 14px;
    }
    &__status {
      color: #C4C4C4;
      font-size: 14px;
    }
  }
  a, a:hover {
    text-decoration: none;
    color: inherit;
  }
</style>
