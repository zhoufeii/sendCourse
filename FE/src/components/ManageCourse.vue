<template>
  <div style="margin-top: 30px;display: flex;justify-content: space-around">
    <div>
      <Table size="small" width="300" :loading="loading" border :columns="subjectColumns" :data="subjectData" ></Table>
    </div>
    <div style="height: 650px;width: 2px;background: #f0f0f0"></div>
    <div>
      <Table width="1000" size="small" :loading="loading" border :columns="coursecClumns" :data="courseData" ></Table>
    </div>
  </div>
</template>

<script>
  import { Table } from 'iview'
  import util from '../../../BE/util/util'


  export default{
    name:'',
    data(){
      return {

        loading:false,
        subjectData:[],
        subjectColumns: [
          {
            title: '科目',
            key: 'name'
          }
        ],
        courseData:[
          {
            Monday:'第一节',
            Tuesday:'一'
          },
          {
            Monday:'第二节'
          }
        ],
        coursecClumns:[
          {
            title: '星期一',
            key: 'Monday'
          },
          {
            title: '星期二',
            key: 'Tuesday'
          },
          {
            title: '星期三',
            key: 'Wednesday'
          },
          {
            title: '星期四',
            key: 'Thrsday'
          },
          {
            title: '星期五',
            key: 'Friday'
          },
          {
            title: '星期六',
            key: 'Saturday'
          },
          {
            title: '星期天',
            key: 'Sunday'
          },
          {
            title: '操作',
            key: 'edit'
          },
        ],

      }
    },
    methods:{
      // 获取科目列表
      getSubject(){
        this.loading = true;
        this.func.ajaxGet(this.api.subjectList, res => {
          debugger;
          this.subjectData = res.data.subject;
          this.subjectList = res.data.subject
          this.loading = false;
        });
      },


    },
    created(){
      // 在进入页面的时候调用查询接口，获取当前已添加的科目
      this.getSubject();


    },
    computed:{

    },
    components:{
      Table
    }
  }
</script>

<style scoped="ManageCourse">
td>div{
  text-align: center;
}
</style>
