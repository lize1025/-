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
