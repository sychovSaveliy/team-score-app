<template>
    <div class="main-container">
    	<Event :eventId="eventId"/>
    </div>
</template>

<script>
import Event from "@/components/Event";
export default {
  name: "MyEvents",
  components: {
    Event
  },
  data () {
  	return {
  		eventId: "12"
  	}	
  },
 };
</script>

<style lang="scss">
	.main-container {
		padding-bottom: 10px;
	}
</style>
