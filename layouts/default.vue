<template>
  <div>
    <link rel="stylesheet" href="/reset.css">
    <nuxt/>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {SET_ID} from '../store/mutation-types'

  export default {
    mounted () {
      if (window.localStorage) {
        this[SET_ID](localStorage.getItem('token'))
      }
    },
    methods: {
      ...mapMutations({
        [SET_ID]: `auth/${SET_ID}`
      })
    }
  }
</script>

<style>
  body{
  font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
    word-spacing: 0.05em;
  }
</style>