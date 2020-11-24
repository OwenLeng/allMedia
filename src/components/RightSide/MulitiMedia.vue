<template>
    <div class="column-box">
      <div class="column-title-box">
        <span class="column-title">全媒体栏目</span>
        <a class="col-more" @click="MainPage(1)" href="#">查看全部</a>
      </div>
      <div class="columns">

        <div class="col-card" v-for="(news,index) in Info" :key="index">
        <!-- <div class="col-card"  > -->
           
           <!-- <img class='col-img' v-bind:src='news.src'> -->
          <img  class='col-img' src='./USA.jpg' alt="假照片"> 
          <!-- <img class = 'col-img' src = '../assets/image/MulitiMedia/20201031110234839.jpg' -->
          <div class="col-container" >
            <span class="col-title">
              <a href="#" @click="tiaozhuan(news.article_id,news.article_version)">{{news.title}}</a>
            </span>
            <el-badge :value="200" :max="99" class="item">
              <span size="small">评论</span>
            </el-badge>
            <!-- <span class="col-tail">评论 {{news.commentNumber}} </span> -->
          </div>
        </div>
      </div>
    </div>  
</template>

<script>

import {getRecommendArticles} from "../../utils/article" 
export default {
  name: 'MulitiMedia',
  data: function () {
    return {
      Info: [
        {
          src: "",
          brief: '美国说病毒不可控，可中国就是要‘打它脸’”',
          commentNumber:"99+",
        },
        {
          src: '../../../static/image/gajiucai.jpg',
          brief: '蚂蚁集团H股认购，吸走全港两成港元存款',
          commentNumber:"99+",
        },
        {
            src: '../../../static/image/tielu.jpg',
            brief: '新建川藏铁路雅安至林芝段即将进入工程实施阶段',
            commentNumber: "99+"
        }
      ]
    }
  },

  
  methods: {
      tiaozhuan(id,version) {
          console.log('查询id')
          console.log(id)
          console.log('查询version')
          console.log(version)
          this.$router.push(
              {
                  name:"articledisplay",
                  query : {
                      article_id: id,
                      article_vesion: version, 
                  }
              }
          )
      },
      MainPage(id) {
        //   this.$router.push('/articledisplay/'+id)
          console.log("返回主页")
          
          this.$router.push({ 
              path: '/'
              })
      }

      
  },

  created: function () { 

     getRecommendArticles(1,0,5).then(res =>{
         this.Info  = res.data.result
         console.log("热点新闻为：")
         console.log(this.Info)
      }) 
   
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped> 
  @import "../../assets/css/RightSide/RightSide.css";
  
</style>
