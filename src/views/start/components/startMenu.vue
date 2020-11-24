<template>
  <el-menu
    default-active="/login"
    :default-openeds='["/login"]'
    mode="horizontal"
    background-color="#409efe"
    text-color="#fff"
    active-text-color="#0d5ba6"
    router
  >
  <el-menu-item index="/login">登录</el-menu-item>
  <el-menu-item index="/regist">注册</el-menu-item>
</el-menu>
</template>

<script>
export default {
  name: 'StartMenu',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less"></style>
