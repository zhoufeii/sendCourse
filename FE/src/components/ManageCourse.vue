<template>
  <div>
    <div style="margin: 50px 0px;display: flex">
      <div id="subjectConfig">
        <h3>科目配置</h3>
        <div class="form_node">
          <label>课程 : </label>
          <Input v-model="newSubject" placeholder="请输入课程" clearable style="width: 200px"/>
          <Button id="saveSubject" @click="saveSubject">添加科目</Button>
        </div>
      </div>
      <div id="courseConfig">
        <h3>课程配置</h3>
        <div class="form_node">
          <label>学期 : </label>
          <Select placeholder=" " v-model="schoolYear" style="width:200px">
            <Option v-for="item in schoolYearList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <div class="form_node">
          <label>科目 : </label>
          <Select placeholder=" " v-model="subject" style="width:200px">
            <Option v-for="item in subjectList" :value="item.id" :key="item.value">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="form_node" style="width: 248px">
          <label>周次 : </label>
          <RadioGroup v-model="isSingleWeek" type="button" style="width: 80%">
            <Radio value=0 label="通用"></Radio>
            <Radio value=1 label="单周"></Radio>
            <Radio value=2 label="双周"></Radio>
          </RadioGroup>
        </div>
        <div class="form_node">
          <label>星期 : </label>
          <Select placeholder=" " v-model="weekday" style="width:200px">
            <Option v-for="item in weekdayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>

        <div class="form_node">
          <label>教室 : </label>
          <Input v-model="classRoom" placeholder="请输入教室" clearable style="width: 200px"/>
        </div>
        <div class="form_node">
          <label>时间 : </label>
          <TimePicker :steps="[1, 5]" v-model="timeRange" hide-disabled-options :disabled-hours="[0,1,2,3,4,5,6,7,22,23]" format="HH:mm" type="timerange" placement="bottom-end" placeholder="课程的开始和结束时间"></TimePicker>
        </div>
        <div class="form_node">
          <label>开始周 : </label>
          <Select placeholder=" " v-model="beginWeek" style="width:200px">
            <Option v-for="item in weeks" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </div>
        <div class="form_node">
          <label>结束周 : </label>
          <Select placeholder=" " v-model="endWeek" style="width:200px">
            <Option v-for="item in weeks" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </div>
        <div>
          <Button @click="saveCourse">添加课程</Button>
        </div>
      </div>
    </div>
    <div style="margin-top: 30px;display: flex;justify-content: center">
      <Table size="small" width="800" :loading="loading" border :columns="columns" :data="tableData"></Table>
    </div>
  </div>

</template>

<script>
  import { Input , Button , Table , Select , Option , TimePicker , Radio , RadioGroup} from 'iview'
  import util from '../../../BE/util/util'


  export default{
    name:'',
    data(){
      return {
        newSubject:'',
        schoolYear:'',
        schoolYearList:[
          {
            value: '201701',
            label: '2017学年第一学期'
          },
          {
            value: '201702',
            label: '2017学年第二学期'
          },
          {
            value: '201801',
            label: '2018学年第一学期'
          },
          {
            value: '201802',
            label: '2018学年第二学期'
          },
          {
            value: '201901',
            label: '2019学年第一学期'
          },
          {
            value: '201902',
            label: '2019学年第二学期'
          }
        ],
        subject:'',
        subjectList:[],
        weekday:'',
        weekdayList:[
          {
            value:1,
            label:'星期一'
          },
          {
            value:2,
            label:'星期二'
          },
          {
            value:3,
            label:'星期三'
          },
          {
            value:4,
            label:'星期四'
          },
          {
            value:5,
            label:'星期五'
          },
          {
            value:6,
            label:'星期六'
          },
          {
            value:7,
            label:'星期日'
          },
        ],
        beginWeek:'',
        endWeek:'',
        weeks:[],
        timeRange:'',
        classRoom:'',
        isSingleWeek:0,   // 0 : 普通课程 , 1 : 单周课程 , 2 : 双周课程,
        tableData:[],
        columns: [
          {
            title: 'ID',
            key: 'id'
          },
          {
            title: '科目',
            key: 'name'
          }
        ],
        loading:false
      }
    },
    methods:{
      // 获取科目列表
      getSubject(){
        this.loading = true;
        this.func.ajaxGet(this.api.subjectList, res => {
          debugger;
          this.tableData = res.data.subject;
          this.subjectList = res.data.subject
          this.loading = false;
        });
      },

      // 保存科目
      saveSubject(){
        console.log(this.newSubject)
        console.log('--')
        if(this.newSubject.trim() !== ''){
          this.func.ajaxPost(this.api.subjectAdd,{
            subject:this.newSubject
          }, res => {
            debugger;
            if(res.data.message === '重复'){
              this.$Notice.warning({
                title: '添加新科目',
                desc: '此科目已存在'
              });
              return ;
            }else{
              this.$Notice.success({
                title: '添加新科目',
                desc: '添加成功'
              });
              this.newSubject = '';
              this.getSubject()
            }
          });
        }else{
          this.$Notice.warning({
            title: '添加新科目',
            desc: '科目不可为空'
          });
        }

      },

      // 保存课程
      saveCourse(){
        console.log(this.schoolYear);
        console.log(this.subject);
        console.log(this.weekday);
        console.log(this.classRoom);
        console.log(this.isSingleWeek);
        console.log(this.timeRange);
        console.log(this.beginWeek);
        console.log(this.endWeek);
//        let startTime = this.timeRange[0].getHours() +':' + (this.timeRange[0].getMinutes()<10 ? '0'+this.timeRange[0].getMinutes() : this.timeRange[0].getMinutes());
        let startTime = util.myFormatDate(this.timeRange[0].getHours(),this.timeRange[0].getMinutes());
//        let endTime = this.timeRange[1].getHours() +':' + (this.timeRange[1].getMinutes()<10 ? '0'+this.timeRange[1].getMinutes() : this.timeRange[1].getMinutes());
        let endTime = util.myFormatDate(this.timeRange[1].getHours(),this.timeRange[1].getMinutes());
        debugger;
        switch (this.isSingleWeek){
          case '通用':
            this.isSingleWeek = 0;
            break;
          case '单周':
            this.isSingleWeek = 1;
            break;
          case '双周':
            this.isSingleWeek = 2;
            break;
        }

//        if(this.newSubject.trim() !== ''){
          this.func.ajaxPost(this.api.courseAdd,{

            subject:this.subject,
            schoolYear:this.schoolYear,
            weekday:this.weekday,
            classRoom:this.classRoom,
            isSingleWeek:this.isSingleWeek,
            startTime:startTime,
            endTime:endTime,
            beginWeek:this.beginWeek,
            endWeek:this.endWeek,

          }, res => {
            debugger;
            console.log(res.data)
            this.$Notice.success({
              title:'添加课程',
              desc:'课程添加成功'
            })
          });
//        }
      },

      // 自动填写学期
      getSchoolYear(){
        var date = new Date();
        var begin2017second = new Date('2018/03/03');
        var end2017second = new Date('2018/07/10');
        var begin2018first = new Date('2018/09/15');
        var end2018first = new Date('2018/01/13');
        var begin2018second = new Date('2019/03/03');
        var end2018second = new Date('2019/07/10');

        if(begin2017second < date <end2017second){
          this.schoolYear = '201702'
        }else if(begin2018first < date < end2018first){
          this.schoolYear = '201801'
        }else if(begin2018second < date <end2018second){
          this.schoolYear = '201802'
        }
      },

      // 遍历这个学期的周数
      getWeeks(weeks){
        for(let i = 1;i<weeks+1;i++){
          this.weeks.push(i);
        }
      }
    },
    created(){
      // 在进入页面的时候调用查询接口，获取当前已添加的科目
      this.getSubject();
      this.getSchoolYear();
      this.getWeeks(17)

    },
    computed:{

    },
    components:{
      Input,
      Button,
      Table,
      Select,
      Option,
      TimePicker,
      RadioGroup,
      Radio
    }
  }
</script>

<style scoped="ManageCourse">
  .form_node{
    margin: 20px 0;
  }
  label{
    display: inline-block;
    margin-right: 14px;
  }

  #subjectConfig,#courseConfig{
    width: 50%;
  }

  #subjectConfig{
    border-right: 1px solid #f0f0f0;
  }

  #saveSubject{
    margin-left: 20px;
  }

  #courseConfig .form_node{
    display: inline-block;
    margin:20px;
  }
</style>
