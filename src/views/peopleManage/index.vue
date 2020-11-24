<template>
<div class="people_manage">
    <!-- <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/content">首页</el-breadcrumb-item>
          <el-breadcrumb-item>人员管理</el-breadcrumb-item>
        </el-breadcrumb>
    </el-card> -->
  
    <el-card class="box-card">
          <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/content">首页</el-breadcrumb-item>
          <el-breadcrumb-item>人员管理</el-breadcrumb-item>
         </el-breadcrumb>
         <br/>
          <h1>一共有{{ totalCount }}个用户</h1>
       
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
        :data="users"
        stripe
        style="width: 100%"
        class="list-table"
        size="mini"
      >
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="phone" label="手机号"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column label="操作">
          <!-- 如果需要自定义表格列模板，则把需要自定义的内容放到 template 里面 -->
          <template slot-scope="scope">
          
            <el-button
              type="danger"
              @click="deleteUser(scope.row.id.toString())"
            >删除</el-button>
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
import{
  loadUserMediaInfos,
  deleteUserById
} from "@/api/user"
export default {
  name:"PeopleMange",
  components:{},
  props:{},
  data(){
    return {
      users: null,
      totalCount:0,
    }
  },
  computed:{},
  watch:{},
  created(){
    this.loadUsers()
  },
  methods:{
    loadUsers(){
      loadUserMediaInfos().then((res) =>{
        this.users = res.data
        this.totalCount = this.users.length
        console.log(this.users)
      })
    },
    deleteUser(id){
      this.$confirm("可以确认删除吗？","删除提示",{
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
           deleteUserById(id).then((res) =>{
            console.log("删除成功")
            this.loadUsers()
      })
      })
     
    }
  },


}
</script>

<style scoped less="lang">
h1{
  margin-top:5px;
  font-size: 20px;
  padding-top:0px;
}
.filter-card {
  margin-bottom: 30px;
}

.list-table {
  margin-bottom: 20px;
}
</style>