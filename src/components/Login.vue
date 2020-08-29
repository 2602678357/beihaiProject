<template>
  <body id="poster">
  <el-form class="login-container" status-icon :rules="rules2" :model="loginForm" ref="loginForm" label-position="left" label-width="0px">
    <h3 class="login_title" id="title" ref="title"> 系统登录</h3>
    <el-form-item prop="username">
      <el-input type="text"  v-model="loginForm.username" autocomplete="off"
                placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" autocomplete="off"
                placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item prop="email">
      <el-input type="email" v-show="hiddenemail" v-model="loginForm.email" autocomplete="off"
                placeholder="邮箱"></el-input>
    </el-form-item>
    <el-form-item prop="phone">
      <el-input type="phone" v-show="hiddenphone" v-model="loginForm.phone" autocomplete="off"
                placeholder="电话"></el-input>
    </el-form-item>
    <el-form-item prop="name">
      <el-input type="name" v-show="hiddenname" v-model="loginForm.name" autocomplete="off"
                placeholder="真实姓名"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%;">
      <el-button type="submit" style="width:40%;background:#505458;border:none"
                 @click="login()">登录</el-button>
      <el-button type="primary" style="width:40%;background:#505458;border:none"
                 @click="register('loginForm')">注册</el-button>
    </el-form-item>
    </el-form>
  </body>
</template>

<script>
import { isvaildPhone, isvalidEmail } from '@/validate.js'
// import $ from 'jquery'
export default {
  inject: ['reload'],
  name: 'Login',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      // } else if (!isvalidPass(value)) {
      //   callback(new Error('密码以字母开头 长度在8~18之间 只能包含字母、数字和下划线'))
      } else {
        callback()
      }
    }
    var validateUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        // callback(new Error('请输入手机号'))
      } else if (!isvaildPhone(value)) {
        callback(new Error('手机号输入不合法'))
      } else {
        callback()
      }
    }
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        // callback(new Error('请输入邮箱'))
      } else if (!isvalidEmail(value)) {
        callback(new Error('邮箱输入不合法'))
      } else {
        callback()
      }
    }
    var validatename = (rule, value, callback) => {
      if (value === '') {
        // callback(new Error('真实姓名'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        email: '',
        phone: '',
        name: ''
      },
      hiddenemail: false,
      hiddenphone: false,
      hiddenname: false,
      rules2: {
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        username: [
          { required: true, validator: validateUserName, trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        email: [
          { required: true, validator: validateEmail, trigger: 'blur' }
        ],
        name: [
          { required: true, validator: validatename, trigger: 'blur' }
        ]
      },
      responseResult: []
    }
  },
  methods: {
    register (formName) {
      this.$refs.title.innerHTML = '用户注册'
      this.hiddenemail = true
      this.hiddenphone = true
      this.hiddenname = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post('/addUser', {
              username: this.loginForm.username,
              password: this.loginForm.password,
              email: this.loginForm.email,
              phone: this.loginForm.phone,
              name: this.loginForm.name
            })
            .then(_code => {
              console.log(_code)
              if (_code.data.code === 200) {
                alert('注册成功')
                this.reload()
              } else {
                alert('用户名或密码错误')
              }
            })
            .catch(failResponse => {
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //  this.$store.commit('login', this.loginForm)
    //  var path = this.$route.query.redirect
    //  this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
    login () {
      this.$refs.title.innerHTML = '用户登录'
      this.hiddenemail = false
      this.hiddenname = false
      this.hiddenphone = false
      this.$axios.post('/login', {
        username: this.loginForm.username,
        password: this.loginForm.password
      }).then(_code => {
        console.log(_code)
        alert('登录成功')
        this.$store.commit('login', this.loginForm)
        var path = this.$route.query.redirect
        this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
      }).catch(failResponse => {
      })
    }
  }
}
</script>
<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  #poster {
    margin-top: 0%;
    background:url("../assets/banner.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
  }
</style>
