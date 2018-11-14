<template>
  <q-layout class="tcpos-layout" view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
      >
        <q-toolbar-title>
          T C P O S
          <div slot="subtitle">Cash register running on Quasar v{{ $q.version }}</div>
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          @click="rightDrawerOpen = !rightDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      side="right"
      v-model="rightDrawerOpen"
      :content-class="'ticket-drawer'"
    >
    <q-resize-observable @resize="onResize" />
      <q-list class="ticket-items"
        ref="tiket"
        no-border
        highlight="true"
        separator="true"
      >
      <div class="header" ref="header">
        <q-list-header>Tiket</q-list-header>
      </div>
      <q-scroll-area :style="{height: dimensions.h +'px'}" class="scroll-area" >
        <q-item v-for="(v, k) in tikets" :key="k">
          <q-item-side class="image-box"><img :alt="v.name" :src="v.image"></q-item-side>
          <q-item-main :label="v.title" :sublabel="v.price.toFixed(2)" />
          <!--
          <q-item-side>
            <q-btn flat round icon="delete" @click="$store.commit('tiket/removeItem', k)"/>
          </q-item-side>
          -->
        </q-item>
       </q-scroll-area>
      <div class="total"  ref="total">
        <q-item-separator />
        <q-item>
          <q-item-main label="totale" :sublabel="parseFloat(total).toFixed(2)" />
        </q-item>
      </div>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
export default {
  name: 'MyLayout',
  data () {
    return {
      rightDrawerOpen: this.$q.platform.is.desktop,
      dimensions: {h: 100}
    }
  },
  computed: {
    tikets: {
      get () {
        return this.$store.state.tiket.tikets
      }
    },
    total: function() {
      let t = 0.0
      this.tikets.map(item => {
        t += parseFloat(item.price)
      })
      return t
    }
  },
  mounted () {
    console.log(this.tikets)
    this.calcDimensions({width: 0, height: this.$refs.tiket.$el.parentNode.clientHeight})
  },
  methods: {
    openURL,
    calcDimensions (size) {
      console.log(this.$refs.header.clientHeight)
      console.log(this.$refs.total.clientHeight)
      this.dimensions.h = size.height - this.$refs.header.clientHeight - this.$refs.total.clientHeight - 10
    },
    onResize (size) {
      console.log(size)
      this.calcDimensions(size)
    }
  }
}
</script>

<style lang="stylus">
.tcpos-layout
  .ticket-drawer
    border-left 1px solid #ccc
    .ticket-items
      padding 0
      .header
        margin 0
        padding 0
        border-bottom 1px solid #ccc
      .scroll-area
        margin 0
        padding 0
        .image-box
          min-width 60px
          text-align center
          img
            max-height 50px
            width auto
      .total
        margin 0
        padding 0
</style>
