<template>
    <div>
        <input
            :id="id"
            type="file"
            v-show='false'
            @input="onChange"
        />
        <label :for="id"></label>
    </div>
</template>
<script>
export default {
    name:'FileField',
    data() {
        return {
        files: this.files
        };
    },
    props: {
        id: String
    },
    methods: {
        onChange(event) {
            this.$emit('onChangeFile', event.target.files[0]);
        }
    }
}
</script>

<style lang="scss" scoped>
div {
  position: relative;
}
label[for='playerphoto'] {
  background-image: url(../assets/icons/input_text.svg);
  background-repeat: no-repeat;
  background-position: center center;
  background-color: #fff;
  padding: 0px 0px 0px 0px;
  border: 1px dashed #ccc;
  border-radius: 50%;
  width: 9vw;
  min-width: 9vw;
  height: 9vw;
  max-height: 9vw;
  position: absolute;
  top: -20px !important;
  left: 16px !important;
  cursor: pointer;
  z-index: 1;
}
/*input[type="file"]{
    display:none
}*/
</style>
