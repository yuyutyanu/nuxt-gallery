export const state = () => ({
  atUploaded: '',
  gallery: []
})

export const mutations = {
  init (state, payload) {
    state.atUploaded = '2000/11/11' // = payload
    // state.gallery.push({})
  }
}
