import axios from 'axios'
import {INIT, DEL} from '../store/mutation-types'

export const state = () => ({
  gallery: [{
    id: '',
    uploadedAt: '',
    url: ''
  }]
})

export const mutations = {
  [INIT] (state, payload) {
    state.gallery = payload
  },
  [DEL] (state, payload) {
    return new Promise((resolve, reject) => {
      state.gallery.forEach((photo, index) => {
        if (photo.id === Number(payload)) state.gallery.splice(index, 1)
      })
      resolve()
    })
  }
}

export const actions = {
  del ({commit}, id) {
    return axios.delete(`/api/delete/${id}`).then(() => {
      commit(DEL, id)
    })
  }
}
