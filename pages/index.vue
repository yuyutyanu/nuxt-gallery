<template>
    <div>
        <div class="container">
            <el-row>
                <el-col :span="8" v-for="(o,index) in 10" :key="o" class="colomn">
                    <el-card class="card" :body-style="{ padding: '0px' }">
                        <img :src="fake_images[index].image" class="card-image">
                        <div style="padding: 14px;">
                            <span>Yummy hamburger</span>
                            <div class="bottom">
                                <time class="time">{{ currentDate }}</time>
                                <el-button type="text" class="button">Delete</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <router-link to="/uploader" class="to_uploader">
            <el-button>>></el-button>
        </router-link>
    </div>
</template>

<script>
  import faker from 'faker'

  export default {
    data () {
      return {
        currentDate: new Date()
      }
    },
    asyncData () {
      const images = []
      for (var i = 0; i < 10; i++) {
        images.push({'image': faker.image.image()})
      }
      return {fake_images: images}
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
        display: block;
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

