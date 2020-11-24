<template>

  <div class="home-container">
    <div class='container'>
      <div class="header">
        <StartMenu />
      </div>
      <div class="main">
        <!-- 子路由出口 -->
        <router-view />
      </div>
    </div>
    <!--
      el-form 表单组件
      每个表单项都必须使用 el-form-item 组件包裹
     -->
  </div>
</template>

<script>
import StartMenu from './components/startMenu'
export default {
  name: 'StartIndex',
  components: {
    StartMenu
  },
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("./start_bg.jpg") no-repeat;
  background-size: cover;
    .container{
      background-color: #fff;
      flex-direction: column;
      .header {
        background-color: #b4b0bb;
        color: #333;
        text-align: center;
        line-height: 60px;
      }
      .main {
        background-color: #a09494;
        color: #333;
        text-align: center;
        line-height: 160px;
      }
    }
}
</style>
