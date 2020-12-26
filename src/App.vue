<template>
  <v-app>
    <PublicLayout :current="$route.meta.layout">
      <router-view></router-view>
    </PublicLayout>
  </v-app>
</template>

<script>
import PublicLayout from "@/layouts/public-layout/";

export default {
  name: 'App',

  components: {
    PublicLayout
  },

  data: () => ({
    //
  }),
  PublicLayout,
};
</script>
