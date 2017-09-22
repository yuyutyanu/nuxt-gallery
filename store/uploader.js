export const state = () => ({
  photoTitle: '',
  url: ''
})

export const mutations = {
  setUrl (state, payload) {
    state.url = payload
  },
  setPhotoTitle (state, payload) {
    state.photoTitle = payload
  }
}
