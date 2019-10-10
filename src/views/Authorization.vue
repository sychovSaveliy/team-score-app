<template>
  <div>
    Error
    <div v-if="showStatus">
      {{ statusText }}
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
        new Promise((resolve, reject) => {
            return fetch(`https://sandbbl.pythonanywhere.com/auth/activate/${this.$route.params.key}`).then(resp => {
                if (resp.status === 200) {
                    console.log(resp.status);
                    resolve(resp)
                } else {
                    reject(resp.statusText)
                }
            })
        })
        .then(resp => resp.json())
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
