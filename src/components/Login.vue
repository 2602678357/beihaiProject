<template>
  <div>
    用户名:<input type="text" v-model="loginForm.username" placeholder="请输入用户名"/>
    <br><br>
    密码： <input type="password" v-model="loginForm.password" placeholder="请输入密码"/>
    <br><br>
    <button v-on:click="login">登录</button>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      responseResult: []
    }
  },
  methods: {
    login () {
      this.$axios
        .post('/login', {
          username: this.loginForm.username,
          password: this.loginForm.password
        })
        .then(_code => {
          console.log(_code)
          if (_code.data.code === 200) {
            console.log('成功')
            this.$router.replace({path: '/index'})
          } else {
            alert('用户名或密码错误')
          }
        })
        .catch(failResponse => {
        })
    }
  }
}
</script>
