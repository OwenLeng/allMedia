<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/content">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容审核</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 数据筛选表单 -->
      <el-form ref="form" :model="form" label-width="40px" size="mini">
          <!--
              el-radio 默认把 label 作为文本和选中之后的 value 值
               <el-radio :label="0">草稿</el-radio> 
            -->
        <!-- <el-form-item label="状态">
          <el-radio-group v-model="status">
            
            <el-radio :label="5">全部</el-radio>
           
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item> -->

        <el-form-item label="类型">
          <el-select v-model="categoryId" placeholder="请选择类型">
            <el-option label="全部" :value="null"></el-option>
            <el-option
              :label="category"
              :value="category"
              v-for="(category, index) in categories"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期">
          <el-date-picker
            v-model="rangeDate"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00']"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>

        <el-form-item>
          <!--
            button 按钮的 click 事件有个默认参数
            当你没有指定参数的时候，它会默认传递一个没用的数据
          -->
          <el-button type="primary"  @click="loadArticles(1)"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 数据筛选表 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        共找到{{ totalCount }}篇符合条件的内容
      </div>
      <!-- 数据列表 -->
      <!--
        Table 表格组件
        1、把需要展示的数组列表数据绑定给 table 组件的 data 属性
          注意：你不用去 v-for 遍历，它自己会遍历
        2、设计表格列 el-table-column
          width 可以设定表格列的宽度
          label 可以设定列的标题
          prop  用来设定要渲染的列表项数据字段，只能展示文本

        3、表格列默认只能渲染普通文本，如果需要展示其它内容，例如放个按钮啊、放个图片啊，那就需要自定义表格列模板了：https://element.eleme.cn/#/zh-CN/component/table#zi-ding-yi-lie-mo-ban
      -->
      <el-table
        :data="articles"
        stripe
        style="width: 100%"
        class="list-table"
        size="mini"
        v-loading="loading"
      >
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column label="状态">
          <!-- 如果需要在自定义列模板中获取当前遍历项数据，那么就在 template 上声明 slot-scope="scope" -->
          <template slot-scope="scope">
            <el-tag :type="articleStatus[scope.row.status].type">{{
              articleStatus[scope.row.status].text
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_by"
          label="发布时间"
          :formatter="dateFormat"
        ></el-table-column>
        <el-table-column label="操作">
          <!-- 如果需要自定义表格列模板，则把需要自定义的内容放到 template 里面 -->
          <template slot-scope="scope">
          
            <el-button
              type="primary"
              @click="$router.push('/content/checkContent?id=' + scope.row.id.toString())"
            >审核</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--
        total 用来设定总数据的条数
        它默认按照 10 条每页计算总页码
        page-size 每页显示条目个数，支持 .sync 修饰符，默认每页 10 条
        90 3 90 / 3 = 30
      -->
      <!-- 列表分页 -->
      <!-- <el-pagination
        layout="prev, pager, next"
        background
        :total="totalCount"
        @current-change="onCurrentChange"
        :page-size="pageSize"
        :disabled="loading"
        :current-page.sync="page"
      /> -->
    </el-card>
  </div>
</template>

<script>
import {
  getArticles,
  getArticlesReal,
  getArticleCategory,
  deleteArticle,
} from "@/api/article"

import moment from "moment"

export default {
  name: "ArticleIndex",
  components: {},
  props: {},
  data() {
    return {
      form: {
        name: "",
        region: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      articles: [], //文章数据列表
      articleStatus: [
        { status: 0, text: "草稿", type: "info" }, // 0
        { status: 1, text: "待审核", type: "" }, // 1
        { status: 2, text: "审核通过", type: "success" }, // 2
        { status: 3, text: "审核失败", type: "warning" }, // 3
        { status: 4, text: "已删除", type: "danger" }, // 4
        { status: 5, text: "全部", type: " " }, // 5
      ],
      totalCount: 0, //总数据条数
      pageSize: 10, //每页大小
      status: 1, //查询文章的状态 不传就是全部状态
      categories: ['热点观察', '中特研究', '伦理道德', '中国与世界', '大国关系', '全球治理'], //文章类型列表
      categoryId: null, //查询文章频道
      rangeDate: null, //筛选的范围日期
      loading: true, //表单数据加载中 loading
      page: 1, //当前页码
    }
  },
  computed: {},
  watch: {},
  created() {
    //加载类型
    // this.loadCategory()
    //第一次获取的是第一页的数据
    this.loadArticles(1)
  },
  mounted() {},
  methods: {
    //时间格式化
    dateFormat: function(row, column) {
      var date = row[column.property]
      if (date == undefined) {
        return ""
      }
      var moment = require("moment")
      return moment(date).format("YYYY-MM-DD HH:mm:ss")
    },

    //请求文章
    loadArticles(page = 1) {
      //展示加载中 loading
      this.loading = true
      // page per_page是分页的参数
      // getArticles({
      //   page, //当前页码
      //   per_page: this.pageSize, //每页大小
      //   status: this.status,  //文章的状态 不传就是全部状态
      //   category_id: this.categoryId,
      //   begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, //开始日期
      //   end_pubdate: this.rangeDate ? this.rangeDate[1] : null, //结束日期
      // }).then((res) => {
      //   console.log(res)
      //   const { results, total_count: totalCount } = res.data.data
      //   this.articles = results
      //   this.totalCount = totalCount
      //   //关闭加载中 loading
      //   this.loading = false
      // })

      getArticlesReal({
        // page, //当前页码
        // per_page: this.pageSize, //每页大小
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
    loadCategory() {
      getArticleCategory().then((res) => {
        this.categories = res.data.data.channels
      })
    },
    onSubmit() {
      console.log("submit!")
    },
    onCurrentChange(page) {
      this.loadArticles(page)
    },
    onDeleteArticle(articleId) {
      console.log(articleId)
      console.log(articleId.toString())
      this.$confirm("确认删除吗？", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确认执行这里
          deleteArticle(articleId.toString()).then((res) => {
            // 删除成功，更新当前页的文章数据列表
            this.loadArticles(this.page)
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          })
        })
      // 找到数据接口
      // 封装请求方法
      // 删除请求调用
      // 处理响应结果
      // console.log('onDeleteArticle')
    },
  },
}
</script>

<style scoped lang="less">
.filter-card {
  margin-bottom: 30px;
}

.list-table {
  margin-bottom: 20px;
}
</style>
