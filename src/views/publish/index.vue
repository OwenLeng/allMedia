<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/content">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $route.query.id ? '修改文章' : '发布文章' }}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <el-form
        :model="article"
        :rules="formRules"
        label-width="80px"
        ref="publish-form"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
          <el-tiptap
            v-model="article.content"
            :extensions="extensions"
            height="350"
            placeholder="请输入文章内容"
          ></el-tiptap>
        </el-form-item>
        <!-- <el-form-item label="封面"> -->
          <!-- <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group> -->
          <!--
            我们需要把选择的封面图片的地址放到 article.cover.images 数组中

            当你给事件处理函数传递了自定义参数以后，就无法得到原本的那个数据参数了。

            如果想要在事件处理函数自定义传参以后还想得到原来的那个事件本身的参数，则手动指定 $event，它就代表那个事件本身的参数

            在组件上使用 v-model

            当你给子组件提供的数据既要使用还要修改，这个时候我们可以使用 v-model 简化数据绑定。
            v-model="article.cover.images[index]"
              给子组件传递了一个名字叫 value 的数据
              :value="article.cover.images[index]"
              默认监听 input 事件，当事件发生，它会让绑定数据 = 事件参数
              @input="article.cover.images[index] = 事件参数"

            注意：v-model 仅仅是简写了而已，本质还在在父子组件通信

            v-model 的参考文档：https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model
           -->
          <!-- <template v-if="article.cover.type > 0">
            <upload-cover
              :key="cover"
              v-for="(cover, index) in article.cover.type"
              v-model="article.cover.images[index]"
            />
            <upload-cover
              :key="cover"
              v-for="(cover, index) in article.cover.type"
              :cover-image="article.cover.images[index]"
              @update-cover="onUpdateCover(index, $event)"
            />
          </template>
        </el-form-item> -->
        <el-form-item label="类型" prop="category">
          <el-select v-model="article.category" placeholder="请选择类型">
            <el-option
              :label="category"
              :value="category"
              v-for="(category, index) in categories"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="稿件等级" prop="level">
          <el-select v-model="article.level" placeholder="请选择等级">
            <el-option
              :label="level"
              :value="level"
              v-for="(level, index) in levels"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="原创声明" prop="originality">
          <el-switch
            v-model="article.originality"
            active-color="#13ce66"
            inactive-color="#ff4949"
            >
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">发表</el-button>
          <!-- <el-button @click="onPublish(true)">存入草稿</el-button> -->
        </el-form-item>
      </el-form>
    </el-card>
  </div>

</template>

<script>
// import UploadCover from './components/upload-cover'
import {
  getArticleChannels,
  addArticle,
  getArticle,
  updateArticle
} from '@/api/article'
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Image,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  HorizontalRule,
  TextAlign,
  Fullscreen,
  Preview,
  CodeBlock,
  TextColor
} from 'element-tiptap'
import 'element-tiptap/lib/index.css'
import { uploadImage } from '@/api/image'

export default {
  name: 'PublishIndex',
  components: {
    'el-tiptap': ElementTiptap
    // UploadCover
  },
  props: {},
  data () {
    return {
      levels: ['高', '中', '低'], // 稿件等级列表
      categories: ['热点观察', '中特研究', '伦理道德', '中国与世界', '大国关系', '全球治理'], // 文章类型列表
      user:null,
      article: {
        article_id: "",
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
      },
      // 编辑器的 extensions
      // 它们将会按照你声明的顺序被添加到菜单栏和气泡菜单中
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 3 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Image({
          // 默认会把图片生成 base64 字符串和内容存储在一起，如果需要自定义图片上传
          uploadRequest (file) {
            // 如果接口要求 Content-Type 是 multipart/form-data，则请求体必须使用 FormData
            const fd = new FormData()
            fd.append('image', file)
            // 第1个 return 是返回 Promise 对象
            // 为什么？因为 axios 本身就是返回 Promise 对象
            return uploadImage(fd).then(res => {
              // 这个 return 是返回最后的结果
              return res.data.data.url
            })
          } // 图片的上传方法，返回一个 Promise<url>
        }),
        new Underline(), // 下划线
        new Italic(), // 斜体
        new Strike(), // 删除线
        new HorizontalRule(), // 华丽的分割线
        new TextAlign,
        new ListItem(),
        new BulletList(), // 无序列表
        new OrderedList(), // 有序列表
        new TodoItem(),
        new TodoList(),
        new Fullscreen(),
        new Preview(),
        new CodeBlock(),
        new TextColor()
      ],
      formRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        content: [
          // { required: true, message: '请输入文章内容', trigger: 'change' }
          {
            validator (rule, value, callback) {
              console.log('content validator')
              if (value === '<p></p>') {
                // 验证失败
                callback(new Error('请输入文章内容'))
              } else {
                // 验证通过
                callback()
              }
            }
          },
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择文章类型' }
        ],
        level: [
          { required: true, message: '请选择文章等级' }
        ],
        originality: [
          { required: true, message: '请选择原创声明' }
        ]
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
    this.user = JSON.parse(window.localStorage.getItem('user'))
    this.article.user_id = this.user.id
    console.log("lalal" + this.article.user_id)
    if (this.$route.query.id) {
      this.loadArticle()
    }
  },
  mounted () {},
  methods: {
    loadChannels () {
      getArticleChannels().then(res => {
        this.categories = res.data.data.categories
      })
    },

    onPublish (draft = false) {
      console.log(this.article.user_id)
      this.$refs['publish-form'].validate(valid => {
        // 验证失败，停止提交表单
        if (!valid) {
          return
        }

        // 验证通过，提交表单
        // 找到数据接口
        // 封装请求方法
        // 请求提交表单
        // 如果是修改文章，则执行修改操作，否则执行添加操作
        const articleId = this.$route.query.id
        if (articleId) {
          // 执行修改操作
          updateArticle(articleId, this.article, draft).then(res => {
            console.log(res)
            this.$message({
              message: `${draft ? '存入草稿' : '发布'}成功`,
              type: 'success'
            })
            // 跳转到内容管理页面
            this.$router.push('/content/article')
          })
        } else {
          this.article['level'] = this.levels.indexOf(this.article['level'])
          this.article['category'] = this.categories.indexOf(this.article['category'])
          this.article['originality'] = this.article['originality'] == true ? "1" : "0"
          addArticle(this.article, draft).then(res => {
            // 处理响应结果
            // console.log(res)
            this.article['level'] = this.levels[this.article['level']]
            this.article['category'] = this.categories[this.article['category']]
            this.article['originality'] = this.article['originality'] == "1" ? true : false
            this.$message({
              message: `${draft ? '存入草稿' : '发布'}成功`,
              type: 'success'
            })
            // 跳转到内容管理页面
            this.$router.push('/content/article')
          }).catch(function(error){
            this.article['level'] = this.levels[this.article['level']]
            this.article['category'] = this.categories[this.article['category']]
            this.article['originality'] = this.article['originality'] == "1" ? true : false
          })
          

        }
      })
    },

    // 修改文章：加载文章内容
    loadArticle () {
      console.log('loadArticle')
      // 找到数据接口
      // 封装请求方法
      // 请求获取数据
      getArticle(this.$route.query.id).then(res => {
        // 模板绑定展示
        // console.log(res)

        this.article = res.data.article_content
        
        this.article['originality'] = this.article['originality'] == "1" ? true : false
        
        this.article['level'] = this.levels[this.article['level']]
        this.article['category'] = this.categories[this.article['category']]
        
       
      })
    },

    onUpdateCover (index, url) {
      this.article.cover.images[index] = url
    }
  }
}
</script>

<style scoped lang="less"></style>
