import axios from '../plugins/axios'
import {INIT, DEL, SET_POPUP_URL, SET_IS_POPUP, SET_SEARCH} from '../store/mutation-types'

export const state = () => ({
  gallery: [{
    id: '',
    user_id: '',
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
  del ({commit}, {photoId, photoUserId}) {
    var __t = null
    if (localStorage.getItem('__t')) {
      __t = localStorage.getItem('__t')
    }
    if (photoUserId) {
      return axios.delete(`/api/delete/${photoId}/${photoUserId}`, {headers: {'Authorization': __t}}).then(() => {
        commit(DEL, photoId)
      })
    } else {
      return axios.delete(`/api/delete/${photoId}`, {headers: {'Authorization': __t}}).then(() => {
        commit(DEL, photoId)
      })
    }
  }
}
