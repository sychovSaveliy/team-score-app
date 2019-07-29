<template>
  <main-layout>
    <section class="section team-profile-full">
      <h1>Профиль Команды</h1>
      <br />
      <!-- <div>{{ team }}</div> -->
      <div class="team__info event">
        <div><ProfilePicture :profile-name="team.teamName" :align="align"/></div>
        <div class="team__data">
          <div class="team__data--item">
            <span class="team__data--name">Название</span>
            <span class="team__data--value">{{ team.teamName }}</span>
          </div>
          <div class="team__data--item">
            <span class="team__data--name">Город</span>
            <span class="team__data--value">{{ team.city }}</span>
          </div>
        </div>
      </div>
      <div class="buttons">
        <TButton view="fluid inline blue-filled" @click=""><router-link to="/event/new/">+ Записаться</router-link></TButton>
        <TButton view="fluid inline" @click=""><router-link to="/event/new/">Пригласить</router-link></TButton>
      </div>
      <div class="event">
        <div class="team__rating">Рейтинг в списке команд: <span class="team__rating--num">24</span> место</div>
        <table class="team__stat" cellpadding="0" cellspacing="0">
        <tr>
          <th>Игры</th>
          <th>Победы</th>
          <th>Ничьи</th>
          <th>Поражения</th>
        </tr>
        <tr>
          <td>22</td>
          <td class="green">12</td>
          <td class="blue">3</td>
          <td class="red">7</td>
        </tr>
        </table>
      </div>
      <div class="event">
        <h3>В команде 15 игроков</h3><br>
        Рейтинг игроков в команде
        <Ttabs :list="tabsList" :activeTab="templateType" />
      </div>
    </section>
  </main-layout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout";
import TeamProfile from "@/components/TeamProfile";
import ProfilePicture from "@/components/ProfilePicture";
import TButton from "@common/TButton";
import Ttabs from "@/components/Ttabs";
import API from "@/services/ApiService";
export default {
  name: "TeamProfilePage",
  components: {
    MainLayout,
    TeamProfile,
    ProfilePicture,
    TButton,
    Ttabs,
  },
  props: {
  },
  data () {
    return {
      team: "",
      baseUrl: "/team/",
      templateType: this.$route.params.type || 'games',
      tabsList: [
        { id: "games", title: "по играм", to: "/events/games" },
        { id: "goals", title: "по голам", to: "/events/goals" },
        { id: "cards", title: "карточки", to: "/events/cards" }
      ],
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
            this.team = resp.data
            console.log(this.team)
        })
        .catch(function(ex) {
          console.log("fetch data failed", ex);
        });
    }
  }  
};
</script>

<style lang="scss">
  .team-profile-full {
    .logo {
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .team {
      &__rating {
        color: #A9A5A5;
        font-size: 14px;
        margin-bottom: 30px;
        &--num {
          color: #2BBB3A;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: -10px;
          display: inline-block;
        }
      }
      &__stat {
        width: 100%;
        tr th {
          font-weight: normal;
          font-size: 12px;
          color: #A9A5A5;
          padding: 5px;
          border-right: 1px solid #EDEDED;
          &:last-child {
            border: 0;
          }
        }
        td {
          font-size: 24px;
          border-right: 1px solid #EDEDED;
          &:last-child {
            border: 0;
          }
          &.green{
            color: #2BBB3A;
          }
          &.blue{
            color: blue;
          }
          &.red{
            color: red;
          }
        }
      }
      &__info {
        display: flex;
      }
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
