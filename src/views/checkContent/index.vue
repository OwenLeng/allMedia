
<template>

<div class="checkContents">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/content">首页</el-breadcrumb-item>
                <el-breadcrumb-item>内容审核</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="content">
            <el-container>
                <el-header>
                    <h1 class="title">{{article.title}}</h1>
                </el-header>
                
                <el-main>
                    <div v-html="article.content" class="mainContent"></div>
                </el-main>
                <el-footer>
                    <div class="describe">
                        <span class="level">文章等级:</span>{{article.level}} 
                        <span class="originality">原创声明：</span>{{article.originality == true ? '是': '否'}}
                        <span class="author_name">作者：</span>{{article.author_name}}
                    </div>
                    <div class="check">
                        <el-row>
                             <el-button type="primary" round @click="checkArticleFun(article.article_id, 0)">通过</el-button>
                            <el-button type="danger" round @click="checkArticleFun(article.article_id, 1)">不通过</el-button>
                        </el-row>
                       
                    </div>

                </el-footer>
            </el-container>
        </div>
        
    </el-card>

</div>
    
</template>

<script>
import {
  getArticleChannels,
  addArticle,
  getArticle,
  updateArticle,
  checkArticle
} from '@/api/article'
export default {
  name: 'CheckContent',
 
  props: {},
  data () {
    return {
      levels: ['高', '中', '低'], // 稿件等级列表
      categories: ['热点观察', '中特研究', '伦理道德', '中国与世界', '大国关系', '全球治理'], // 文章类型列表
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        // cover: { // 文章封面
        //   type: 1, // 封面类型 -1:自动，0-无图，1-1张，3-3张
        //   images: [] // 封面图片的地址
        // },   
        category: null,
        level: null,
        originality: false,
        user_id: window.localStorage.getItem('user').id
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    // this.loadChannels()

    // 由于我们让发布和修改使用的同一个组件
    // 所以这里要判断
    // 如果路由路径参数中有 id，则请求展示文章内容
    if (this.$route.query.id) {
      this.loadArticle()
    }
    
  },
  mounted () {},
  methods: {
   
    // 修改文章：加载文章内容
    loadArticle () {
      console.log('loadArticle')
      console.log(this.$route.query.id)
      // 找到数据接口
      // 封装请求方法
      // 请求获取数据
      getArticle(this.$route.query.id).then(res => {
        // 模板绑定展示
        // console.log(res)
        this.article = res.data.article_content
        
        this.article['originality'] = this.article['originality'] == "1" ? true : false
        
        this.article['level'] = this.levels[this.article['level']]
      })
    },
    checkArticleFun (article_id, status){
        checkArticle(article_id, status).then(res => {
            console.log(res.data)
            this.$message({
              message: `${status == 0 ? '审核通过' : '审核不通过'}`,
              type: 'success'
            })
            this.$router.push("/content/checkings")
            
        }).catch(error => {
            this.$message({
              message: '审核失败',
              type: 'error'
            })
            this.$router.push("/content/checkings")
        })
     

    }

  }
    }
</script>

<style lang='less' scoped>

.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

.el-header .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    
    
    // line-height: 60px;
}
.title{
    margin:0px;
    padding:0px;
    text-align: center;
    font-size:30px;
}
.el-main {
    // background-color: #E9EEF3;
    color: #333;
    margin:10px auto;
    // text-align: center;
    // line-height: 160px;
  }
 .content /deep/ .el-main img {
    display: block;
    margin:10px;
 
}
.author{
    float: right;
}
.check{
    margin: 20px;
   
   text-align:center;
}
.check .el-button{
    width: 100px;
}
.describe{
    float: right;
}
.describe span{
    margin: 10px;
    font-weight: bold;
}
</style>