<template>
    <div>
        <div class="container">
            <el-row>
                <el-col :span="8" v-for="photo in $store.state.gallery" :key="photo" class="colomn">
                    <el-card class="card" :body-style="{ padding: '0px' }">
                        <img :src="photo.url" class="card-image">
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
    </div>
</template>

<script>
  import axios from 'axios'
  import { mapActions } from 'vuex'
  import {INIT} from '../store/mutation-types'

  const notifyOption = {
    'sucess': {
      title: 'Success',
      message: '削除しました',
      type: 'success',
      duration: 2000
    },
    'error': {
      title: 'Error',
      message: '削除に失敗しました。もう一度削除してください',
      type: 'error',
      duration: 2000
    }
  }

  export default {
    async fetch ({store}) {
      const result = await axios.get('/api/index')
      store.commit(INIT, result.data)
    },
    methods: {
      ...mapActions({
        d: 'del'
      }),
      del (id) {
        this.d(id).then(() => {
          this.$notify(notifyOption.sucess)
        }).catch(e => {
          this.$notify(notifyOption.error)
        })
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
</style>

