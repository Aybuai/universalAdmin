<template>
  <div class="navbar">
    <!-- 汉堡🍔 -->
    <hamburger class="hamburger-container" />

    <!-- 面包屑 -->
    <breadcrumb class="breadcrumb-container" />

    <!-- 右侧用户操作 -->
    <div class="right-menu">
      <!-- 国际化切换 -->
      <lang-select class="right-menu-item hover-effect"></lang-select>

      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            shape="square"
            :size="40"
            :src="$store.getters.userInfo.avatar"
          ></el-avatar>
          <i class="el-icon-s-tools"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item> {{ $t('navBar.home') }} </el-dropdown-item>
            </router-link>
            <a target="__blank" href="https://github.com/Aybuai/universalAdmin">
              <el-dropdown-item> GitHub </el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="onLogout">
              {{ $t('navBar.logout') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import Hamburger from '@/components/Hamburger/index.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import LangSelect from '@/components/LangSelect/index.vue'

const store = useStore()
const onLogout = () => {
  store.dispatch('user/logout')
}
</script>
<style scoped lang="scss">
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgb(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    // hover 动画
    transition: background 0.5s;

    &:hover {
      background: rgb(0, 0, 0, 0.1);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    ::v-deep .right-menu-item {
      display: inline-block;
      padding-right: 18px;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: bottom;

      &.hover-effect {
        cursor: pointer;
      }
    }

    ::v-deep .avatar-container {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
