<template>
  <main-layout>
    <section class="section">
      <h1>Профиль пользователя</h1>
      <br />
      <!-- <div>{{ user }}</div> -->
      <div class="user-profile-full event">
        <div><ProfilePicture :profile-name="user.name" align="left" type="user" /></div>
        <div class="user__data">
          <div class="user__data--item">
            <span class="user__data--name">Имя</span>
            <span class="user__data--value">{{ user.name }}</span>
          </div>
          <div class="user__data--item">
            <span class="user__data--name">Позиция</span>
            <span class="user__data--value">{{ user.role }}</span>
          </div>
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
    .user {
      &__data {
        display: flex;
        flex-direction: column;
        padding-top: 10px;
        &--item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 20px;
        }
        &--name {
          font-size: 14px;
          color: #A9A5A5;
          margin-bottom: 5px;
        }
        &--value {
          font-size: 16px;
        }
      }
    }
  }
</style>
