<template>
  <div>
    hello {{this.$route.params.key}}
  </div>
</template>

<script>
import API from "@/services/ApiService";
export default {
  name: "Authorization",
  data () {
    return {
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
        .catch(err => console.log(err));
  },
};
</script>

<style lang="scss">

</style>
