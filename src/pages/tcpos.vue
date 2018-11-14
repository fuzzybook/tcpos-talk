<template>
  <q-page class="tcpos-page flex flex-center">
    <div class="column">
      <div class="row justify-between buttons">
        <q-btn v-for="(v, k) in buttons" :key="k" @click="$store.commit('tiket/addItem', v)" >
        <img :alt="v.name" :src="v.image">
      </q-btn>
      </div>
      <div class="logo-box flex flex-center">
        <img alt="Tcpos logo" src="~assets/logo-tcpos.jpg">
      </div>
    </div>
  </q-page>
</template>

<style lang="stylus">
.tcpos-page
  .buttons
    .q-btn
      min-width 90px
      margin 1rem
    img
      max-height 60px
  .logo-box
    margin 1rem
    img
      max-width 30vw
      height auto
</style>

<script>
import buttons from '../data/buttons.js'
export default {
  name: 'PageTcpos',
  data () {
    return {
      buttons: buttons
    }
  }
}
</script>
