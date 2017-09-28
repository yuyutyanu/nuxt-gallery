<template>
  <div>
    <link rel="stylesheet" href="/reset.css">
    <nuxt/>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {SET_ID} from '../store/mutation-types'
  import jwt from 'jsonwebtoken'

  export default {
    mounted () {
      if (localStorage.getItem('__t')) {
        this[SET_ID](jwt.decode(localStorage.getItem('__t')).id)
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