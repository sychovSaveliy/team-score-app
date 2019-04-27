<template>
  <div class="label" :txt="txt" :team-events="team.data.events">{{ txt }}</div>
</template>

<script>
export default {
  name: "Tlabel",
  props: {
    txt: String,
    team: {default: {data: {name: ''}}, type: Object},
  }
};
</script>

<style lang="scss" scoped>
$color: #0E72CF;

.label {
  display:inline-block;
  padding:0 12px;
  font-size: 16px;
  line-height: 27px;
  position: relative;
  text-transform:uppercase;
  height: 26px;
  text-align: center;
  color: $color;
  letter-spacing: 0.4px;
  background: #F5F5F5;
  border-radius: 20px;
}

</style>
