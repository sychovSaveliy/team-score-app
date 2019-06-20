<template>
    <div class="main-container">
    <div v-for="event in events">
    	<Event :event="event" />
     </div> 
    </div>
</template>

<script>
import Event from "@/components/Event";
import API from "@/services/ApiService";
export default {
  name: "Events",
  components: {
    Event
  },
  data () {
  	return {
  		events: [],
      baseUrl: "/events/"
  	}	
  },
  created() {
    let url = this.baseUrl;
    this.getData(url);
  },
  methods: {
    getData(url) {
      API.fetch(url)
        .then(data => {
          this.events = data;
          console.log(data)
        })
        .catch(function(ex) {
          console.log("fetch data failed", ex);
        });
    },
  }
 };
</script>

<style lang="scss">
	.main-container {
		padding-bottom: 10px;
	}
</style>
