import axios from '../plugins/axios'
import {SET_IS_REGISTER} from '../store/mutation-types'

export const state = () => ({
  isRegister: false
})

export const mutations = {
  [SET_IS_REGISTER] (state, payload) {
    state.isRegister = payload
  }
}

export const actions = {
  register ({state}, {email, password}) {
    return axios.post('/api/register', {
      email: email,
      password: password
    })
  }
}
