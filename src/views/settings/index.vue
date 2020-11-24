<template>
  <div class="settings-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/content">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <el-row class="clearfix settingContent">
        <el-col :span="15">
          <el-form ref="form" :model="user" label-width="70px">
            <el-form-item label="编号">
              {{ user.id }}
            </el-form-item>
            <el-form-item label="手机">
                   <el-input v-model="user.phone" :disabled="isPhone"></el-input>
                    <el-button type="info" @click="isPhone=false">修改</el-button>
         
             
              <!-- {{ user.phone }} -->
            </el-form-item>
            <el-form-item label="密码">
                   <el-input v-model="user.password" :disabled="isPassword" type="password"></el-input>
                    <el-button type="info" @click="isPassword=false">修改</el-button>
         
             
              <!-- {{ user.password }} -->
            </el-form-item>
            <el-form-item label="媒体名称">
              <el-input v-model="user.username" :disabled="isName"></el-input>
              <el-button type="info" @click="isName=false">修改</el-button>
            </el-form-item>
            <!-- <el-form-item label="媒体介绍">
              <el-input type="textarea" v-model="user.intro"></el-input>
            </el-form-item> -->
            <el-form-item label="邮箱">
              <el-input v-model="user.email" :disabled="isMail"></el-input>
              <el-button type="info" @click="isMail=false">修改</el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                :loading="updateProfileLoading"
                @click="onUpdateUser"
              >保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <!-- <p @click="$refs.file.click()">点击修改头像</p> -->
        <el-col :offset="2" :span="4">

          
          <label for="file">
            <el-avatar
              shape="square"
              :size="150"
              fit="cover"
              :src="user.headPortrait"
            ></el-avatar>
            <p>点击修改头像</p>
          </label>
          <input
            id="file"
            type="file"
            ref="file"
            hidden
            @change="onFileChange"
          >
        </el-col>
      </el-row>
    </el-card>

    <el-dialog
      title="修改头像"
      :visible.sync="dialogVisible"
      append-to-body
      @opened="onDialogOpened"
      @closed="onDialogClosed"
    >
      <div class="preview-image-wrap">
        <img
          class="preview-image"
          :src="previewImage"
          ref="preview-image"
        >
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="updatePhotoLoading"
          @click="onUpdatePhoto"
        >确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserProfile,
  updateUserPhoto,
  updateUserProfile
} from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import globalBus from '@/utils/global-bus'

export default {
  name: 'SettingsIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        email: '',
        id: null,
        intro: '',
        phone: '',
        username: '',
        headPortrait: ''
      }, // 用户资料
      isPhone: true,
      isName: true,
      isMail: true,
      isPassword: true,
      dialogVisible: false, // 控制上传图片裁切预览的显示状态
      previewImage: '', // 预览图片
      cropper: null, // 裁切器示例
      updatePhotoLoading: false, // 更新用户头像 loading 状态
      updateProfileLoading: false // 更新基本信息的 loading 状态
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUser()
  },
  mounted () {},
  methods: {
    onUpdateUser () {
      // 表单验证
      // 验证通过，提交表单

      // 开启 loading 状态
      this.updateProfileLoading = true
      const { id, username, phone, email, password, head_portrait } = this.user
      // updateUserProfile({
      //   id, 
      //   phone,
      //   username,
      //   password,
      //   email,
      // }, head_portrait).then(res => {
      //   this.$message({
      //     type: 'success',
      //     message: '保存成功'
      //   })
      //   // window.localStorage.setItem("user", this.user)
      //   console.log(res.data)
      //   window.localStorage.setItem("user", this.user)

      //   // 关闭 loading 状态
      //   this.updateProfileLoading = false
      //   // 更新头部当前登录用户的信息
      //   // 发布通知，用户信息已修改
      //   globalBus.$emit('update-user', this.user)
      // })
        if(!this.user.params){
            const file = this.$refs.file
            // const blobData = window.URL.createObjectURL(file.files[0])
            // this.user.headPortrait = blobData
            const params = new FormData()
            params.append('id', this.user.id)
            params.append('phone', this.user.phone)
            params.append('username', this.user.username)
            params.append('email', this.user.email)
            params.append('password', this.user.password)
            // params.append('head_portrait',  new File([""], "filename.txt"))
            //  params.append('head_portrait', file.files[0])
            this.user.params = params
        }
        updateUserProfile(this.user.params).then(res => {
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        // window.localStorage.setItem("user", this.user)
        console.log(res.data)
        window.localStorage.setItem("user", this.user)

        // 关闭 loading 状态
        this.updateProfileLoading = false
        // 更新头部当前登录用户的信息
        // 发布通知，用户信息已修改
        console.log("哭了")
        globalBus.$emit('update-user', this.user)
      })
    },
    loadUser () {
      this.user = JSON.parse(window.localStorage.getItem('user'))
      // getUserProfile().then(res => {
      //   this.user = res.data.data
      // })
    },

    // onFileChange () {
    //   // 处于图片预览
    //   const file = this.$refs.file

    //   const blobData = window.URL.createObjectURL(file.files[0])

    //   this.previewImage = blobData

    //   // 展示弹出层，预览用户选择的图片
    //   // this.dialogVisible = true

    //   // 解决选择相同文件不触发 change 事件问题
    //   this.$refs.file.value = ''
    // },
    
    onFileChange () {
      // 处于图片预览
      const file = this.$refs.file

      const blobData = window.URL.createObjectURL(file.files[0])
      this.user.headPortrait = blobData
      const params = new FormData()
      console.log("file.files[0]:" + file.files[0])
      params.append('id', this.user.id)
      params.append('phone', this.user.phone)
      params.append('username', this.user.username)
      params.append('email', this.user.email)
      params.append('password', this.user.password)
      params.append('head_portrait', file.files[0])
      this.user.params = params
      globalBus.$emit('update-user', this.user)

      this.previewImage = blobData

      // 展示弹出层，预览用户选择的图片
      // this.dialogVisible = true

      // 解决选择相同文件不触发 change 事件问题
      // this.$refs.file.value = ''
    },

    onDialogOpened () {
      // 图片裁切器必须基于 img 进行初始化
      // 注意：img 必须是可见状态才能正常完成初始化
      //       因为我们这里要在对话框里面初始化裁切器
      //       所以务必要在对话框完全打开的状态去进行初始化。
      // 获取图片 DOM 节点
      const image = this.$refs['preview-image']

      // 第1次初始化好以后，如果预览裁切的图片发生了变化，裁切器默认不会更新
      // 如果需要预览图片发生变化更新裁切器：
      //    方式一：裁切器.replace 方法
      //    方式二：销毁裁切器，重新初始化
      // 初始化裁切器
      if (this.cropper) {
        this.cropper.replace(this.previewImage)
        return
      }
      this.cropper = new Cropper(image, {
        viewMode: 1,
        dragMode: 'none',
        aspectRatio: 1,
        cropBoxResizable: false

        // 当你移动裁切器的时候会触发调用 crop 方法
        // crop (event) {
        //   console.log(event.detail.x)
        //   console.log(event.detail.y)
        //   console.log(event.detail.width)
        //   console.log(event.detail.height)
        //   console.log(event.detail.rotate)
        //   console.log(event.detail.scaleX)
        //   console.log(event.detail.scaleY)
        // }
      })
    },

    onDialogClosed () {
      // 对话框关闭，销毁裁切器
      // this.cropper.destroy()
    },

    // onUpdatePhoto () {
    //   // 让确定按钮开始 loading
    //   // this.updatePhotoLoading = true
    //   // 获取裁切的图片对象
    //   this.cropper.getCroppedCanvas().toBlob(file => {  
    //     console.log("file:" + file)
    //     const fd = new FormData()
    //     fd.append('headPortrait', file)
    //     // this.user.headPortrait = window.URL.createObjectURL(file)
    //     // this.updatePhotoLoading = false
    //     // 请求更新用户头像请求提交 fd
    //     console.log("headPortrait: " + (fd.get('headPortrait')))
    //     this.user.headPortrait = window.URL.createObjectURL(file)
    //     console.log("this.user.headPortrait:" + this.user.headPortrait)
    //     updateUserPhoto({
    //       id: this.user.id,
    //       head_portrait: fd.get('headPortrait')
    //     }).then(res => {
    //       // 关闭对话框
    //       this.dialogVisible = false
    //       // 更新视图展示

    //       // 直接把裁切结果的文件对象转为 blob 数据本地预览
    //       this.user.headPortrait = window.URL.createObjectURL(file)

    //       // 关闭确定按钮的 loading
    //       // this.updatePhotoLoading = false

    //       this.$message({
    //         type: 'success',
    //         message: '更新头像成功'
    //       })

    //       // 更新顶部登录用户的信息
    //       console.log("this.user:" + this.user)
    //       globalBus.$emit('update-user', this.user)

    //       // 把服务端返回的图片进行展示有点慢
    //       // this.user.headPortrait = res.data.data.headPortrait
    //     })
    //   })
    // },
      //   onUpdatePhoto () {
      // // 让确定按钮开始 loading
      // this.updatePhotoLoading = true
      // 获取裁切的图片对象
      // this.cropper.getCroppedCanvas().toBlob(file => {  
      //   const fd = new FormData()
      //   fd.append('headPortrait', file)
      //   // 请求更新用户头像请求提交 fd
      //   // console.log(fd.get('headPortrait'))
      //    this.dialogVisible = false
      //     // 更新视图展示

      //     // 直接把裁切结果的文件对象转为 blob 数据本地预览
      //     this.user.headPortrait = window.URL.createObjectURL(file)
      //     console.log("user.headPortrait:" + fd.get("headPortrait"))

      //     // 关闭确定按钮的 loading
      //     this.updatePhotoLoading = false

      //     this.$message({
      //       type: 'success',
      //       message: '更新头像成功'
      //     })

      //     // 更新顶部登录用户的信息
      //     globalBus.$emit('update-user', this.user)
      //   updateUserPhoto(fd).then(res => {
      //     // 关闭对话框
      //     this.dialogVisible = false
      //     // 更新视图展示

      //     // 直接把裁切结果的文件对象转为 blob 数据本地预览
      //     this.user.headPortrait = window.URL.createObjectURL(file)

      //     // 关闭确定按钮的 loading
      //     this.updatePhotoLoading = false

      //     this.$message({
      //       type: 'success',
      //       message: '更新头像成功'
      //     })

      //     // 更新顶部登录用户的信息
      //     globalBus.$emit('update-user', this.user)

      //     // 把服务端返回的图片进行展示有点慢
      //     // this.user.headPortrait = res.data.data.headPortrait
      //   })
      // })
    }
  }

</script>

<style scoped lang="less">
.preview-image-wrap {
  /* Ensure the size of the image fit the container perfectly */
  .preview-image {
    display: block;

    /* This rule is very important, please don't ignore this */
    max-width: 100%;
    height: 200px;
  }
}
 .el-form-item  .el-input{
   width: 400px;
  //  background: red;
  //  float: left;
}
.el-form-item  .el-button{
  // background: green;
  // float: left;
  margin-left:10px
}
.settingContent{
  width: 1300px;
}
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>
