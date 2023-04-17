<template>
  <img class="ion-icon" :src="path" :alt="name" />
</template>

<script>
export default {
  name: "IonIcon",
  props: {
    name: String
  },
  computed: {
    path() {
      return require(`ionicons/dist/svg/${this.name}.svg`)
    }
  }
}
</script>

<style>
.ion-icon {
  filter: invert(84%) sepia(11%) saturate(253%) hue-rotate(189deg) brightness(86%) contrast(92%);
  width: 25px !important;
  height: 25px !important;
}
</style>