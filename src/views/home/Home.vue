<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src alt />
        <span>后台管理系统</span>
      </div>
      <el-button type="info" @click="loginOut">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409bff"
          unique-opened
          :collapse = "isCollapse"
          :collapse-transition = "false"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id  + '' " v-for="item in menuList" :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              index="childItem.id + '' "
              v-for="childItem in item.children"
              :key="childItem.id"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <span>{{childItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      iconObj: {
        125: 'el-icon-user-solid',
        103: 'el-icon-s-goods',
        101: 'el-icon-s-shop',
        102: 'el-icon-s-order',
        145: 'el-icon-s-platform'
      },
      isCollapse: false
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    loginOut() {
      // 清空token
      window.sessionStorage.clear()
      // 跳转到登录界面
      this.$router.push('/login')
    },
    // 获取菜单
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取菜单栏数据失败')
      this.menuList = res.data
    },
    // 菜单的展开与折叠
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      padding-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;

  .el-menu {
    border-right: none;
  }

  .toggle-button {
    color: white;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    background-color: #4a5064;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
}

.el-main {
  background-color: #eaedf1;
}

.home-container {
  height: 100%;
}
</style>
