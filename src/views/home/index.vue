<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/content">首页</el-breadcrumb-item>
          
          </el-breadcrumb>
        </div>
        <!-- <el-carousel :interval="4000" type="card" height="250px">
            <el-carousel-item v-for="(val, key) in slideShow" :key='key'>
              <h3 class="medium" @click="$router.push(val)">{{ key }}</h3>
            </el-carousel-item>
        </el-carousel> -->
        <div class="content clearfix">
          <el-card class="box-card articleContent">
                <div slot="header" class="clearfix">
                    审核成功稿件内容
                </div>
                <el-table
                  :data="articles.slice(0, 10)"
                  stripe
                  style="width: 100%"
                  class="list-table"
                  size="mini"
                  v-loading="loading"
                >
                  <el-table-column prop="title" label="标题" width="400"> </el-table-column>
                  <el-table-column label="状态" width="400">
                    <!-- 如果需要在自定义列模板中获取当前遍历项数据，那么就在 template 上声明 slot-scope="scope" -->
                    <!-- <template slot-scope="scope">
                      <el-tag :type="articleStatus[scope.row.status].type">{{
                        articleStatus[scope.row.status].text
                      }}</el-tag>
                     
                    </template> -->
                     <el-button
                        size="mini"
                        circle
                        icon="el-icon-check"
                        type="primary"
                        :disabled= "true"
                      ></el-button>
                    
                  </el-table-column>
                </el-table>
          </el-card>
          <div class="calendar">
            <el-calendar v-model="value">
            </el-calendar>

          </div>

               
        </div>
        

</el-card>

  

  

</template>

<script>
import {
  getArticles,
  getArticlesReal,
  getArticleCategory,
  deleteArticle,
} from "@/api/article"
export default {
  // 指定 name 选项的另一个好处是便于调试。
  // 有名字的组件有更友好的警告信息。
  // 另外，当在有 vue-devtools，未命名组件将显示成 <AnonymousComponent>，这很没有语义。通过提供 name 选项，可以获得更有语义信息的组件树。
  // 结论：给一个组件起个名字是非常有意义的，尽量不要让组件的名字重复
  name: 'HomeIndex',
  components: {},
  props: {},
  data () {
    return {
      value: new Date(),
      slideShow:{
        "内容管理": '/content/article',
        "发布文章": '/content/publish',
        "评论管理": '/content/comment',
        "个人设置": '/content/settings'
      }, 
      articles: [],
      loading: true,
      page: 1,
      per_page: 10,
      user_id: "",
      status: 2,
      total_count:0,
       articleStatus: [
        { status: 0, text: "草稿", type: "info" }, // 0
        { status: 1, text: "待审核", type: "" }, // 1
        { status: 2, text: "审核通过", type: "success" }, // 2
        { status: 3, text: "审核失败", type: "danger" }, // 3
        { status: 4, text: "已删除", type: "danger" }, // 4
        { status: 5, text: "全部", type: " " }, // 5
      ],
    }
  },
  computed: {},
  watch: {},
  created () {
    this.user_id = JSON.parse(window.localStorage.getItem('user')).id
    console.log("this.user_id:", this.user_id)
    this.loadArticles(this.user_id, 1)
  },
  mounted () {},
  methods: {
       //请求文章
    loadArticles(user_id, page=1) {
      console.log("user_id:", user_id)
      //展示加载中 loading
      this.loading = true
  
      getArticlesReal({
        page, //当前页码
        per_page: this.pageSize, //每页大小
        user_id: this.user_id,
        status: this.status, //文章的状态 不传就是全部状态
        category: this.categoryId,
        start_time: this.rangeDate ? this.rangeDate[0] : null, //开始日期
        end_time: this.rangeDate ? this.rangeDate[1] : null, //结束日期
      }).then((res) => {
        console.log(res)
        console.log(res.data)
        const results = res.data
        // const { results, total_count: totalCount } = res.data.data
        this.articles = results
        this.totalCount = results.length
        // //关闭加载中 loading
        this.loading = false
      })
    },
  }
}
</script>

<style  lang="less" >
  
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
    .el-carousel__item h3 {
    color: #475669;
    font-size: 30px;
    opacity: 0.75;
    line-height: 200px;
    // text-align: center;
    text-indent: 200px;
    font-weight: bold;
    color: gold;
    margin: 0;
  }
  
  .el-carousel__item{
  
    background: url(https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1960568669,2526195487&fm=26&gp=0.jpg) no-repeat;
  }
  // .content > div{
  //   width: 400px;
  //   margin-right: 20px;
  //   margin-bottom: 40px;
  //   float: left;
  // }
  .content{
    width: 1280px;
    padding: 10px;
  }
  .el-card__header{
    line-height: 36.99px;

  }
  .articleContent{
    float: left;
    width:850px;
    height:850px;
    // background: #475669;
  }
  .calendar{
    float:right;
    width: 400px;
    height: 200px;
    // margin-right: 30px;
  }
  .calendar  .el-calendar-day{
    height: 35px !important;
    text-align: center;
    
  }
  


  
  
</style>
