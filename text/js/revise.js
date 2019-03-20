//ajax封装
function ajax(method, url, cb, params) {
   if (window.XMLHttpRequest) {
     var Ajax = new XMLHttpRequest(); // E7+、Firefox、Chrome、Safari 以及 Opera
   } else {
     var Ajax = new ActiveXObject("Microsoft.XMLHTTP"); //IE6浏览器创建ajax对象
   }
   Ajax.open(method, url, true);
   Ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  //设置请求头类型，POST请求时必须设置
   Ajax.withCredentials = true; // **设置该属性后调用接口才会弹框提示授权**
   Ajax.send(params); // 发送请求
   Ajax.onreadystatechange = function () {
     if (Ajax.readyState == 4) { // 请求已完成，且响应已就绪
       if (Ajax.status == 200) { 
         var data = JSON.parse(Ajax.response) // 将JSON字符串转化为JSON对象
         cb(data); //成功的时候调用这个方法
       } else {
         // ...异常处理
       }
     }
   };
 }

 //获取验证码
function getcode(){
   var PhoneNumber =  document.getElementById('phone').value;
   ajax('GET','https://dev.apis.ittim.ltd/nBmfc0bTk/captcha?phone='+PhoneNumber+'&type=reset',(data)=>{
      var code = data.captcha;
      if(PhoneNumber ==""){
         alert('请输入手机号')
      }
      else{
         alert(code);
      }
   },null);
 }

 //重置密码
 function reset(){
  var PhoneNumber =  document.getElementById('phone').value;
  var Code = document.getElementById('code').value;
  var PassWord = document.getElementById('passworld').value;
  var token = localStorage.token;
  console.log(token,Code,PassWord)
    ajax('POST','https://dev.apis.ittim.ltd/nBmfc0bTk/account/reset',(data)=>{
        if(data.code=='SUCCESS'){
          window.location.href = 'http://localhost:8080/login.html';
        }
    },'password='+PassWord+'&captcha='+Code+'&token='+token);
}
