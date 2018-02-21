
module.exports = {
    add0(m){
        return m<10?'0'+m:m;
    },
    formatDate(needTime){
        //needTime是整数，否则要parseInt转换
        var time = new Date(needTime);
        // var y = time.getFullYear();
        // var m = time.getMonth()+1;
        // var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        // var s = time.getSeconds();
        return this.add0(h)+':'+this.add0(mm);
    },
    myFormatDate(hour,minute){
        hour = hour < 10 ? '0'+hour : hour;
        minute = minute < 10 ? '0'+minute : minute;

        return hour +':'+ minute;
    },
    switchWeekDay(weekday){
        switch (weekday){
            case 1:
                weekday = '一';
                break;
            case 2:
                weekday = '二';
                break;
            case 3:
                weekday = '三';
                break;
            case 4:
                weekday = '四';
                break;
            case 5:
                weekday = '五';
                break;
            case 6:
                weekday = '六';
                break;
            case 7:
                weekday = '天';
                break;
        }
        return weekday;
    }
}

