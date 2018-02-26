import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Course from '@/components/Course'
import Apple from '@/components/Apple'
import Banana from '@/components/Banana'
import ManageCourse from '@/components/ManageCourse'
import TableDemo from '@/components/TableDemo'
import SleepingBeauty from '@/components/SleepingBeauty'

Vue.use(Router)

export default new Router({
  mode:'history', // 地址栏中不会有哈希值
  routes: [
    // {
    //   path:'/',
    //   redirect:'/course'     // 重定向
    // },
    {
      // path: '/',
      // name: 'SleepingBeauty',
      // component: SleepingBeauty,
      path: '/',
      name: 'ManageCourse',
      component: ManageCourse,

    },
    // {
    //   path: '/fruit',
    //   // name: 'Course',
    //   components: {   // 需要使用命名视图的时候，需要 component 改为 components !
    //     viewB:Banana,   // 在页面中使用 <router-view /> 的时候，添加 name 属性 , 值 就是组件的属性名 => <router-view name="viewB" />
    //     viewA:Apple
    //   }
    // },
    {
      path:'/ManageCourse',
      name:'ManageCourse',
      component:ManageCourse
    },
    {
      path:'/TableDemo',
      name:'TableDemo',
      component:TableDemo
    }
  ]
})
