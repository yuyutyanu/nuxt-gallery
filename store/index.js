import axios from 'axios'
import {INIT, DEL, SET_POPUP_URL, SET_IS_POPUP, SET_SEARCH} from '../store/mutation-types'

export const state = () => ({
  gallery: [{
    id: '',
    title: '',
    uploadedAt: '',
    url: ''
  }],
  popupUrl: '',
  isPopup: false,
  search: ''
})

export const mutations = {
  [INIT] (state, payload) {
    state.gallery = payload
    state.filterGallery = payload
  },
  [DEL] (state, payload) {
    return new Promise((resolve, reject) => {
      state.gallery.forEach((photo, index) => {
        if (photo.id === Number(payload)) state.gallery.splice(index, 1)
      })
      resolve()
    })
  },
  [SET_POPUP_URL] (state, payload) {
    state.popupUrl = payload
  },
  [SET_IS_POPUP] (state, payload) {
    state.isPopup = payload
  },
  [SET_SEARCH] (state, payload) {
    state.search = payload
  }
}

export const actions = {
  del ({commit}, id) {
    return axios.delete(`/api/delete/${id}`).then(() => {
      commit(DEL, id)
    })
  }
}
