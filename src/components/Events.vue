<template>
    <div class="main-container">
<!--     {{ groupedEvents }} -->
    <div v-for="date in Object.keys(groupedEvents).sort(this.sortDate)" :key="date">
      <div class="event__block">
        <div class="event__date">
          <span class="event_weekday" v-if="date === Date()">СЕГОДНЯ </span>
          <span>{{ date }}</span>
        </div>
        <div v-for="event in groupedEvents[date]" :key="event.id">
          <Event :event="event" />
         </div> 
       </div>
      </div>
    </div>
</template>

<script>
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
    sortDate(a,b) {
      return new Date(b).getTime() - new Date(a).getTime();
    },    
  },
  computed: {
    groupedEvents() {
        return this.events.reduce((prev, curr) => {
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
</style>