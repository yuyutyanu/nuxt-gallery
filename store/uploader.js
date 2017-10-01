import axios from '../plugins/axios'
import {SET_URL, SET_TITLE, CLEAR, SET_IS_VALIDATE, SET_IS_SENDING} from '../store/mutation-types'

export const state = () => ({
  title: '',
  url: '',
  isValidate: false,
  isSending: false
})

export const mutations = {
  [SET_URL] (state, payload) {
    state.url = payload
  },
  [SET_TITLE] (state, payload) {
    state.title = payload
  },
  [SET_IS_VALIDATE] (state, payload) {
    state.isValidate = payload
  },
  [SET_IS_SENDING] (state, payload) {
    state.isSending = payload
  },
  [CLEAR] (state) {
    state.url = ''
    state.title = ''
  }
}

export const actions = {
  upload ({ commit, state }) {
    var __t = ''
    if (localStorage.getItem('__t')) {
      __t = localStorage.getItem('__t')
    }

    return axios.post('/api/create', {
      title: state.title,
      url: state.url,
      __t: __t
    }, {headers: {'Authorization': __t}}).then(() => {
      commit(CLEAR)
    })
  }
}
