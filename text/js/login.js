
//点击切换
function login(){
   var register = document.querySelector(".main");
   var login = document.querySelector(".main2");
   var l1 = document.querySelector("#l1")
   register.style.display="none";
   login.style.display="block";
   l1.style.color = "#7F4A88";
}
function l2(){
   var register = document.querySelector(".main");
   var login = document.querySelector(".main2");
   var l2 = document.querySelector("#l2");
   var l1 = document.querySelector("#l1")
   register.style.display="block";
   login.style.display="none";
   l2.style.color = "#7F4A88";
   l1.style.color = "white"
}

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
   var PhoneNumber =  document.getElementsByClassName('phone')[0].value;
   ajax('GET','https://dev.apis.ittim.ltd/nBmfc0bTk/captcha?phone='+PhoneNumber+'&type=register',(data)=>{
      var code = data.captcha;
      if(PhoneNumber ==""){
         alert('请输入手机号')
      }
      else{
         alert(code);
      }
   },null);
 }

//注册账户
function register(){
    var PhoneNumber =  document.getElementById('phone').value;
    var Code = document.getElementById('code').value;
    var PassWorld = document.getElementById('passworld').value;
    ajax('POST','https://dev.apis.ittim.ltd/nBmfc0bTk/account/register',(data)=>{
     if(data.code='SUCCESS'){
      alert('注册成功！点击确定跳转至登陆界面');
      login();
     }
     },'account='+PhoneNumber+'&password='+PassWorld+'&captcha='+Code);
}

//登录账户
function Login(){
   var PhoneNumber =  document.getElementsByClassName('phones')[0].value;
   var PassWorld = document.getElementsByClassName('passworlds')[0].value;
   ajax('POST','https://dev.apis.ittim.ltd/nBmfc0bTk/account/login',(data)=>{
     localStorage.token = data.data.user.token;
     var user = JSON.stringify(data.data.user);
     localStorage.setItem('user',user);
      if(data.code == 'SUCCESS'){
         window.location.href='http://localhost:8080/setting.html';
         console.log(data.code)
      }
     },'account='+PhoneNumber+'&password='+PassWorld);
}

