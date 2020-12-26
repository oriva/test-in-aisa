<template>
  <v-toolbar color="indigo" dark fixed app>
    <v-toolbar-side-icon
        @click.stop="drawer = !drawer;"
    ></v-toolbar-side-icon>
    <v-toolbar-title>Тестовое задание AISA</v-toolbar-title>
  </v-toolbar>
</template>
<script>
export default {
  name: 'PublicLayoutHeader'
}
</script>
