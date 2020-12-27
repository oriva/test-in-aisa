<template>
  <v-app id="inspire">
    <PublicLayoutHeader/>
    <v-main>
      <slot></slot>
    </v-main>
    <PublicLayoutFooter/>
  </v-app>
</template>
<script>
import PublicLayoutHeader from './header/'
import PublicLayoutFooter from './footer/'

export default {
  name: 'PublicLayout',
  components: {
    PublicLayoutHeader,
    PublicLayoutFooter
  }
}
</script>
