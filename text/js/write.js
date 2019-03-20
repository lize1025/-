/**
 * 原生AJAX封装函数
 * @param {String} url 请求接口地址
 * @param {function} cb 请求成功后执行函数
 * @param {object} params 请求时传递参数(formData格式)
 */
function ajax(url, cb, params) {
    if (window.XMLHttpRequest) {
      var Ajax = new XMLHttpRequest(); // E7+、Firefox、Chrome、Safari 以及 Opera
    } else {
      var Ajax = new ActiveXObject("Microsoft.XMLHTTP"); //IE6浏览器创建ajax对象
    }
    Ajax.open('POST', url, true);
    // 请求头会自动添加，无需设置，否则服务器报错
    Ajax.send(params); // 发送请求
    Ajax.onreadystatechange = function () {
      if (Ajax.readyState == 4) { // 请求已完成，且响应已就绪
        if (Ajax.status == 200) { 
          cb(JSON.parse(Ajax.response)); //成功的时候调用这个方法
        } else {
          // ...异常处理
        }
      }
    };
  }

  //图片预览
  window.onload = function(){
  var fileInput = document.querySelector('input[type=file]');
  var previewImg = document.querySelector('.imgs');
  fileInput.addEventListener('change', function () {
      var file = this.files[0];
      // 获取文件读取对象
      var reader = new FileReader();
      // 文件读取完后的展示图片
      reader.addEventListener('load', function () {
          previewImg.src = reader.result;
      }, false);
      reader.readAsDataURL(file);
  }, false);
}


//发表文章
function add(){
    var file = document.querySelector('.file').files[0];
    var title = document.querySelector('.tit').value;
    var body = document.querySelector('.body').value;
    var formData = new FormData();
    var token = localStorage.token;
    formData.append('pic',file); // 此处file为用户上传图片
    formData.append('token',token);
    formData.append('body',body);
    formData.append('title', title);
    ajax('https://dev.apis.ittim.ltd/nBmfc0bTk/posts/add', (data)=>{
      alert('发表成功');
      window.location.href='http://localhost:8080/list.html';
    }, formData)
}