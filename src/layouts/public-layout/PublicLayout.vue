<template>
  <v-main>
    <PublicLayoutHeader/>
    <slot></slot>
    <PublicLayoutFooter/>
  </v-main>
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
