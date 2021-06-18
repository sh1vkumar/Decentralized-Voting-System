document.getElementById("open-popup-btn").addEventListener("click",Active);
function Active(){
  setTimeout(function(){
    document.getElementsByClassName("popup")[0].classList.add("active");
},4000)};
document.getElementById("dismiss-popup-btn").addEventListener("click",function(){
document.getElementsByClassName("popup")[0].classList.remove("active");
});