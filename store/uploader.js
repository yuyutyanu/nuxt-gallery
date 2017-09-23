import axios from 'axios'
import {SET_URL, SET_TITLE, CLEAR} from '../store/mutation-types'

export const state = () => ({
  title: '',
  url: ''
})

export const mutations = {
  [SET_URL] (state, payload) {
    state.url = payload
  },
  [SET_TITLE] (state, payload) {
    state.title = payload
  },
  [CLEAR] (state) {
    state.url = ''
    state.title = ''
  }
}

export const actions = {
  upload ({ commit, state }) {
    return axios.post('/api/create', {
      title: state.title,
      url: state.url
    }).then(() => {
      commit(CLEAR)
    })
  }
}
