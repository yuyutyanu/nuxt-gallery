import axios from 'axios'
import {SET_IS_REGISTER} from '../store/mutation-types'

export const state = () => ({
  isRegister: false,
  email: '',
  password: ''
})

export const mutations = {
  [SET_IS_REGISTER] (state, payload) {
    state.isRegister = payload
  }
}

export const actions = {
  login ({state, commit}) {
    return axios.post('/register', {
      email: state.email,
      password: state.password
    }).then((data) => {
      console.log(data)
    })
  }
}
