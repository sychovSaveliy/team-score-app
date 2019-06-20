<template>
    <div class="event">
    	<div class="event__date">
    		<span class="event_weekday">СЕГОДНЯ </span>
    		<span>Вторник 10 ноября 2018 </span>
    	</div>
	    <div class="event__teams">
        <div>
          <TeamProfile :team="event.data.teams[0]" align="left"/>
        </div>
        <div class="event__score" v-if="event.data.type==='training'">- : -</div>
        <div class="event__score" v-else>2 : 3</div>
        <div>
          <div v-if="event.data.type==='training'">Training</div>
          <TeamProfile v-else :team="event.data.teams[1]" align="right"/>
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
        return { data: {teams: [], goals: []} };
      }
    },
  },
  data () {
    return {
      align: ""
    }
  },
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
