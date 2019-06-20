<template>
    <div class="main-container">
    <div v-for="event in events">
    	<Event :event="event" />
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
      type: Array,
      default: []
    },
  },
 };
</script>

<style lang="scss">
	.main-container {
		padding-bottom: 10px;
	}
</style>
