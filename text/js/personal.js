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


//用户渲染
var page = 1;
var limit =3;
var pages = 2;  
window.onload = function fun(){
    var user = JSON.parse(localStorage.getItem('user'));
    var img = 'https://dev.apis.ittim.ltd/nBmfc0bTk/static/'+user.avatar;
    document.querySelector('.uimg').src = img;
    document.querySelector('.user_id').innerHTML = user.name;
    document.querySelector('.bigimg').src = img;
    document.querySelector('.id').innerHTML = user.name;
    ajax('GET','https://dev.apis.ittim.ltd/nBmfc0bTk/posts/list?page='+page+'&limit='+limit,(data)=>{
        var articles = data.data.articles;
        for (var i=0;i<articles.length;i++){
          if ("" + articles[i].create_time * 1 === "NaN") {
            var date = new Date(articles[i].create_time);
        } else {
            var date = new Date(+articles[i].create_time);
        }

        var time = "";
        if (date.getHours() < 10) {
            time += "0" + date.getHours();
        } else {
            time += date.getHours();
        }
        time += ":"
        if (date.getSeconds() < 10) {
            time += "0" + date.getSeconds();
        } else {
            time += date.getSeconds();
        }
            var img = articles[i].cover?'https://dev.apis.ittim.ltd/nBmfc0bTk/static/'+articles[i].cover:'http://localhost:8080/img/bg_signin.jpg';
            document.querySelector('.all').innerHTML+= `<div class="main" onclick="Lid('${articles[i]._id}');">
            <div class="main_left" >
                <img src=${img} alt="" class="main_img">
            </div>
            <div class="main_right">
                <div class="main_title">
                    <span>${articles[i].title}</span>
                </div>
                <div class="main_content">
                    <span>
                        ${articles[i].abstract?articles[i].abstract:'哈哈哈'}
                    </span>
                </div>
                <div class="give">
                    <div class="give_left">
                        <img src=${'https://dev.apis.ittim.ltd/nBmfc0bTk/static/'+articles[i].author.avatar} alt="" class="give_img"">
                        <span class="give_username">${articles[i].author.name}</span>
                        <span class="give_time">${time}</span>
                    </div>
                    <div class="give_right">
                        <img src="./img/icon_thumb_up.png" alt="" class="thumb">
                        <span class="thumb_number">${articles[i].look_sum}</span>
                        <img src="./img/icon_saw.png" alt="" class="saw">
                        <span class="saw_number">${articles[i].praise_sum?articles[i].praise_sum :0}</span>
                    </div>
                </div>
            </div>
        </div>`;
        }
     },null);
     page+=1;
 }


//页面加载   
var scrollFunc = function () {
  // 获取加载中元素
  var loading = document.getElementsByClassName('loading')[0];
  // getBoundingClientRect().top指元素距离浏览器窗口顶部的距离。
  // offsetHeight指元素的高度。
  // document.body.clientHeight指文档body的高度。
  // loading.getBoundingClientRect().top+loading.offsetHeight<document.body.clientHeigh说明元素位于窗口之中
  if (loading.getBoundingClientRect().top+loading.offsetHeight<document.documentElement.clientHeight) {
  // 当正在加载图标出现在视窗中时，请求下一页文章列表。
  // 请求文章列表接口。
    console.log(loading.getBoundingClientRect().top,loading.offsetHeight,document.documentElement.clientHeight);
    console.log(loading.getBoundingClientRect().top+loading.offsetHeight<document.documentElement.clientHeight);

    if(page==pages){
      pages++;
      //'https://dev.apis.ittim.ltd/nBmfc0bTk/posts/list?page='+page+'&limit='+limit
  ajax('GET','http://localhost:8080/list.json',(data)=>{
var articles = data.data.articles;
    for (var i=0;i<articles.length;i++){
      if ("" + articles[i].create_time * 1 === "NaN") {
        var date = new Date(articles[i].create_time);
    } else {
        var date = new Date(+articles[i].create_time);
    }

    var time = "";
    if (date.getHours() < 10) {
        time += "0" + date.getHours();
    } else {
        time += date.getHours();
    }
    time += ":"
    if (date.getSeconds() < 10) {
        time += "0" + date.getSeconds();
    } else {
        time += date.getSeconds();
    }
        var img = articles[i].cover?'https://dev.apis.ittim.ltd/nBmfc0bTk/static/'+articles[i].cover:'http://localhost:8080/img/bg_signin.jpg';
        document.querySelector('.all').innerHTML+= `<div class="main" onclick="Lid('${articles[i]._id}');">
        <div class="main_left" >
            <img src=${img} alt="" class="main_img">
        </div>
        <div class="main_right">
            <div class="main_title">
                <span>${articles[i].title}</span>
            </div>
            <div class="main_content">
                <span>
                    ${articles[i].abstract?articles[i].abstract:'哈哈哈'}
                </span>
            </div>
            <div class="give">
                <div class="give_left">
                    <img src=${'https://dev.apis.ittim.ltd/nBmfc0bTk/static/'+articles[i].author.avatar} alt="" class="give_img"">
                    <span class="give_username">${articles[i].author.name}</span>
                    <span class="give_time">${time}</span>
                </div>
                <div class="give_right">
                    <img src="./img/icon_thumb_up.png" alt="" class="thumb">
                    <span class="thumb_number">${articles[i].look_sum}</span>
                    <img src="./img/icon_saw.png" alt="" class="saw">
                    <span class="saw_number">${articles[i].praise_sum?articles[i].praise_sum :0}</span>
                </div>
            </div>
        </div>
    </div>`;
    }
       page++;
},null);
    }
  }

};
//给页面绑定滑轮滚动事件
if (document.addEventListener) {
  document.addEventListener('DOMMouseScroll', scrollFunc, false);
}
//滚动滑轮触发scrollFunc方法
window.onmousewheel = document.onmousewheel = scrollFunc;


 
 function Lid(data){
    window.location.href='http://localhost:8080/details.html?id='+data;
}



//菜单
 function setting(){
   var up = document.querySelector('.up');
   var set = document.querySelector('.setting');
   var triangle = document.querySelector('.triangle');
   var img = 'http://localhost:8080/img/icon_arrow_down.png';
   var imgs = 'http://localhost:8080/img/icon_arrow_up.png';
   if(up.src == img){
       set.style.display = 'block';
       triangle.style.display = 'block';
       up.src = imgs;
   }else if(up.src == imgs){
       set.style.display = 'none';
       triangle.style.display = 'none';
       up.src = img;
   }
 }

//跳转
 function user(){
   window.location.href='http://localhost:8080/personal.html'
 }
 function set(){
   window.location.href='http://localhost:8080/setting.html'
 }
 function exit(){
   window.location.href='http://localhost:8080/login.html'
   localStorage.clear();
 }