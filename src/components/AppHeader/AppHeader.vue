<template>
    
<div class="top-nav-box">
        <div class="top-nav-container">
            <div class="logo-box">
                <img class="logo" src="../../assets/image/Comma/themedia.png" />
            </div>
            <ul class="nav-item-box">
                <li class="nav-item"><a href="#" v-on:click="MainPage">首页</a></li>
                <li class="nav-item"><a href="#">国际</a></li>
                <li class="nav-item"><a href="#">军事</a></li>
                <li class="nav-item"><a href="#">财经</a></li>
                <li class="nav-item"><a href="#">民生</a></li>
                <li class="nav-item"><a href="#">科技</a></li>
                <li class="nav-item"><a href="#">百科</a></li>
                <li class="nav-item"><a href="#">问答</a></li>
                <li class="nav-item"><a href="#">视频</a></li>
                <li class="nav-item"><a href="#">直播</a></li>
            </ul>
            <div class="user-box">
                
                <span class="login-sign-container">
                    <el-link   href="http://223.3.82.43:8080/login">跳转到发布</el-link>
                     
                    <a href="./login.html">登录 </a>/
                    <a href="#">注册</a>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
 
export default {
    name: 'AppHeader',
    methods: {
      MainPage(id) {
        //   this.$router.push('/articledisplay/'+id)
          console.log("返回主页")
          
          this.$router.push({ 
              path: '/'
              })
      }

  }
    
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped> 
  @import "../../assets/css/TopNav/topnav.css";
  @import "../../assets/css/Common/common.css";
  .el-link{
       background-color: #99a9bf;
       margin-right:30px;
       font-size:16px;
       border-style:groove;
       border-width:1px; 
       padding: 10px auto;
  }
</style>
