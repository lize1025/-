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


//用户头像预览
    var fileInput = document.querySelector('input[type=file]');
    var previewImg = document.querySelector('.imgs');
    var span = document.querySelector('.more');
    fileInput.addEventListener('change', function () {
       
        var file = this.files[0];
        // 获取文件读取对象
        if(previewImg.size/1024>300){
            alert('上传对象不能大于300k')
        }
        else{
        var reader = new FileReader();
        // 文件读取完后的展示图片
        reader.addEventListener('load', function () {
            previewImg.src = reader.result;
        }, false);
        reader.readAsDataURL(file);
        if(previewImg.src!=""){
            span.style.display="none"
        }
    }
    }, false);

//用户性别
function man(){
     var man = document.getElementsByClassName('man')[0];
     var woman = document.getElementsByClassName('woman')[0];
     man.src = '../img/icon_choose.png';
     woman.src = '../img/icon_unchoose.png';
}
function woman(){
    var man = document.getElementsByClassName('man')[0];
    var woman = document.getElementsByClassName('woman')[0];
    man.src = '../img/icon_unchoose.png';
    woman.src = '../img/icon_choose.png';
}

//用户星座
    window.onload = function(){
        fun();
        ajax('GET','http://localhost:8080/xingzuo.json',(data)=>{
            var arr = data.data.constellations
            for (var i =0; i < arr.length; i++){
                var constel = document.getElementById('constel');
                constel.innerHTML+="<option value="+arr[i]+">"+arr[i]+"</option>";
            } 
        },null)
    }

//用户城市

//省份
      ajax('GET','https://dev.apis.ittim.ltd/nBmfc0bTk//city/province',(data)=>{
          var provinceTag = document.getElementById("province");
          var provinceList = data.data.province;
           for(var i=0; i<provinceList.length; i++){
              var province = provinceList[i];
              var provinceName = province.name;
              var  proId = provinceList[i].ProID; 
              provinceTag.add(new Option(provinceName,proId));
          }
      },null);

//城市
      function provinceId(){
        var provinceTag = document.getElementById("province").value;
        document.getElementById("city").innerHTML=`<option value="2">请选择城市</option>`;
        ajax('GET','https://dev.apis.ittim.ltd/nBmfc0bTk//city/city?ProID='+provinceTag,(data)=>{
        var cityTag = document.getElementById("city");
          var cityList = data.data.city;
           for(var i=0; i<cityList.length; i++){
              var city = cityList[i];
              var cityName = city.name;
              var cityId = cityList[i].CityID; 
              cityTag.add(new Option(cityName,cityId));
          }
        },null)
      }

//区
      function city(){
        var cityTag = document.getElementById("city").value;
        document.getElementById("area").innerHTML=`<option value="2">请选择区</option>`;
        ajax('GET','https://dev.apis.ittim.ltd/nBmfc0bTk//city/area?CityID='+cityTag,(data)=>{
          var areaTag = document.getElementById("area");
          var areaList = data.data.area;
           for(var i=0; i<areaList.length; i++){
              var area = areaList[i];
              var areaName = area.DisName;
              var areaId = areaList[i].Id; 
              areaTag.add(new Option(areaName,areaId));
          }
        },null)
      }

//跳转修改密码页面
      function reset(){
        window.location.href='http://localhost:8080/revise.html';
      }


//原生AJAX封装函数
      function ajaxs(url, cb, params) {
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


//保存账户信息
      function profile(){
        var formData = new FormData()
        var token = localStorage.token;
        var avatar = document.querySelector('.file').files[0];
        var man = document.querySelector('.man').src;
        if(man == "http://localhost:8080/img/icon_unchoose.png"){
           var gender = 'woman';
        }else{
          gender = 'man';
        }
        var province = document.getElementById('province').value;
        var citys = document.getElementById('city').value;
        var area = document.getElementById('area').value;
        var cityes = new Array();
        cityes.push(+province);
        cityes.push(+citys);
        cityes.push(+area);
        var city = JSON.stringify(cityes);
        var constellations = document.getElementById('constel').value;  
        var name = document.getElementById('name').value; 
        console.log(avatar)

         formData.append('avatar', avatar) // 此处file为用户上传图片
  
         formData.append('token',token)
  
         formData.append('gender',gender)
  
         formData.append('constellations', constellations)
  
         formData.append('city',city)
  
         formData.append('name',name)
  
         ajaxs('https://dev.apis.ittim.ltd/nBmfc0bTk/account/profile', (data)=>{
             if(data.code == 'SUCCESS'){
               alert('成功')
             }
         }, formData)
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