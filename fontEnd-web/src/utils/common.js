/**
 * 防抖
 * @param   func-回调函数; wait-延迟执行的毫秒; immediate：true表立即执行，false表示非立即执行
 * @return   yyyy-MM-dd hh:mm 格式的时间
 */
export function debounce(func, wait, immediate){
  let timeout;
  return function () {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
    }, wait)
      if (callNow) func.apply(context, args)
    }
    else {
      timeout = setTimeout(function(){
        func.apply(context, args)
      }, wait);
    }
  }
}

/**
 * 邮箱校验
 * @param   value-要验证的值
 * @return   true：通过，false：不通过
 */
export function checkEmail(value){
  if (!value) return ;
  var regEmail = /^\w+@\w+\.[a-z]{2,6}$/;
  return regEmail.test(value)
}

/**
 * 时间戳转时间
 * @param   timeStamp-时间戳
 * @return   正常时间YYYY-mm-dd HH:mm:ss
 */
export function toNomalTime (timeStamp) {
  var date = new Date(parseInt(timeStamp));
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = date.getDate()<10?'0'+data.getDate(): date.getDate() + ' ';
  var h = (date.getHours()<10?'0'+date.getHours(): date.getHours()) + ':';
  var m = (date.getMinutes()<10?'0'+date.getMinutes(): date.getMinutes()) + ':';
  var s = (date.getSeconds()<10?'0'+date.getSeconds(): date.getSeconds());
  return Y+M+D+h+m+s;
};

/**
 * 时间戳转日期
 * @param   timeStamp-日期
 * @return   正常时间YYYY-mm-dd
 */
export function toNomalDate (timeStamp) {
  var date = new Date(parseInt(timeStamp));
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = date.getDate()<10?'0'+data.getDate(): date.getDate();
  return Y+M+D;
};

/**
 * 获取最近七天的日期
 * @param   num为0当天，-1为前一天
 * @return  YYYY-mm-dd
 */
export function getDay(day){
  var today = new Date();
  var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
  today.setTime(targetday_milliseconds); //注意，这行是关键代码
  var tYear = today.getFullYear();
  var tMonth = today.getMonth();
  var tDate = today.getDate();
  tMonth = doHandleMonth(tMonth + 1);
  tDate = doHandleMonth(tDate);
  return tYear+"-"+tMonth+"-"+tDate;
}
function doHandleMonth(month){
  var m = month;
  if(month.toString().length == 1){
    m = "0" + month;
  }
  return m;
}
