<template>
  <div class="regist-form-wrap">
    <!--
      配置From 表单验证：
      1.必须给 el-from 组件绑定 model为表单数据对象
      2.给需要验证的表单项 el-from-item 绑定prop属性
      3.给 el-from 绑定 rule

      手动触发表单验证
      1.给 el-from 设置ref 起个名字 不重复即可
      2. 通过 ref 获取 el-from 组件，调用组件 的validate 进行验证
    -->
      <el-form
        class="regist-form"
        ref="registForm"
        :model="user"
        label-width="80px"
        :rules="registForm"
        label-position="right"
      >
        <el-form-item label="用户" prop="username">
          <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="user.email " placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="user.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="user.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="userStatus">
          <el-radio-group v-model="user.userStatus">
            <el-radio label="0">普通用户</el-radio>
            <el-radio label="1">自媒体用户</el-radio>
            <!-- <el-radio label="2">管理员用户</el-radio> -->
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item prop="agree" text-align=left>
          <el-checkbox v-model="user.agree"
            >我已阅读并同意用户协议和隐私条款</el-checkbox
          >
        </el-form-item> -->
        <el-form-item>
          <el-button
            class="regist-btn"
            type="primary"
            @click="onRegist"
            :loading="registLoading"
          >注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import { regist } from '@/api/user'
export default {
  name: 'RegistIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        // email: 'test01@google.com', // 邮箱
        // phone: '13911111111', // 手机号
        // username: 'test01', // 用户名
        // password: '123456', // 验证码
        // userStatus: '0'// 用户身份
        email: '', // 邮箱
        phone: '', // 手机号
        username: '', // 用户名
        password: '', // 验证码
        userStatus: ''// 用户身份
        // agree: false // 是否同意协议
      },
      // checked: false, // 是否同意协议的选中状态
      registLoading: false, // 注册的 loading 状态
      registForm: { // 表单验证规则配置
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的格式', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' }
        ], // 手机号
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ], // 验证码
        userStatus: [
          { required: true, message: '请选择用户身份', trigger: 'change' }
        ]
        // agree: [
        //   {
        //     // 自定义校验规则
        //     // 返回 布尔值
        //     // 验证通过 callback()
        //     // 验证失败 callback(new Error("错误消息"))
        //     validator: (rule, value, callback) => {
        //       // value 是 是否选中
        //       if (value) {
        //         callback()
        //       } else {
        //         callback(new Error('请勾选用户协议'))
        //       }
        //     },
        //     // message: '请勾选用户协议',
        //     trigger: 'change'
        //   }
        // ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onRegist () {
      // 获取数据
      // const user = this.user

      // 表单验证
      this.$refs.registForm.validate(valid => {
        if (!valid) { // 如果 验证没有通过
          return
        }

        // 验证通过 请求登录
        this.regist()
      })
    },

    regist () {
      // 开启登录按钮
      this.registLoading = true

      regist(this.user).then(res => {
        // 处理后端响应结果  成功
        console.log("注册信息返回：" + res.data)
        if(res.data.message == "信息已存在"){
          this.$message.error('信息已存在，请重新注册')
        }else{
             this.$message({
          message: '注册成功',
          type: 'success'
        })
           this.$router.push({
          name: 'login'
        })
        }
     

        // 关闭注册按钮
        this.registLoading = false

      }).catch(err => {
        // 处理后端响应结果 失败
        console.log('注册失败', err)

        this.$message.error('注册失败')

        // 关闭注册按钮
        this.registLoading = false
      })
    }
  }
}
</script>

<style scoped lang="less">
.regist-form-wrap {
    min-width: 300px;
    padding: 30px 40px 10px 10px;
    background-color: #fff;
    .regist-form {
      .regist-btn {
        width: 100%;
      }
    }
  }
</style>
