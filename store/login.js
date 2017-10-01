import axios from '../plugins/axios'
import {SET_IS_LOGIN} from '../store/mutation-types'

export const state = () => ({
  isLogin: false
})

export const mutations = {
  [SET_IS_LOGIN] (state, payload) {
    state.isLogin = payload
  }
}

export const actions = {
  login ({state}, {email, password}) {
    return axios.post('/api/login', {
      email: email,
      password: password
    })
  }
}
