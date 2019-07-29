<template>
    <div>
      <div class="event">
      <h1>Игра</h1>
      <div>{{ this.event.date }}</div>
      <div class="buttons">
        <TButton view="inline" color="blue" @click="">Сообщения</TButton>
        <TButton view="inline" color="red" @click="">Я админ</TButton>        
      </div>
        <div class="event__teams">
          <div class="event__team">
            <TeamProfile :team="this.event.teamA" align="left"/>
          </div>
          <div class="event__score" v-if="this.event.typeOfEvent==='training'">- : -</div>
          <div v-else>
            <div class="event__score">
              {{ `${this.event.stat.teamA_.goals} : ${this.event.stat.teamB_.goals}`}}
              </div>
            <div class="event__score">
              {{ this.event.startTime }}
            </div>          
          </div>
          <div class="event__team">
            <div class="event__training" v-if="this.event.typeOfEvent==='training'"><span>Training</span></div>
            <TeamProfile v-else :team="this.event.teamB" align="right"/>
          </div>      
        </div>
      </div>

      <div class="event">
        <h2>Голы:</h2>
        <div v-for="goal in event.goals" :key="date">
        {{ goal }}
        <hr>
        </div>
        
      </div>

      <div class="event">
        <h2>Голевые передачи:</h2>
      </div>

      <div class="event">
        <h2>Пенальти:</h2>
      </div>

      <div class="event">
        <h2>Карточки:</h2>
      </div>

      <div class="event">
        <h2>Капитаны:</h2>
      </div>

      <div class="event">
        <h2>Вратари:</h2>
      </div>
     </div> 
</template>

<script>
import TeamProfile from "@/components/TeamProfile";
import TButton from "@common/TButton";
import API from "@/services/ApiService";
export default {
  name: "MyEvents",
  components: {
    TeamProfile,
    TButton,
  },
  props: {
  },
  data () {
    return {
      event: "",
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
  }
  h2{
    color: #A9A5A5
  }
  .buttons{
    display: flex;
    justify-content: space-between;
  }
</style>
