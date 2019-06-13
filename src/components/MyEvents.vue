<template>
    <div class="main-container">
    	<Event :teamId="teamId"/>
    	<Event :teamId="teamId"/>
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
  		teamId: "24"
  	}	
  },
 };
</script>

<style lang="scss">
	.main-container {
		padding-bottom: 10px;
	}
</style>
