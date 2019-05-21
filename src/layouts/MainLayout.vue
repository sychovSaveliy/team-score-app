<template>
  <main class="main">
    <div class="content">
        <slot></slot>
    </div>
    <Nav/>
  </main>
</template>

<script>
import Nav from "@/components/Nav";
export default {
  name: "MainLayout",
  components: {
    Nav
  }
};
</script>

<style lang="scss">
.main{
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  height: 100%;
  background-color: #FCFCFC;
}
.content{
  flex-grow: 1;
}
.section{
  padding: 10px;
}
</style>