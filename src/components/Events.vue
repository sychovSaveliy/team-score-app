<template>
    <div class="main-container">
<!--     {{ groupedEvents }} -->
    <div v-for="date in Object.keys(groupedEvents).sort(this.sortDate)" :key="date">
      <div class="event__block">
        <div class="event__date">
          <span class="event_weekday important" v-if="new Date(date).setHours(0,0,0,0) === new Date().setHours(0,0,0,0)">СЕГОДНЯ </span>
          <span>{{ date }}</span>
        </div>
        <div v-for="event in groupedEvents[date]" :key="event.id">
          <div class="event">
            <Event :event="event" />
          </div>
         </div> 
       </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Event from "@/components/Event";
export default {
  name: "Events",
  components: {
    Event
  },
  data () {
    return {
    } 
  },
  props: {
    events: {
      type: Array
    },
  },
  methods: {
    ...mapGetters(['getFiltredEvents']),
    sortDate(a,b) {
      return new Date(b).getTime() - new Date(a).getTime();
    },    
  },
  computed: {
    groupedEvents() {
        return this.getFiltredEvents().reduce((prev, curr) => {
          let key = curr['date'];
          if (!prev[key]) {
            prev[key] = [];
          }
          prev[key].push(curr);
          return prev;
        }, {});
    }
  }
 };
</script>

<style lang="scss">
  .main-container {
    padding-bottom: 10px;
  }
  .important {
    color: tomato;
  }
  .event {
    background-color: white;
    box-shadow: 0px 0px 20px rgba(196, 196, 196, 0.2);
    border-radius: 15px;
    padding: 16px 20px;
    margin-bottom: 14px;
  }  
</style>