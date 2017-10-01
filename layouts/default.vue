<template>
  <div>
    <link rel="stylesheet" href="/reset.css">
    <nuxt/>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {SET_ID} from '../store/mutation-types'
  import axios from '../plugins/axios'
  import jwt from 'jsonwebtoken'

  export default {
    mounted () {
      // guest or login user
      if (!localStorage.getItem('__t')) {
        axios.post('/api/__t').then((__t) => {
          localStorage.setItem('__t', __t.data) // guest
        }).catch((e) => {
          console.log(e)
        })
      } else if (jwt.decode(localStorage.getItem('__t')).id) {
        this[SET_ID](jwt.decode(localStorage.getItem('__t')).id) // login user
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