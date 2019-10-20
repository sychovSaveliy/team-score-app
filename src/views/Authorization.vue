<template>
  <div>
    <div v-if="showStatus">
    Error
      {{ statusText }}
      <br><br>
        <router-link to="/">
          На Главную
        </router-link>
    </div>
  </div>
</template>

<script>
import API from "@/services/ApiService";
export default {
  name: "Authorization",
  data () {
    return {
      showStatus: false,
      statusText: ""
    }
  },
  created() {
        API.fetch(`/auth/activate/${this.$route.params.key}`)
        .then(data => {
          console.log('activate', data)
          this.$router.push('/')
        })
        .catch(data => {
          console.log(data)
          this.showStatus = true
          this.statusText = data
        });
  },
};
</script>

<style lang="scss">

</style>
