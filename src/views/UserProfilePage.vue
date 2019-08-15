<template>
  <main-layout>
    <section class="section">
      <h1>Профиль пользователя</h1>
      <br />
      <!-- <div>{{ user }}</div> -->
      <div class="user-profile-full event">
        <div><ProfilePicture :profile-name="user.name" align="left" type="user" /></div>
        <div>
            <div><b>{{ user.name }}</b></div>
            <div>{{ user.role }}</div>
        </div>
      </div>
    </section>
  </main-layout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout";
import ProfilePicture from "@/components/ProfilePicture";
import TButton from "@common/TButton";
import API from "@/services/ApiService";
export default {
  name: "UserProfilePage",
  components: {
    MainLayout,
    ProfilePicture,
    TButton
  },
  props: {
  },
  data () {
    return {
      user: "",
      baseUrl: "/player/",
    }
  },
  created() {
    let url = this.baseUrl + this.$route.params.id;
    console.log(url);
    this.getData(url);
  },
  methods: {
    getData(url) {
      API.fetch(url)
        .then(data => data)
        .then(resp => { 
            this.user = resp.player
            console.log(this.user)
        })
        .catch(function(ex) {
          console.log("fetch data failed", ex);
        });
    }
  }  
};
</script>

<style lang="scss">
  .user-profile-full {
    display: flex;
    .logo {
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
    }
  }
</style>
