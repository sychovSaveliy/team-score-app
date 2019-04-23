<template>
  <div class="prototype">
    {{ text }}
    <TButton :view="'disable'" :text="'hello'" ></TButton>
  </div>
</template>

<script>
import TButton from "@/components/TButton";
export default {
  name: "Prototype1",
  components: {
    TButton,
  },
  data() {
    return {
      text: "Example text prototype 1",
      buttonTheme: 'active',
    };
  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>
.prototype {
  font-size: 24px;
}

.btn {
  font-size: 24px;
  padding: 5px;
}
</style>
