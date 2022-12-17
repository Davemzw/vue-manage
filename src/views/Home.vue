<template>
    <el-container class="home-container">
  <el-header>
    <div>
      <img src="../assets/logo.png" alt="" style="width:50px;height:50px">
      <span>后台管理系统</span>
    </div>
    <el-button type="info" @click="logout">退出</el-button>
  </el-header>
  <el-container>
    <el-aside :width="iscollapse?'64px':'200px'">
      <div class="toggle-button" @click="toggleCollapse">|||</div>
      <!-- 侧边栏菜单 -->
      <el-menu
      router
      :unique-opened="true"
      :collapse="iscollapse"
      :collapse-transition="false"
      :default-active="activePath"
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409eff">
      <el-submenu :index="item.id+' '" v-for="item in menuList" :key="item.id">
        <template slot="title">
          <i :class="iconList[item.id]"></i>
          <span>{{item.authName}}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item :index="subitem.path" v-for="subitem in item.children" :key="subitem.id" @click="saveNavState(subitem.path)">
          <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{subitem.authName}}</span>
        </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    </el-aside>
    <el-main>
    <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  data(){
    return{
      menuList:[],
      iconList:{
        '125':"el-icon-user",
        '103':"el-icon-tickets",
        '101':"el-icon-shopping-bag-1",
        '102':"el-icon-notebook-2",
        '145':"el-icon-data-line"      
      },
      iscollapse:false,
      activePath:""
    }
  },
  created(){
    this.getMenuList()
    this.activePath=window.sessionStorage.getItem('activePath')
  },
   methods:{
    logout(){
      window.sessionStorage.clear()
      this.$router.push("/login")
    },
    async getMenuList(){
      //  const {data:res}=this.$http.get('menu')
      // if(res.meta.status!==200) return this.$message.error(res.meta.msg)
      // this.menuList=res.data
      this.menuList=[
        {
          authName:"用户管理",
          children:[{id:110,authName:"用户列表",path:"users"}],
          id:125,
          order:1,
          path:"users"
        },
        {
          authName:"角色管理",
          children:[{id:111,authName:"角色列表",path:"roles"},{id:112,authName:"权限列表",path:"rights"}],
          id:103,
          order:2,
          path:"rights"
        },
        {
          authName:"商品管理",
          children:[{id:113,authName:"商品列表",path:"goods"},{id:114,authName:"分类参数",path:"goods"},{id:115,authName:"商品分类",path:"goods"}],
          id:101,
          order:3,
          path:"goods"
        },
        {
          authName:"订单管理",
          children:[{id:110,authName:"订单列表",path:"orders"}],
          id:102,
          order:4,
          path:"orders"
        },
        {
          authName:"数据统计",
          children:[{id:110,authName:"用户列表",path:"reports"}],
          id:145,
          order:5,
          path:"reports"
        }

      ]
    },
    //点击按钮切换菜单的折叠与展开
    toggleCollapse(){
        this.iscollapse=!this.iscollapse
    },
    saveNavState(activePath){
      window.sessionStorage.setItem('activePath',activePath)
      this.activePath=activePath
    }

   }
}
</script>

<style scoped lang="less">
.home-container{
  height: 100%;
}
  .el-header{
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 20px;
    div{
      display: flex;
      align-items: center;
      span{
        margin-left: 15px;
      }
    }
  }
  .el-aside{
    background-color: #333744;
    .toggle-button{
      background-color: #4a5064;
      color: #fff;
      font-size: 10px;
      line-height: 24px;
      text-align: center;
      letter-spacing: 0.2em;
      cursor: pointer;
    }
    .el-menu{
      border-right: 0;
     i{
      margin-right: 10px;
    } 
    }
    
  }
  .el-main{
    background-color: #eaedf1;
  }
</style>