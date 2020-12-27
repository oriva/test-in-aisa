<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs12 sm4 pa-6
              v-for="(item, i) in catalog"
              :key="i">
        <v-card>
          {{ item.title }}
          <v-img
              :src="item.picture"
          ></v-img>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: 'CatalogPage',
  data() {
    return {
      catalog: []
    }
  },
  created() {
    this.$store.dispatch('setJsonCatalog', 'https://next.json-generator.com/api/json/get/4Jq5woxat').then(() => {
      this.catalog = this.$store.getters.catalog;
    })
  }
}
</script>