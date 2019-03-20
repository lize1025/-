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

//文章详情
var page = 1;
var limit = 3;
var pages = 2;
    window.onload = function(){
        fun();
        var lid = location.search;
        var Lid = lid.slice(4,28);
        ajax('GET','https://dev.apis.ittim.ltd/nBmfc0bTk/posts/details?id='+Lid,(data)=>{
            var article = data.data.article;
            if ("" + article.create_time * 1 === "NaN") {
              var date = new Date(article.create_time);
          } else {
              var date = new Date(+article.create_time);
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
            var img = 'https://dev.apis.ittim.ltd/nBmfc0bTk/static/'+article.author.avatar;
            var imgs = 'https://dev.apis.ittim.ltd/nBmfc0bTk/static/'+article.pic;

            document.querySelector('.all').innerHTML+=`<div class="main">
              <div class="title">
                <span>${article.title}</span>
               <div class="share">
                   <img src="./img/icon_share.png" alt="" class="title_img">
                   <span>分享</span>
               </div>
            </div>
            <div class="give">
                    <div class="give_left">
                       <img src="${img}" alt="" class="give_img">
                       <span class="give_username">${article.author.name}</span>
                       <span class="give_time">${time}</span>
                       <img src="./img/icon_thumb_up.png" alt="" class="thumb">
                       <span class="thumb_number">${article.look_sum}</span>
                       <img src="./img/icon_saw.png" alt="" class="saw">
                       <span class="saw_number">999</span>
                   </div>
           </div>
           <div class="photo">
               <img src="${imgs}" alt="">
           </div>
           <div class="content">
           ${article.body}
           </div>
           <div class="line"></div>
           <div class="comment_title">文章点评</div>
           <textarea name="" id="" cols="30" rows="10" class="comment" placeholder="我有话要说..."></textarea>
           <button class="get" onclick="add();">提交</button>
           <div class="comment_titles">最近评论</div>   
       </div>`
        },null)
        var lid = location.search;
        var article = lid.slice(4,28);
         ajax('GET','https://dev.apis.ittim.ltd/nBmfc0bTk/comment/list?article='+article+'&limit='+limit+'&page='+page,(data)=>{
          var arr = data.data.comments;
          for(var i=0;i<arr.length;i++){
            if ("" + arr[i].create_time * 1 === "NaN") {
              var date = new Date(arr[i].create_time);
          } else {
              var date = new Date(+arr[i].create_time);
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
            var img = 'https://dev.apis.ittim.ltd/nBmfc0bTk/static/'+arr[i].author.avatar;
            document.querySelector('.main').innerHTML+=`
            <div class="lines"></div>
            <div class="give">
                  <div class="give_left">
                     <img src="${img}" alt="" class="give_img">
                     <span class="give_username">${arr[i].author.name}</span>
                     <span class="give_time">${time}</span>
                     <img src="./img/icon_thumb_up.png" alt="" class="thumb">
                     <span class="thumb_number">${arr[i].praise_sum}</span>
                 </div>
                 <div class="give_comment">${arr[i].body}</div>
         </div>
          <div class="linese"></div>`
        }
        },null)
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
    if(page==pages){
      pages++;
      //'https://dev.apis.ittim.ltd/nBmfc0bTk/posts/list?page='+page+'&limit='+limit
      var lid = location.search;
      var article = lid.slice(4,28);
       ajax('GET','https://dev.apis.ittim.ltd/nBmfc0bTk/comment/list?article='+article+'&limit='+limit+'&page='+page,(data)=>{
        var arr = data.data.comments;
        for(var i=0;i<arr.length;i++){
          if ("" + arr[i].create_time * 1 === "NaN") {
            var date = new Date(arr[i].create_time);
        } else {
            var date = new Date(+arr[i].create_time);
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
          var img = 'https://dev.apis.ittim.ltd/nBmfc0bTk/static/'+arr[i].author.avatar;
          document.querySelector('.main').innerHTML+=`
          <div class="lines"></div>
          <div class="give">
                <div class="give_left">
                   <img src="${img}" alt="" class="give_img">
                   <span class="give_username">${arr[i].author.name}</span>
                   <span class="give_time">${time}</span>
                   <img src="./img/icon_thumb_up.png" alt="" class="thumb">
                   <span class="thumb_number">${arr[i].praise_sum}</span>
               </div>
               <div class="give_comment">${arr[i].body}</div>
       </div>
        <div class="linese"></div>`
      }
      },null)
      page++;
    }
  }

};

//给页面绑定滑轮滚动事件
if (document.addEventListener) {
document.addEventListener('DOMMouseScroll', scrollFunc, false);
}
//滚动滑轮触发scrollFunc方法
window.onmousewheel = document.onmousewheel = scrollFunc;





//写文章
function write(){
  console.log(1)
  window.location.href = 'http://localhost:8080/write.html';

}

//用户渲染
function fun(){
  var user = JSON.parse(localStorage.getItem('user'));
  var img = 'https://dev.apis.ittim.ltd/nBmfc0bTk/static/'+user.avatar;
  document.querySelector('.uimg').src = img;
  document.querySelector('.user_id').innerHTML = user.name;
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

//发表评论
  function add(){
    var lid = location.search;
    var article = lid.slice(4,28);
    var body = document.querySelector('.comment').value;
    var token = localStorage.token;
    ajax('POST','https://dev.apis.ittim.ltd/nBmfc0bTk/comment/add',(data)=>{
        if(data.code='SUCCESS'){
          alert('发表成功')
        }
    },'article='+article+'&token='+token+'&body='+body)
  }


