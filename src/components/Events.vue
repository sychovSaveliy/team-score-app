<template>
    <div class="main-container">
<!--     {{ groupedEvents }} -->
    <div v-for="date in Object.keys(groupedEvents)" :key="date">
      <div class="event__block">
        <div class="event__date">
          <span class="event_weekday" v-if="getFormatedDate(date) == getFormatedDate(new Date())">СЕГОДНЯ </span>
          <span>{{ getFormatedDate(date) }}</span>
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
    getFormatedDate(d) {
        return new Date(d).toLocaleDateString('en-GB', {
                day : 'numeric',
                month : 'short',
                year : 'numeric'
            }).split(' ').join('-');
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
    },

  }
 };
</script>

<style lang="scss">
	.main-container {
		padding-bottom: 10px;
	}
</style>
