<template>
  <div class="prototype">
    {{ text }}
    <TeamProfile :team=team />
  </div>
</template>

<script>
import TeamProfile from "@/components/TeamProfile";
export default {
  name: "Prototype-4",
  components: {
    TeamProfile
  },
  data() {
    return {
      text: "Example text prototype 4",
      id: 12,
      team: {
        data: {
          name: "",
          city: ""
        }
      },
      baseUrl: 'http://localhost:5000/team/'
    };
  },
  created() {
    let url = this.baseUrl + this.id
    this.getData(url)
  },
  mounted() {
  },
  methods: {
    getData(url) {
        const self = this;
        fetch(url)
        .then(function(response) {
            return response.json()
        }).then(function(data) {
            self.team = data;
            console.log(self.team)
        }).catch(function(ex) {
            console.log('fetch data failed', ex)
        })
    }
  }

};
</script>

<style lang="scss">
.prototype {
  font-size: 24px;
}
</style>
