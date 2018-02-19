
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
    }
}

