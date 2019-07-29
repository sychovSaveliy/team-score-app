<template>
  <main-layout>
    <section class="section">
      <h1>Игра</h1>
      <div>{{ this.event.date }}</div>
      <div class="buttons">
        <TButton view="inline" color="blue" @click="">Сообщения</TButton>
        <TButton view="inline" color="red" @click="">Я админ</TButton>        
      </div>
      <div class="event">
        <Event v-if="event" :event="event" />
      </div>

      <div class="event">
        <h2>Голы:</h2>
        <!-- {{ groupedGoals }} -->
        <div class="goals">
          <div class="goals__left">  
            <div v-for="player in Object.keys(groupedGoals)" v-if="event.teamA.players.find(item => item.id == player)" class="goal">
              <UserProfile :user="event.teamA.players.find(item => item.id == player)" align="left"/>
              <span class="goal__num">{{ groupedGoals[player].length }}</span>
              <span v-if="event.stat.teamA_.goals >= event.stat.teamB_.goals">:</span>
            </div>
          </div>
          <div class="goals__right">   
            <div v-for="player in Object.keys(groupedGoals)" v-if="event.teamB.players.find(item => item.id == player)" class="goal">
              <span v-if="event.stat.teamA_.goals < event.stat.teamB_.goals">:</span>
              <span class="goal__num">{{ groupedGoals[player].length }}</span>
              <UserProfile :user="event.teamB.players.find(item => item.id == player)" align="right"/>
            </div>
         </div>   
       </div> 
      </div>

      <div class="event">
        <h2>Голевые передачи:</h2>
        <!-- {{ groupedPasses }} -->
        <div class="goals">
          <div class="goals__left">  
            <div v-for="player in Object.keys(groupedPasses)" v-if="event.teamA.players.find(item => item.id == player)" class="goal">
              <UserProfile :user="event.teamA.players.find(item => item.id == player)" align="left"/>
              <span class="goal__num">{{ groupedPasses[player].length }}</span>
              <span v-if="event.stat.teamA_.passes >= event.stat.teamB_.passes">:</span>
            </div>
          </div>
          <div class="goals__right">   
            <div v-for="player in Object.keys(groupedPasses)" v-if="event.teamB.players.find(item => item.id == player)" class="goal">
              <span v-if="event.stat.teamA_.passes < event.stat.teamB_.passes">:</span>
              <span class="goal__num">{{ groupedPasses[player].length }}</span>
              <UserProfile :user="event.teamB.players.find(item => item.id == player)" align="right"/>
            </div>
         </div>   
       </div>
      </div>

      <div class="event">
        <h2>Пенальти:</h2>
        <!-- {{ groupedPenalties }} -->
        <div class="goals">
          <div class="goals__left">  
            <div v-for="player in Object.keys(groupedPenalties)" v-if="event.teamA.players.find(item => item.id == player)" class="goal">
              <UserProfile :user="event.teamA.players.find(item => item.id == player)" align="left"/>
              <span class="goal__num">{{ groupedPenalties[player].length }}</span>
              <span v-if="event.stat.teamA_.penalties >= event.stat.teamB_.penalties">:</span>
            </div>
          </div>
          <div class="goals__right">   
            <div v-for="player in Object.keys(groupedPenalties)" v-if="event.teamB.players.find(item => item.id == player)" class="goal">
              <span v-if="event.stat.teamA_.penalties < event.stat.teamB_.penalties">:</span>
              <span class="goal__num">{{ groupedPenalties[player].length }}</span>
              <UserProfile :user="event.teamB.players.find(item => item.id == player)" align="right"/>
            </div>
         </div>   
       </div>
      </div>

      <div class="event">
        <h2>Карточки:</h2>
        <!-- {{ groupedCards }} -->
        <div class="cards">
          <div class="cards__left">  
            <div v-for="player in Object.keys(groupedCards)" v-if="event.teamA.players.find(item => item.id == player)" class="cards__column">
              <div v-for="[cardType, arr] in Object.entries(groupedCards[player])">
                <div class= "card">
                  <UserProfile :user="event.teamA.players.find(item => item.id == player)" align="left"/>
                  <span :class="'card__num ' + cardType">{{ arr.length }}</span>
                  <span v-if="event.stat.teamA_.goals >= event.stat.teamB_.goals">:</span>
                </div>  
              </div>
            </div>
          </div>
          <div class="cards__right">  
            <div v-for="player in Object.keys(groupedCards)" v-if="event.teamB.players.find(item => item.id == player)" class="cards__column">
              <div v-for="[cardType, arr] in Object.entries(groupedCards[player])">
                <div class="card">
                  <span v-if="event.stat.teamA_.goals < event.stat.teamB_.goals">:</span>
                  <span :class="'card__num ' + cardType">{{ arr.length }}</span>
                  <UserProfile :user="event.teamB.players.find(item => item.id == player)" align="right"/>
                </div>
              </div>
            </div>
          </div>  
       </div>
      </div>

      <div class="event">
        <h2>Капитаны:</h2>
        <div class="event__row">
          <UserProfile :user="event.teamA.players.find(item => item.id == event.teamA.captain)" align="left"/>
          <div class="event__result"></div>
          <UserProfile :user="event.teamB.players.find(item => item.id == event.teamB.captain)" align="right"/>
        </div> 
      </div>

      <div class="event">
        <h2>Вратари:</h2>
        <div class="event__row">
          <UserProfile :user="event.teamA.players.find(item => item.role == 'вратарь')" align="left"/>
          <div class="event__result"></div>
          <UserProfile :user="event.teamB.players.find(item => item.role == 'вратарь')" align="right"/>
        </div>  
      </div>

     </section>
  </main-layout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout";
import Event from "@/components/Event";
import UserProfile from "@/components/UserProfile";
import TButton from "@common/TButton";
import API from "@/services/ApiService";
export default {
  name: "EventProfilePage",
  components: {
    MainLayout,
    TButton,
    Event,
    UserProfile
  },
  props: {
  },
  data () {
    return {
      event: {},
      baseUrl: "/events/"
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
            this.event = resp.data
            console.log(this.event)
        })
        .catch(function(ex) {
          console.log("fetch data failed", ex);
        });
    }
  },
  computed: {
    groupedGoals() {
        return this.event.goals.reduce((prev, curr) => {
          let key = curr['author'];
          if (!prev[key]) {
            prev[key] = [];
          }
          prev[key].push(curr);
          return prev;
        }, {});
    },
    groupedCards() {
        let cardByPlayer =  this.event.cards.reduce((prev, curr) => {
          let key = curr['author'];
          if (!prev[key]) {
            prev[key] = [];
          }
          prev[key].push(curr);
          return prev;
        }, {});

        Object.keys(cardByPlayer).forEach(item => {
          cardByPlayer[item] = cardByPlayer[item].reduce((prev, curr) => {
          let key = curr['type'];
          if (!prev[key]) {
            prev[key] = [];
          }
          prev[key].push(curr);
          return prev;
        }, {});
        })
        return cardByPlayer;
    },
    groupedPasses() {
        return this.event.passes.reduce((prev, curr) => {
          let key = curr['author'];
          if (!prev[key]) {
            prev[key] = [];
          }
          prev[key].push(curr);
          return prev;
        }, {});
    },
    groupedPenalties() {
        return this.event.goals.filter(goal => goal.condition == "penalty").reduce((prev, curr) => {
          let key = curr['author'];
          if (!prev[key]) {
            prev[key] = [];
          }
          prev[key].push(curr);
          return prev;
        }, {});
    },
  }
};
</script>

<style lang="scss">
  .event {
    background-color: white;
    box-shadow: 0px 0px 20px rgba(196, 196, 196, 0.2);
    border-radius: 15px;
    padding: 16px 20px;
    margin-bottom: 14px;
    &__teams {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &__team {
      flex: 0 1 40%;
    }
    &__training{
      text-align: center;
      span {
        background-color: lightgrey;
        display: inline-block;
        border-radius: 15px;
        padding: 5px 15px;
      }
    }
    &__score {
      white-space: nowrap;
    }
    &__date {
      margin: 40px 0 20px;
      font-weight: bold;
    }
    &__row {
      display: flex;
      justify-content: center;
    }
    &__result {
        width: 50px;
    }
  }
  h2{
    color: #A9A5A5
  }
  .buttons{
    display: flex;
    justify-content: space-between;
  }
  .goals {
    display: flex;
    justify-content: center;
    width: 100%;
    &__left {
      flex: 0 1 50%;
      & > div{
        &:last-child .goal{
          border-bottom: 0;
        }        
      }
      .goal {
        justify-content: flex-end;
        border-bottom: 1px solid #EDEDED;
      }  
    }
    &__right {
      flex: 0 1 50%;
      & > div{
        &:last-child .goal{
          border-bottom: 0;
        }        
      }
      .goal {
        justify-content: flex-start;
        border-bottom: 1px solid #EDEDED;
      } 
    }
  }
  .goal {
    display: flex;
    align-items: center;
    &__num {
      padding: 10px 20px;
      font-weight: bold;
    }
  }
  .cards {
    display: flex;
    justify-content: center;
    width: 100%;
    &__left {
      flex: 0 1 50%;
      .card {
        justify-content: flex-end;
        border-bottom: 1px solid #EDEDED;
      }  
    }
    &__right {
      flex: 0 1 50%;       
      .card {
        justify-content: flex-start;
        border-bottom: 1px solid #EDEDED;
      } 
    }
    .cards__left, .cards__right {
      & > div:last-child {
        .cards__column{
          & > div {
            &:last-child .card{
              border-bottom: 0;
            }          
          }
        }        
      }
      
    }

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
</style>
