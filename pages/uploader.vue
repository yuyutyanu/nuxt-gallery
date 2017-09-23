<template>
    <div>
        <div class="container">
            <div class="uploader">
                <label class="upload-file">
                    <h1>+</h1>
                    <div class="photo">
                        <img :src="url" alt="">
                    </div>
                    <input type="file" @change="preview">
                </label>
                <div class="photo-title">
                    <el-input placeholder="photography title" v-model="title"></el-input>
                </div>

                <el-button @click="upload">File upload</el-button>
            </div>
        </div>
        <nuxt-link to="/" class="to_home">
            <el-button>
                <icon class="el-icon-arrow-left"></icon>
            </el-button>
        </nuxt-link>
    </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import {SET_URL, SET_TITLE} from '../store/mutation-types'

  const notifyOption = {
    'sucess': {
      title: 'Success',
      message: 'アップロードしました',
      type: 'success',
      duration: 2000
    },
    'error': {
      title: 'Error',
      message: 'アップロードに失敗しました。jpg/png画像でもう一度やり直してください',
      type: 'error',
      duration: 2000
    }
  }

  export default {
    computed: {
      url () {
        return this.$store.state.uploader.url
      },
      title: {
        get () {
          return this.$store.state.uploader.title
        },
        set (value) {
          this.$store.commit(`uploader/${SET_TITLE}`, value)
        }
      }
    },
    methods: {
      ...mapActions({
        up: 'uploader/upload'
      }),
      preview (e) {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
          this.setUrl(reader.result)
        }
        if (file) reader.readAsDataURL(file)
        e.target.value = null
      },
      upload () {
        this.up().then(() => {
          this.$notify(notifyOption.sucess)
        }).catch(() => {
          this.$notify(notifyOption.error)
        })
      },
      setUrl (url) {
        this.$store.commit(`uploader/${SET_URL}`, url)
      }
    }
  }
</script>

<style>
    .container {
        width: 960px;
        margin: 0 auto;
        padding: 20px;
        text-align: center;
    }

    .uploader {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .upload-file {
        height: 550px;
        width: 800px;
        border: solid 1px #bfcbd9;
        display: block;
        margin: 40px auto;
        border-radius: 3px;
        position: relative;
    }

    .upload-file:hover {
        border: solid 1px #8391a5;
    }

    .upload-file h1 {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: -1;
    }

    .upload-file input {
        display: none;
    }

    .photo {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        margin-bottom: 50px;
        z-index: 999;
    }

    .photo img {
        height: 100%;
        width: 100%;
        object-fit: contain;
    }

    .photo-title {
        width: 50%;
        margin: 20px auto;
        text-align: center;
    }

    .photo-title input {
        text-align: center;
    }

    .to_home {
        position: fixed;
        top: 50%;
        left: 20px;
        text-decoration: none;
        color: gray;
        background: #fff;
    }

    .to_home:hover {
        color: black;
    }
</style>
