let highlight_image=(t,e)=>{t.setAttribute("src",e.getAttribute("src")),t.setAttribute("alt",e.getAttribute("alt"))};window.addEventListener("DOMContentLoaded",()=>{let e=document.querySelector(".picture-highlight__image");for(control of document.querySelectorAll(".picture-control"))control.addEventListener("click",t=>{highlight_image(e,t.target)}),control.addEventListener("focus",t=>{highlight_image(e,t.target.querySelector(".picture-control__image"))})});