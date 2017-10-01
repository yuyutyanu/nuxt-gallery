<template>
    <div>
        <div class="container">
            <div class="no_gallery" v-if="!$store.state.gallery.length"><p>No Image</p></div>
            <div class="search-box">
                <el-input placeholder="search..." icon="search" class="search" v-model="search"></el-input>
            </div>
            <el-row>
                <el-col :span="8" v-for="photo in gallery" :key="photo.id" class="colomn">
                    <el-card class="card" :body-style="{ padding: '0px' }">
                        <img :src="photo.url" class="card-image" @click="setPopupUrl(photo.id)">
                        <div style="padding: 14px;">
                            <span>{{photo.title}}</span>
                            <div class="bottom">
                                <time class="time">{{ photo.uploadedAt }}</time>
                                <el-button type="text" class="button" @click="del(photo.id, photo.user_id)" v-if="photo.user_id === null || id == photo.user_id">Delete</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <nuxt-link to="/login" class="to_login">
            <el-button><i class="el-icon-arrow-left"></i></el-button>
        </nuxt-link>
        <nuxt-link to="/uploader" class="to_uploader">
            <el-button><i class="el-icon-arrow-right"></i></el-button>
        </nuxt-link>
        <transition name="fade">
            <div class="popup" v-if="$store.state.isPopup" @click="delPopup">
                <img :src="$store.state.popupUrl" alt="">
            </div>
        </transition>
        <a href="#" class="to_me"><i class="el-icon-caret-top"></i></a>
    </div>
</template>

<script>
  import axios from '../plugins/axios'
  import {mapActions, mapMutations} from 'vuex'
  import {INIT, SET_POPUP_URL, SET_IS_POPUP, SET_SEARCH} from '../store/mutation-types'
  import {deleteNotifyOption} from '../plugins/element-ui.notify.option'

  export default {
    async fetch ({store}) {
      const result = await axios.get('/api/index')
      store.commit(INIT, result.data)
    },
    computed: {
      gallery () {
        return this.$store.state.gallery.filter((photo) => {
          return photo.title.toLowerCase().indexOf(this.$store.state.search) > -1
        })
      },
      search: {
        get () {
          return ''
        },
        set (value) {
          this[SET_SEARCH](value)
        }
      },
      id () {
        return this.$store.state.auth.id
      }
    },
    methods: {
      ...mapActions({
        Del: 'del'
      }),
      ...mapMutations([
        SET_POPUP_URL,
        SET_IS_POPUP,
        SET_SEARCH
      ]),
      del (photoId, photoUserId) {
        this.Del({photoId: photoId, photoUserId: photoUserId}).then(() => {
          this.$notify(Object.assign({}, deleteNotifyOption.sucess))
        }).catch(e => {
          this.$notify(Object.assign({}, deleteNotifyOption.error))
        })
      },
      setPopupUrl (id) {
        this.$store.state.gallery.forEach(photo => {
          if (photo.id === id) {
            this[SET_POPUP_URL](photo.url)
          }
        })
        this.setIsPopup(true)
      },
      setIsPopup (flag) {
        this[SET_IS_POPUP](flag)
      },
      delPopup () {
        this.setIsPopup(false)
      }
    }
  }
</script>

<style scoped>
    .container {
        width: 960px;
        margin: 0 auto;
        padding: 20px;
        text-align: center;
    }
    .no_gallery{
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
        border:solid 1px #bfcbd9;
        padding:250px;
        border-radius: 10px;
    }
    .no_gallery p{
        font-size:30px;
        color: #bfcbd9;
    }

    .search {
        width: 60%;
        margin-bottom: 40px;
        margin-top: 30px;
    }

    .colomn {
        letter-spacing: -.4em;
        margin-right: 5%;
        margin-bottom: 40px;
        width: 30% !important;
    }

    .colomn:nth-child(3n) {
        margin: 0;
    }

    .card {
        letter-spacing: normal;
        position: relative;
        font-size:15px;
    }

    .time {
        font-size: 13px;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .card-image {
        width: 100%;
        height: 250px;
        display: block;
        object-fit: contain;
        cursor: pointer;
    }

    .to_login {
        position: fixed;
        top: 50%;
        left: 20px;
        text-decoration: none;
    }

    .to_uploader {
        position: fixed;
        top: 50%;
        right: 20px;
        text-decoration: none;
        display: inline;
    }
    .to_me{
        position: fixed;
        bottom:20px;
        right: 70px;
        text-decoration: none;
        border-bottom:solid 1px;
        padding:15px;
        color:#1f2d3d;
        display: inline;
    }

    .popup {
        position: fixed;
        top: 0;
        width: 100%;
        height: 100vh;
        background: rgba(255, 255, 255, 0.8);
    }

    .popup img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60%;
        height: 60%;
        object-fit: contain;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0
    }
</style>

