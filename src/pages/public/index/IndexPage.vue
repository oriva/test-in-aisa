<template>
  <v-container>
    <div>
      <template>
        <v-carousel>
          <v-carousel-item
              v-for="(item,i) in items"
              :key="i"
              :src="item.picture"
              reverse-transition="fade-transition"
              transition="fade-transition"
          >
            <div class="display-3 text-center" style="background: rgba(0,0,0,0.4);">
              {{ item.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </template>
    </div>
  </v-container>
</template>
<script>
export default {
  name: 'IndexPage',
  metaInfo: {
    title: 'Главная страница',
  },
  data() {
    return {
      items: [],
    }
  },
  created() {
    this.$store.dispatch('setJsonCatalog', 'https://next.json-generator.com/api/json/get/4Jq5woxat').then(() => {
      this.items = this.$store.getters.catalogSlider
    })
  },
}
</script>