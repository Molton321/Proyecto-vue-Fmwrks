<script setup>
import AppMenu from './AppMenu.vue';
</script>

<template>
  <div class="layout-sidebar">
    <app-menu></app-menu>
  </div>
</template>

<style lang="scss" scoped>
.layout-sidebar {
  overflow-y: auto; // permite desplazamiento vertical
  scrollbar-width: none; // oculta barra en Firefox
  &::-webkit-scrollbar { // oculta barra en Chrome, Safari, Edge
    display: none;
  }
}
</style>
