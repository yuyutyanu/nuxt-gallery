<template>
    <div>
        <el-form class="auth-form">
            <el-form-item>
                <el-input type="text" auto-complete="off" placeholder="id" v-model="email"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="password" auto-complete="off" placeholder="password" v-model="password"></el-input>
            </el-form-item>

            <el-form-item style="text-align: right">
                <el-button v-if="isLogin" @click="login">Login</el-button>
                <el-button v-if="isRegister" @click="register">Register</el-button>
            </el-form-item>
            <nuxt-link to="/register" class="to_register" v-if="isLogin">
                <p>登録されていない方はこちらから</p>
            </nuxt-link>

            <nuxt-link to="/login" class="to_login" v-if="isRegister">
                <p>登録済みの方はこちらから</p>
            </nuxt-link>
        </el-form>
        <nuxt-link to="/" class="to_index">
            <el-button>
                <i class="el-icon-arrow-right"></i>
            </el-button>
        </nuxt-link>
    </div>
</template>
<script>
  import {mapActions, mapMutations} from 'vuex'
  import {SET_IS_LOGIN, SET_IS_REGISTER, SET_EMAIL, SET_PASSWORD, SET_ID, CLEAR} from '../store/mutation-types'
  import jwt from 'jsonwebtoken'
  import {loginNotifyOption, registerNotifyOption} from '../plugins/element-ui.notify.option'

  export default{
    props: ['type'],
    computed: {
      isLogin () {
        return this.$store.state.login.isLogin
      },
      isRegister () {
        return this.$store.state.register.isRegister
      },
      email: {
        get () {
          return this.$store.state.auth.email
        },
        set (value) {
          this[SET_EMAIL](value)
        }
      },
      password: {
        get () {
          return this.$store.state.auth.password
        },
        set (value) {
          this[SET_PASSWORD](value)
        }
      }
    },
    created () {
      if (this.type === 'login') {
        this[SET_IS_REGISTER](false)
        this[SET_IS_LOGIN](true)
      }
      if (this.type === 'register') {
        this[SET_IS_LOGIN](false)
        this[SET_IS_REGISTER](true)
      }
    },
    methods: {
      ...mapActions({
        Login: 'login/login',
        Register: 'register/register'
      }),
      ...mapMutations({
        [SET_IS_LOGIN]: `login/${SET_IS_LOGIN}`,
        [SET_IS_REGISTER]: `register/${SET_IS_REGISTER}`,
        [SET_EMAIL]: `auth/${SET_EMAIL}`,
        [SET_PASSWORD]: `auth/${SET_PASSWORD}`,
        [SET_ID]: `auth/${SET_ID}`,
        [CLEAR]: `auth/${CLEAR}`
      }),
      login () {
        this.Login({email: this.email, password: this.password}).then((obj) => {
          if (obj.data.error) throw new Error()
          this.clear()
          this.setToken(obj)
          this.$notify(loginNotifyOption.sucess)
          setTimeout(() => {
            location.href = '/'
          }, 1000)
        }).catch(() => {
          this.$notify(loginNotifyOption.error)
        })
      },
      register () {
        this.Register({email: this.email, password: this.password}).then((obj) => {
          if (obj.data.error) throw new Error()
          this.clear()
          this.setToken(obj)
          this.$notify(registerNotifyOption.sucess)
          setTimeout(() => {
            location.href = '/'
          }, 1000)
        }).catch((e) => {
          this.$notify(registerNotifyOption.error)
        })
      },
      clear () {
        this[CLEAR]()
      },
      setToken (obj) {
        localStorage.setItem('__t', obj.data)
        const token = jwt.decode(obj.data)
        this[SET_ID](token.id)
      }
    }
  }
</script>

<style scoped>
    .auth-form {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 30%;
        border: 1px solid #bfcbd9;
        padding: 60px;
        border-radius: 3px;
    }

    .to_register {
        text-decoration: none;
        font-size: 14px;
        color: #1f2d3d;
        display: block;
    }

    .to_login {
        text-decoration: none;
        font-size: 14px;
        color: #1f2d3d;
        display: block;
    }

    .to_index {
        position: fixed;
        top: 50%;
        right: 20px;
        text-decoration: none;
    }
</style>