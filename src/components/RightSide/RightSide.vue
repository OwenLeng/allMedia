<template>
    <!-- 右边侧栏 -->
    <div class="side-content-box">
      <!-- 搜索框 -->
      <div class="row realtive-encyc-box">
        <div class="col-lg-12">
            <div class="search-fix">
                <!-- <input onblur="this.style.color='#999';if(this.value=='') this.value='';" v-model="SearchContent" onfocus="this.style.color='#000';if(this.value=='请输入关键字！') this.value='';" value="" id="txtkey" type="text"> -->
                <el-input style="width:70%" placeholder="请输入内容" v-model="SearchContent" @keyup.enter.native="search()" clearable> </el-input>
                <el-button type="primary"  style="background-color:brown;"  v-on:click="search()" icon="el-icon-search">搜索</el-button>
                <!-- <a v-on:click="search">搜索</a> -->
            </div>
            <div>
            </div>
          <!-- <div class="input-group search-box">
            <input type="text" class="form-control" placeholder="请输入要搜索的内容">
            <span class="input-group-btn">
              <button id="search" class="btn btn-default" type="button" v-on:click="search">搜索</button>
            </span>
          </div>  -->
        </div><!-- /.col-lg-12 -->
      </div><!-- /.row -->
      <!-- 搜索框 -->

      <!-- 全媒体头条 -->
        <mulitiMedia></mulitiMedia>
      <!-- 全媒体头条 -->

      <br/>
      <el-calendar v-model="value">
      </el-calendar>
       
    </div>
    <!-- 右边侧栏 -->    
</template>

<script>


import MulitiMedia from './MulitiMedia';
export default {
  name: 'RighrSide',
  components: {
      MulitiMedia
  },
  data(){
      return{
          SearchContent : ``,
          value: new Date()
      }
    },
  methods: {
      search() {
        //   this.$router.push('/articledisplay/'+id)
          
          this.$router.push({ 
              path: '/SearchList',
              name: 'SearchList',
              query: {
                    SearchContent: this.SearchContent
                }
              })
      },
      
      

 

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped> 
  @import "../../assets/css/RightSide/RightSide.css";
  /* @import url("https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" ); */
</style>
