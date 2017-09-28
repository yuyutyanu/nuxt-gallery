import axios from 'axios'
import {SET_IS_LOGIN} from '../store/mutation-types'

export const state = () => ({
  isLogin: false,
  email: '',
  password: ''
})

export const mutations = {
  [SET_IS_LOGIN] (state, payload) {
    state.isLogin = payload
  }
}

export const actions = {
  login ({state, commit}) {
    return axios.post('/login', {
      email: state.email,
      password: state.password
    }).then((data) => {
      console.log(data)
    })
  }
}
