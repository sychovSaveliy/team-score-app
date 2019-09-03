<template>
  <main-layout>
    <section class="section">
      <h1>Профиль Игрока</h1>
      <!-- <div>{{ this.player }}</div> -->
      <div class="user-profile-full event">
        <div>
          <ProfilePicture :profile-name="this.player.name" align="left" type="user" v-if="!this.player.photo" />
          <div v-else class="user__img"><img :src="this.player.photo" /></div>
        </div>
        <div class="user__data">
          <div class="user__data--item">
            <span class="user__data--name">Имя:</span>
            <span class="user__data--value">{{ this.player.name }}, <span class="user__data--additional">{{ this.player.location.city }}</span></span>
          </div>
          <div class="user__data--item">
            <span class="user__data--name">Позиция:</span>
            <span class="user__data--value">{{ this.player.role }}</span>
          </div>
          <div class="user__data--item">
            <span class="user__data--name">Команды:</span>
            <div class="user__data--value" v-for="team in this.player.teams">{{ team.teamName }}, <span class="user__data--additional">{{ team.city }}</span></div>
          </div>
        </div>
      </div>
      <div class="event">
        <div class="team__rating">Рейтинг в общем списке: <span class="team__rating--num">24</span> место</div>
        <div class="user__points">48 очков <span>КПД</span> <span class="user__points--num">1,74</span></div>
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
        <table class="team__stat" cellpadding="0" cellspacing="0">
        <tr>
          <th>Голы</th>
          <th>Передачи</th>
          <th>Гол+Пас</th>
          <th>Г с Пенальти</th>
        </tr>
        <tr>
          <td>22</td>
          <td class="green">12</td>
          <td class="blue">3</td>
          <td class="red">7</td>
        </tr>
        </table>
        <div class="user__cards">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td>Карточки:</td>
              <td><span class="card__num red">2</span></td>
              <td><span class="card__num yellow">3</span></td>
            </tr>
          </table>          
        </div>
      </div>
      <div class="notice">Рассчет очков:<br />победа  - 3 очка,  ничья - 1,  поражение - 0</div>
      <div class="buttons">
        <TButton view="fluid inline blue" @click=""><router-link to="/event/new/"><img :src="require(`../assets/icons/message.svg`)" alt/> Сообщение</router-link></TButton>
        <TButton view="fluid inline" @click=""><router-link to="/event/new/">Пригласить</router-link></TButton>
      </div>
    </section>
  </main-layout>
</template>

<script>
import {
  MUTATION_SET_PLAYER,
  ACTION_FETCH_PLAYER
} from '@/store/constants';
import MainLayout from "@/layouts/MainLayout";
import ProfilePicture from "@/components/ProfilePicture";
import TButton from "@common/TButton";
import { mapMutations, mapActions } from 'vuex';
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
      baseUrl: "/player/",
    }
  },
  created() {
    let url = this.baseUrl + this.$route.params.id;
    this.ACTION_FETCH_PLAYER({ url });
  },
  methods: {
    ...mapActions([ACTION_FETCH_PLAYER]),
    ...mapMutations([MUTATION_SET_PLAYER]),
  },
  computed: {
    player() {
      return this.$store.getters.getPlayer;
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
        &--additional {
          font-size: 14px;
          color: #A9A5A5;
        }
        &__img {
          border-radius: 50%;
          width: 130px;
          height: 130px;
        }
      }
    }
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
            background-color: white;
          }
          &.blue{
            color: blue;
            background-color: white;
          }
          &.red{
            color: red;
            background-color: white;
          }
        }
      }
    }
    .notice{
      text-align: left;
      width: 90%;
      margin: 0 auto;
      font-size: 14px;
    }
  .card {
    display: flex;
    align-items: center;
    &__num {
      padding: 7px;
      margin: 0 7px;
    }
  }
  .red{
    background-color: red;
    font-weight: bold;
    color: white;
  }
  .yellow {
    background-color: yellow;
    font-weight: bold;
    color: white;
  }
  .user__cards {
      margin: 20px;
      color: #A9A5A5;
    }
  .user__points {
      margin-bottom: 20px;
      &--num {
        font-size: 24px;
        font-weight: bold;
        display: inline-block;
        margin-left: 10px;
      }
    }
</style>
