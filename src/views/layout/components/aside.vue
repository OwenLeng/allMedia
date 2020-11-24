<template>
  <!--
    el-menu-item 的 index 不能重复，确保唯一即可
   -->
  <el-menu
    class="nav-menu el-menu-vertical-demo"
    :default-active="$route.path"
    background-color="#002033"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse="isCollapse"
  >
    <el-menu-item index="/content">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/content/article">
      <i class="el-icon-document"></i>
      <span slot="title">内容管理</span>
    </el-menu-item>
    <!-- <el-menu-item index="/content/image">
      <i class="iconfont iconimage"></i>
      <span slot="title">素材管理</span>
    </el-menu-item> -->
    <el-menu-item index="/content/publish">
      <i class="iconfont iconpublish"></i>
      <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="/content/comment">
      <i class="iconfont iconcomment"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <!-- <el-menu-item index="/fans">
      <i class="el-icon-s-custom"></i>
      <span slot="title">粉丝管理</span>
    </el-menu-item> -->
    <el-menu-item index="/content/checkings" v-if="flag">
      <i class="el-icon-bell"></i>
      <span slot="title">文章审核</span>
    </el-menu-item>
    <el-menu-item index="/content/peopleManage" v-if="flag">
      <i class="el-icon-s-custom"></i>
      <span slot="title">人员管理</span>
    </el-menu-item>
    <el-menu-item index="/content/settings">
      <i class="el-icon-setting"></i>
      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'AppAside',
  components: {},
  props: ['is-collapse'],
  data () {
    return {
      // isCollapse: true
      flag:true,
      user:null
    }
  },
  computed: {},
  watch: {},
  created () {
    this.user = window.localStorage.getItem('user')
    this.user = JSON.parse(this.user)
    
    this.flag = this.user.userStatus == "2" ? true: false

  },
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.nav-menu {
  .iconfont {
    margin-right: 10px;
    padding-left: 5px;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
