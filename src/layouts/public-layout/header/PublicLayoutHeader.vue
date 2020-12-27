<template>
  <div>
    <v-navigation-drawer
        v-model="drawer"
        fixed
        bottom
        temporary
    >
      <v-list
          nav
          dense
      >
        <v-list-item-group>
          <v-list-item
              to="/"
          >
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Главная</v-list-item-title>
          </v-list-item>

          <v-list-item to="/catalog/">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Каталог</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
        app
        fixed
    >
      <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Тестовое задание AISA</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-switch
          label="Night mode"
          v-model="isThemeDark"
      ></v-switch>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  name: 'PublicLayoutHeader',
  data: () => ({
    drawer: null,
    isThemeDark: JSON.parse(localStorage.getItem("isThemeDark"))
  }),
  created() {
    this.$vuetify.theme.dark = this.isThemeDark
  },
  watch: {
    isThemeDark: function () {
      localStorage.setItem("isThemeDark", this.isThemeDark)
      this.$vuetify.theme.dark = this.isThemeDark
    }
  }
}
</script>
<style lang="scss">
.v-toolbar__content {
  .v-messages {
    display: none;
  }
  .v-input__slot {
    margin-bottom: 0;
  }
}
</style>