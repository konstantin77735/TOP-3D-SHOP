document.addEventListener("DOMContentLoaded",()=>{class t{constructor(t){const{targetSelector:e,popupElemSelector:i,overlaySelector:s,windowSelector:h,closeBtnSelector:o,displayPopup:n,popupHeight:r,popupWidth:l,disappearingTime:a,disappearingType:p,slidingTime:d,slidingType:c,slidingDir:u,autocloseTime:g,closeOnMiss:y,closeOnKeys:m}=t;this.targetSelector=e,this.popupElemSelector=i,this.overlaySelector=s,this.windowSelector=h,this.closeBtnSelector=o,this.displayPopup=n,this.popupHeight=r,this.popupWidth=l,this.disappearingTime=a,this.disappearingType=p||"ease",this.slidingTime=d,this.slidingType=c||"ease",this.slidingDir=u||"left",this.autocloseTime=g,this.closeOnMiss=y,this.closeOnKeys=m,this.popupTrigger=document.querySelector(`${this.targetSelector}`),this.popupElem=document.querySelector(`${this.popupElemSelector}`),this.popupOverlay=document.querySelector(`${this.overlaySelector}`),this.popupWindow=document.querySelector(`${this.windowSelector}`),this.closeBtn=document.querySelector(`${this.closeBtnSelector}`),this.init()}init(){if(this.disappearance(),this.popupTrigger.addEventListener("click",this.appearance.bind(this)),this.popupTrigger.addEventListener("touchstart",this.appearance.bind(this)),this.closeBtn.addEventListener("click",this.disappearance.bind(this)),this.closeBtn.addEventListener("touchstart",this.disappearance.bind(this)),this.closeOnMiss&&(this.popupElem.addEventListener("click",t=>{t.target.classList.contains(`${this.overlaySelector.slice(1)}`)&&this.disappearance()}),this.popupElem.addEventListener("touchstart",t=>{t.target.classList.contains(`${this.overlaySelector.slice(1)}`)&&this.disappearance()})),this.closeOnKeys){const t=this.closeOnKeys.replace(/\s+/g,"").split(",");document.addEventListener("keydown",e=>{t.forEach(t=>{parseInt(t,10)===e.keyCode&&this.disappearance()})})}}appearance(){const t=document.documentElement.scrollTop;if(this.popupElem.style.transition=`opacity ${this.disappearingTime/1e3}s ${this.disappearingType}, height 0s ${this.disappearingType} 0s`,document.querySelector("html").style.overflow="hidden",this.popupElem.style.height="0px",this.popupElem.style.top=`${t}px`,this.popupOverlay.style.display="block",this.popupElem.style.display="flex",this.popupElem.style.height=this.popupHeight,this.popupElem.style.width=this.popupWidth,this.popupElem.style.opacity=1,this.slidingType)switch(this.popupWindow.style.transition=`all ${this.slidingTime/1e3}s ${this.slidingType}, height 0s ${this.slidingType} 0s`,this.slidingTime&&this.slidingType&&this.slidingDir){case"left":this.popupWindow.style.left="0px";break;case"right":this.popupWindow.style.right="0px";break;case"top":this.popupWindow.style.top="0px";break;case"bottom":this.popupWindow.style.bottom="0px"}this.autocloseTime&&setTimeout(()=>{this.disappearance()},this.autocloseTime)}disappearance(){if(this.slidingTime&&this.slidingType&&this.slidingDir)switch(this.popupWindow.style.transition=`all ${this.slidingTime/1e3}s ${this.slidingType}, height 0s ${this.slidingType} ${this.slidingTime/1e3}s`,this.slidingDir){case"left":this.popupWindow.style.left="-100%";break;case"right":this.popupWindow.style.right="-100%";break;case"top":this.popupWindow.style.top="-100%";break;case"bottom":this.popupWindow.style.bottom="-100%"}this.popupElem.style.height=0,this.popupElem.style.opacity=0,this.popupElem.style.transition=`opacity ${this.disappearingTime/1e3}s ${this.disappearingType}, height 0s ${this.disappearingType} ${this.disappearingTime/1e3}s`,document.querySelector("html").style.overflow="visible",setTimeout(()=>{this.popupOverlay.style.height="inherit"},this.disappearingTime+100)}}new t({targetSelector:".btn-login",popupElemSelector:".popup-login",overlaySelector:".popup-login__overlay",windowSelector:".popup-login__window",closeBtnSelector:".popup-login__close",displayPopup:"flex",popupHeight:"100vh",popupWidth:"100%",disappearingTime:1e3,disappearingType:"linear",closeOnMiss:!0,closeOnKeys:"27, 67, 88"}),new t({targetSelector:".btn-basket",popupElemSelector:".popup-basket",overlaySelector:".popup-basket__overlay",windowSelector:".popup-basket__window",closeBtnSelector:".popup-basket__close",displayPopup:"flex",popupHeight:"100vh",popupWidth:"100%",disappearingTime:1e3,disappearingType:"linear",closeOnMiss:!0,closeOnKeys:"27, 67, 88"}),new t({targetSelector:".btn-send-resume",popupElemSelector:".popup-resume",overlaySelector:".popup-resume__overlay",windowSelector:".popup-resume__window",closeBtnSelector:".popup-resume__close",displayPopup:"flex",popupHeight:"100vh",popupWidth:"100%",disappearingTime:1e3,disappearingType:"linear",closeOnMiss:!0,closeOnKeys:"27, 67, 88"});new class{constructor(t,e){this.autoplay=e.autoplay,this.autoplayDirection=e.autoplayDirection||"right",this.autoplaySlideTime=e.autoplaySlideTime||4e3,this.currentSlide=e.currentSlide||0,this.slidesToShow=e.slidesToShow||1,this.dotsEnable=e.dotsEnable,this.arrowsEnable=e.arrowsEnable,this.keysEnable=e.keysEnable,this.transitionSpeed=e.speed||1e3,this.transitionType=e.animationType||"ease",this.transition=`transform ${this.transitionSpeed/1e3}s ${this.transitionType}`,this.dotsHeight=e.dotsHeight||"20px",this.dotsWidth=e.dotsWidth||"20px",this.sliderSelector=t,this.slider=document.querySelector(t),this.sliderWrapper=document.querySelector(`${t}__wrapper`),this.slides=this.sliderWrapper.children,this.isRunning=!1,this.eachSlideWidth=100/this.slides.length,this.dotsWrapperClass=`${t.slice(1)}__dots-wrapper`,this.dotClass=`${t.slice(1)}__dot`,this.dotActiveClass="active-dot",this.controlClass=`${t.slice(1)}__control`,this.nextClass="arrow-next",this.prevClass="arrow-prev",this.dots,this.direction,this.iters,this.checkCount,this.checkAutoplay,(()=>{void 0===e.arrowsEnable&&(this.arrowsEnable=!0),void 0===e.dotsEnable&&(this.dotsEnable=!0),void 0===e.keysEnable&&(this.keysEnable=!0)})(),this.beforeInit(),this.init()}setTransition(t){this.sliderWrapper.style.transition=t?this.transition:"none"}pasteSlide(t){switch(t){case"prepend":this.sliderWrapper.prepend(this.sliderWrapper.lastElementChild);break;case"append":this.sliderWrapper.append(this.sliderWrapper.firstElementChild)}}findIters(t){this.currentSlide>t?(this.direction="prev",this.iters=this.currentSlide-t):(this.direction="next",this.iters=t-this.currentSlide)}changeSlide(t){const{y:e}=t;if(!this.isRunning){const t=()=>{this.setTransition(!0),this.sliderWrapper.style.transform=`translateX(-${this.iters*this.eachSlideWidth/this.slidesToShow}%)`},i=t=>{for(let t=this.iters;t>0;t--)this.pasteSlide("prepend");this.sliderWrapper.style.transform=`translateX(-${this.iters*this.eachSlideWidth/this.slidesToShow}%)`,setTimeout(()=>{this.setTransition(!0),this.sliderWrapper.style.transform="translateX(0)"},0)};if(void 0!==e?this.findIters(e):this.iters=1,this.setTransition(!1),this.iters>1)"next"==this.direction&&t(),"prev"==this.direction&&i();else switch(this.direction){case"next":this.currentSlide<this.slides.length-1?this.currentSlide++:this.currentSlide=0,this.dotsEnable&&this.changeDots({dir:this.direction}),t();break;case"prev":i(),this.currentSlide>0?this.currentSlide--:this.currentSlide=this.slides.length-1,this.dotsEnable&&this.changeDots({dir:this.direction})}}}changeDots(t){const{target:e,dir:i}=t;if(!(e&&e.classList.contains(this.dotActiveClass)||!e&&this.isRunning)){this.isRunning=!0;for(let t=0;t<this.dots.length;t++)this.dots[t].classList.remove(this.dotActiveClass),e==this.dots[t]&&(this.dots[t].classList.add(this.dotActiveClass),t<this.currentSlide&&(this.direction="prev",this.currentSlide=t),t>this.currentSlide&&(this.direction="next",this.currentSlide=t)),"next"!=i&&"prev"!=i||this.dots[this.currentSlide].classList.add(this.dotActiveClass)}}check(){let t=this.autoplaySlideTime/1e3+2;if(this.autoplay)switch(this.autoplayDirection){case"right":return this.direction="next",void this.changeSlide({y:this.currentSlide+1});case"left":return this.direction="prev",void this.changeSlide({y:this.currentSlide-1})}if(this.autoplaySlideTime<1e3){let e=String(this.autoplaySlideTime).split(""),i=parseInt(2*(e[0]+e[1]));t=this.autoplaySlideTime/i}this.checkCount++,this.checkCount>=t&&(this.autoplay=!0,this.checkCount=0)}beforeInit(){(()=>{if(this.autoplay&&(this.checkAutoplay=setInterval(this.check.bind(this),this.autoplaySlideTime)),this.keysEnable&&window.addEventListener("keydown",t=>{switch(t.keyCode){case 39:this.autoplay&&(this.autoplay=!1,this.check()),this.isRunning||(this.direction="next",this.changeSlide({y:this.currentSlide+1}));break;case 37:this.autoplay&&(this.autoplay=!1,this.check()),this.isRunning||(this.direction="prev",this.changeSlide({y:this.currentSlide-1}))}}),this.arrowsEnable){const t=document.createElement("img"),e=document.createElement("img"),i=document.createElement("div");i.classList.add(`${this.sliderSelector.slice(1)}__arrow-wrapper`),t.classList.add(this.controlClass),e.classList.add(this.controlClass),t.classList.add(this.nextClass),e.classList.add(this.prevClass),t.setAttribute("src","img/videos-about-us/arrow-r.svg"),e.setAttribute("src","img/videos-about-us/arrow-l.svg"),i.prepend(t),i.prepend(e),this.slider.parentElement.prepend(i),t.style.top="45%",e.style.top="45%",t.addEventListener("click",()=>{this.autoplay&&(this.autoplay=!1,this.check()),this.isRunning||(this.direction="next",this.changeSlide({y:this.currentSlide+1}))}),e.addEventListener("click",()=>{this.autoplay&&(this.autoplay=!1,this.check()),this.isRunning||(this.direction="prev",this.changeSlide({y:this.currentSlide-1}))})}if(this.dotsEnable){const t=document.createElement("li"),e=document.createElement("ul");e.classList.add(this.dotsWrapperClass),t.classList.add(this.dotClass),this.slider.append(e),e.style.width=`${10*this.slides.length}%`,e.style.height=this.dotsHeight;for(let i=0;i<this.slides.length;i++){let s=t.cloneNode();e.append(s),this.dots=document.getElementsByClassName(this.dotClass),s.style.height=this.dotsHeight,s.style.width=this.dotsWidth,this.dots[i].addEventListener("click",t=>{this.autoplay=!1,this.isRunning||(this.check(),this.changeSlide({y:i}),this.changeDots({target:t.target}))}),this.dots[i].addEventListener("touchstart",t=>{this.autoplay=!1,this.isRunning||(this.check(),this.changeSlide({y:i}),this.changeDots({target:t.target}))})}this.dots[this.currentSlide].classList.add(this.dotActiveClass)}this.sliderWrapper.addEventListener("transitionend",()=>{if("next"==this.direction)for(let t=0;t<this.iters;t++)this.pasteSlide("append"),this.setTransition(!1),this.sliderWrapper.style.transform="translateX(0)";setTimeout(()=>{this.isRunning=!1,this.direction="",this.iters=""},0)},!1),(()=>{const t=()=>{window.innerWidth>=768?this.slidesToShow=2:window.innerWidth<=768&&(this.slidesToShow=1)};t(),window.addEventListener("resize",()=>{t()})})()})();for(let t=0;t<this.slides.length;t++)t<this.currentSlide&&this.pasteSlide("append");this.setTransition(!1),this.sliderWrapper.style.width=`${100*this.slides.length}%`,setTimeout(()=>{this.setTransition(!0)},1)}init(){this.checkCount=0}}(".slider",{speed:500,dotsEnable:!1});const e=document.querySelectorAll(".better-to-see__link");for(let t of e)for(let e of t.children)e.classList.contains("better-to-see__arrow")&&(t.addEventListener("mouseover",()=>{e.style.fill="#D2001C"}),t.addEventListener("mouseout",()=>{e.style.fill="#4D4D4D"}));new class{constructor(t){this.nav=document.querySelector(t.navSelector),this.ham=document.querySelector(t.hamSelector),this.header=document.querySelector(".header"),this.isChanging=!1,this.headerH,this.init()}init(){this.headerH=this.header.offsetHeight;const t=()=>{window.innerWidth<=768?(this.ham.style.display="block",this.nav.classList.remove("menu_show"),this.ham.classList.remove("burger_close")):(this.ham.style.display="none",this.nav.classList.add("menu_show"),this.ham.classList.add("burger_close"))};t(),window.addEventListener("resize",()=>{t()}),this.ham.addEventListener("click",this.toggleHamburger.bind(this)),this.ham.addEventListener("touchstart",this.toggleHamburger.bind(this)),this.ham.addEventListener("transitionend",()=>{this.isChanging=!1}),this.headerHeight=this.header.style.height}toggleHamburger(){this.isChanging||(this.nav.classList.toggle("menu_show"),this.ham.classList.toggle("burger_close"),this.isChanging=!0)}}({navSelector:".header",hamSelector:".burger"})});