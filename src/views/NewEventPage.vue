<template>
  <layout-without-menu>
    <section class="section">
      <h1>{{ title }}</h1>
      <Ttabs :list="tabsList" :activeTab="templateType" />
      <div>
        Дата: <Field /> 12.01.1977
        Время: 20 часов 00 минут
        Моя команда: 
        Команда Сопреник:
        Поле:
        м.Героем Днепра
      </div>
      <TButton view="fluid" @click="onAddGame" v-if="submitButtonIsVisible">Пригласить</TButton>
      <div class="submit-responce" v-if="submitResponceVisible">
        <p><b>Ваше приглашение было отправленно команде.</b></p>
        <p>Как только команда соперников примет приглаешие Новая игра появится в календаре и списке сообщений.</p>
      </div>
    </section>
  </layout-without-menu>
</template>

<script>
import LayoutWithoutMenu from "@/layouts/LayoutWithoutMenu";
import TeamProfile from "@/components/TeamProfile";
import TButton from "@common/TButton";
import Ttabs from "@/components/Ttabs";
import API from "@/services/ApiService";
export default {
  name: "NewEventPage",
  components: {
    LayoutWithoutMenu,
    TeamProfile,
    TButton,
    Ttabs,
  },
  props: {
  },
  data () {
    return {
      templateType: this.$route.params.type || 'game',
      title: this.$route.params.type == 'game' ? "Новая Игра" : "Новая Тренировка",
      tabsList: [
        { id: "game", title: "игра", to: "/event/new/game" },
        { id: "training", title: "тренировка", to: "/event/new/training" }
      ],
      submitResponceVisible: true,
      submitButtonIsVisible: true
    }
  },
  created() {
  },
  methods: {
  },
  computed: {
/*    activeFilterTitle() {
      return Object.values(this.filters)[0].title || "all"
    }*/
  },
  watch: {
    '$route' (to, from) {
      this.templateType = to.params.type;
      this.title = this.$route.params.type == 'game' ? "Новая Игра" : "Новая Тренировка";
    }
  }
};
</script>

<style lang="scss">

</style>
