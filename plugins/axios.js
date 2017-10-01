import axios from 'axios'

let options = {}
options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`

export default axios.create(options)
