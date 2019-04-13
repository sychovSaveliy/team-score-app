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
      id: '24',
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
        fetch(url)
        .then((response) => {
            return response.json()
        }).then((data) => {
            this.team = data;
            console.log(this.team)
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
