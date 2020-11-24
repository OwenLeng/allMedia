<template>
  <div class="login-form-wrap">
    <el-form
      class="login-form"
      ref="loginForm"
      :model="user"
      label-width="70px"
      :rules="loginForm"
    >
      <el-form-item label="账号" prop="username">
        <el-input v-model="user.username" placeholder="请输入手机号或者邮箱"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="user.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="身份" prop="userStatus">
        <el-radio-group v-model="user.userStatus">
          <el-radio label="0">普通用户</el-radio>
          <el-radio label="1">自媒体用户</el-radio>
          <el-radio label="2">管理员用户</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="验证码" prop="vcode">
        <el-col :span="17">
          <el-input type="text" placeholder="请输入验证码" v-model="user.vcode">
          </el-input>
         </el-col>
        <VCode  :identifyCode="identifyCode"/>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          @click="onLogin"
          :loading="loginLoading"
        >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
import VCode from '@/views/vcode'
export default {
  name: 'LoginIndex',
  components: {
    VCode
  },
  props: {},
  data () {
    return {
      user: {
        username: '', // 手机号
        password: '', // 密码
        userStatus: '0', // 用户身份
        vcode: ''
      },
      loginLoading: false, // 登录的 loading 状态
      identifyCode: '', // 校验码
      identifyCodes: '1234567890abcdefjhijklinopqrsduvwxyz',
      loginForm: {
        username: [
          { required: true, message: '请输入邮箱或手机号', trigger: 'change' }
        ], // 手机号
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ], // 验证码
        userStatus: [
          { required: true, message: '请选择用户身份', trigger: 'change' }
        ],
        vcode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              // value 是 是否选中
              if (value.toLowerCase() === this.identifyCode.toLowerCase()) {
                callback()
              } else {
                this.refreshCode()
                callback(new Error('请填写正确验证码'))
              }
            },
            // message: '请勾选用户协议',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    // 初始化验证码
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  methods: {
    // 验证码
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
    },
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },

    // 登录
    onLogin () {
      // 获取表单数据
      // const user = this.user

      // 表单验证
      this.$refs.loginForm.validate(valid => {
        if (!valid) {
          return
        }

        // 验证通过
        this.login()
      })
    },

    // 登录
     login () {
      // 开启登录按钮
      this.loginLoading = true
      login(this.user).then(res => {
        // 处理后端响应结果
        
        // 关闭loading 状态
        this.loginLoading = false
        // 将接口返回的用户相关数据放到本地存储，方便应用数据共享
        // 本地存储只能存储字符串
        // 如果需要存储对象、数组类型的数据，则把他们转为 JSON 格式字符串进行存储
        if (!res.data) { 

        this.$message.error('登录失败')
           this.$router.push("/login")
        }else{
          this.$message({
          message: '登录成功',
          type: 'success'
        })
          let user = res.data
          user.password = this.user.password
          // console.log("user:" + JSON.stringify(user))

          window.localStorage.setItem('user', JSON.stringify(user))
        // 跳转到首页
        // this.$router.push('/')
        // console.log("userStatus:" + this.user.userStatus)
        if(this.user.userStatus == "0"){
          
            location.href = 'http://223.3.72.70:8080/?id=' + user.id + '&username=' + user.username + '&headPortrait=' + user.headPortrait
            // this.$router.push('http://223.3.72.70:8080/?id=' + this.user.id)
        }else{
              this.$router.push({
              name: 'home'
        })
        }
        
        }
        
      }).catch(err => {
        // 处理后端响应结果
        // console.log('登录失败')
        // console.log(err)
        // 输出提示消息
        this.$message.error('登录失败')
        // 关闭loading 状态
        this.loginLoading = false
      })
    }
  }
}
</script>

<style scoped lang="less">
  .login-form-wrap {
    min-width: 300px;
    padding: 30px 40px 10px 10px;
    background-color: #fff;
    .login-form {
      .login-btn {
        width: 100%;
      }
    }
  }
</style>
