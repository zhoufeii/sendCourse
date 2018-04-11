<template>
  <Menu mode="horizontal" :theme="theme1" active-name="1">
    <MenuItem name="1">
      <router-link @click="getParams" :to="{path:'/'}" tag="span" >
        <Icon type="ios-paper"></Icon>
        首页
      </router-link>

    </MenuItem>
    <MenuItem name="2">
      <router-link @click="getParams" :to="{path:'/fruit'}"  class="info" tag="span">
        <Icon type="ios-nutrition"></Icon>
        买水果
      </router-link>

    </MenuItem>
    <Submenu name="3">
      <template slot="title">
        <Icon type="stats-bars"></Icon>
        统计分析
      </template>
      <MenuGroup title="使用">
        <MenuItem name="3-1">新增和启动</MenuItem>
        <MenuItem name="3-2">活跃分析</MenuItem>
        <MenuItem name="3-3">时段分析</MenuItem>
      </MenuGroup>
      <MenuGroup title="留存">
        <MenuItem name="3-4">用户留存</MenuItem>
        <MenuItem name="3-5">流失用户</MenuItem>
      </MenuGroup>
    </Submenu>
    <MenuItem name="4">
      <router-link :to="{path:'/AddSubjectOrCourse'}" tag="span">
        <Icon type="settings"></Icon>
        添加科目和课程
      </router-link>
    </MenuItem>
    <MenuItem name="5">
      <router-link :to="{path:'/ManageCourse'}" tag="span">
        <Icon type="settings"></Icon>
        课程配置
      </router-link>
    </MenuItem>
  </Menu>
</template>

<script>
  import { Header,Menu,MenuItem,MenuGroup,Submenu,Icon,Button} from 'iview'
    export default {
        name: 'RealHeader',
        props:{
          parentCourse:{
            'type':'String'
          }
        },
        data() {
            return {
              theme1: 'light'
            }
        },
        methods: {
          getParams(){
            console.log(this.$route.params)
          }
        },
        components: {
          Header,
          Menu,
          Submenu,
          MenuGroup,
          MenuItem,
          Icon,
          Button
        }
    }
</script>

<style>
  .ivu-layout-header{
    background:white;
  }

</style>
