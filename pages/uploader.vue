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
                    <el-input placeholder="photography title" @input="setPhotoTitle"></el-input>
                </div>

                <el-button @click="notify">File upload</el-button>
            </div>
        </div>
        <router-link to="/" class="to_home"><el-button><icon class="el-icon-arrow-left"></icon></el-button></router-link>
    </div>
</template>

<script>
  export default {
    computed: {
      url () {
        return this.$store.state.uploader.url
      }
    },
    methods: {
      preview (e) {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onloadend = (e) => {
          this.setUrl(reader.result)
        }
        if (file) {
          reader.readAsDataURL(file)
        }
      },
      upload () {
        // const r =  await axios.post(api end point)
        // r.then(this.notify('success'))
        // r.catch(this.notify('failed')
      },
      notify () {
        this.$notify({
          title: 'Success',
          message: 'アップロードしました',
          type: 'success'
        })
      },
      setPhotoTitle (e) {
        this.$store.commit('uploader/setPhotoTitle', e)
      },
      setUrl (url) {
        this.$store.commit('uploader/setUrl', url)
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
    .uploader{
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
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

    .photo{
        width: 100%;
        height: 100%;
        margin: 0 auto;
        margin-bottom: 50px;
        z-index: 999;
    }

    .photo img {
        height: 100%;
        width: 100%;
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
