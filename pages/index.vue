<template>
    <div>
        <div class="container">
            <el-input placeholder="search..." icon="search" class="search" @input="search"></el-input>

            <el-row>
                <el-col :span="8" v-for="photo in $store.state.filterGallery" :key="photo" class="colomn">
                    <el-card class="card" :body-style="{ padding: '0px' }">
                        <img :src="photo.url" class="card-image" @click="setPopupUrl(photo.id)">
                        <div style="padding: 14px;">
                            <span>{{photo.title}}</span>
                            <div class="bottom">
                                <time class="time">{{ photo.uploadedAt }}</time>
                                <el-button type="text" class="button" @click="del(photo.id)">Delete</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <nuxt-link to="/uploader" class="to_uploader">
            <el-button><i class="el-icon-arrow-right"></i></el-button>
        </nuxt-link>
        <transition name="fade">
            <div class="popup" v-if="$store.state.isPopup" @click="delPopup">
                <img :src="$store.state.popupUrl" alt="">
            </div>
        </transition>
    </div>
</template>

<script>
  import axios from 'axios'
  import {mapActions, mapMutations} from 'vuex'
  import {INIT, SET_POPUP_URL, SET_IS_POPUP, SEARCH} from '../store/mutation-types'
  import {deleteNotifyOption} from '../plugins/element-ui.notify.option'

  export default {
    async fetch ({store}) {
      const result = await axios.get('/api/index')
      store.commit(INIT, result.data)
    },
    methods: {
      ...mapActions({
        d: 'del'
      }),
      ...mapMutations([
        SET_POPUP_URL,
        SET_IS_POPUP,
        SEARCH
      ]),
      search (e) {
        this[SEARCH](e)
      },
      del (id) {
        this.d(id).then(() => {
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

<style>
    .container {
        width: 960px;
        margin: 0 auto;
        padding: 20px;
    }
    .search{
        width:60%;
        margin-bottom:30px;
        margin-top:30px;
    }
    .colomn {
        letter-spacing: -.4em;
        margin-right: 5%;
        margin-bottom: 20px;
        width: 30% !important;
    }

    .colomn:nth-child(3n) {
        margin: 0;
    }

    .card {
        letter-spacing: normal;
    }

    .time {
        font-size: 13px;
        color: #999;
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
        height:250px;
        display: block;
        object-fit: contain;
    }

    .to_uploader {
        position: fixed;
        top: 50%;
        right: 20px;
        text-decoration: none;
        color: gray;
        background: #fff;
    }

    .popup{
        position: fixed;
        top: 0;
        width: 100%;
        height: 100vh;
        background: rgba(255,255,255,0.8);
    }
    .popup img{
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        width:60%;
        height:60%;
        object-fit: contain;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0
    }
</style>

