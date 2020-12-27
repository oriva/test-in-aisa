<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs12 sm4 pa-6
              v-for="(item, i) in catalog"
              :key="i">
        <v-card>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-1">
                Brand: {{ item.brand }}
              </div>
              <v-list-item-subtitle>
                date: {{ item.created_at }}
              </v-list-item-subtitle>
              <v-list-item-title class="headline mb-1">
                {{ item.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ item.description }}
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar
                size="120"
                tile>
              <v-img
                  :src="item.picture"
              ></v-img>
            </v-list-item-avatar>
          </v-list-item>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: 'CatalogPage',
  metaInfo: {
    title: 'Каталог',
  },
  data() {
    return {
      catalog: []
    }
  },
  computed: {},
  created() {
    this.$store.dispatch('setJsonCatalog', 'https://next.json-generator.com/api/json/get/4Jq5woxat').then(() => {
      this.catalog = this.$store.getters.catalog
    })
  }
}
</script>