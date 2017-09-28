import {SET_EMAIL, SET_PASSWORD, SET_ID, CLEAR} from '../store/mutation-types'

export const state = () => ({
  email: '',
  password: '',
  id: ''
})

export const mutations = {
  [SET_EMAIL] (state, payload) {
    state.email = payload
  },
  [SET_PASSWORD] (state, payload) {
    state.password = payload
  },
  [SET_ID] (state, payload) {
    state.id = payload
  },
  [CLEAR] (state) {
    state.email = ''
    state.password = ''
  }
}
