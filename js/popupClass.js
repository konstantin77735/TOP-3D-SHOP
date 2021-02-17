   class Popup {
       constructor(data) {
           const {targetSelector, popupElemSelector,
                  overlaySelector, windowSelector,
                  closeBtnSelector, displayPopup, 
                  popupHeight, popupWidth, 
                  disappearingTime, disappearingType, 
                  slidingTime, slidingType, slidingDir,
                  autocloseTime,  closeOnMiss, closeOnKeys} = data;
           
           this.targetSelector = targetSelector;
           this.popupElemSelector = popupElemSelector;
           this.overlaySelector = overlaySelector;
           this.windowSelector = windowSelector;
           this.closeBtnSelector = closeBtnSelector;
           this.displayPopup = displayPopup;
           this.popupHeight = popupHeight;
           this.popupWidth = popupWidth;
           this.disappearingTime = disappearingTime;
           this.disappearingType = disappearingType || 'ease';
           this.slidingTime = slidingTime;
           this.slidingType = slidingType || 'ease';
           this.slidingDir = slidingDir || 'left';
           this.autocloseTime = autocloseTime;
           this.closeOnMiss = closeOnMiss;
           this.closeOnKeys = closeOnKeys;
           
           this.popupTrigger = document.querySelector(`${this.targetSelector}`);
           this.popupElem = document.querySelector(`${this.popupElemSelector}`);
           this.popupOverlay = document.querySelector(`${this.overlaySelector}`);
           this.popupWindow = document.querySelector(`${this.windowSelector}`);
           this.closeBtn = document.querySelector(`${this.closeBtnSelector}`);
           
           this.init();
       }
          
       init(){
           
           
           this.disappearance();
           
           this.popupTrigger.addEventListener('click', this.appearance.bind(this));
           this.popupTrigger.addEventListener('touchstart', this.appearance.bind(this));
           
           this.closeBtn.addEventListener('click', this.disappearance.bind(this));
           this.closeBtn.addEventListener('touchstart', this.disappearance.bind(this));
 
           if(this.closeOnMiss){
               this.popupElem.addEventListener('click', (e)=> { 
                   if(e.target.classList.contains(`${this.overlaySelector.slice(1)}`))
                   { 
                   this.disappearance();   
                   }
               });
               this.popupElem.addEventListener('touchstart', (e)=> { 
                   if(e.target.classList.contains(`${this.overlaySelector.slice(1)}`))
                   { 
                   this.disappearance();   
                   }
               });
           }
           
           if(this.closeOnKeys){
               const trim = this.closeOnKeys.replace(/\s+/g, ''),
                     arr = trim.split(',');
                
               document.addEventListener('keydown', (e) => {
                   arr.forEach((item) => {
                    if(parseInt(item, 10)=== e.keyCode){
                        this.disappearance();
                    }
                }); 
            });  
           } 
       }
       
       appearance(){
           const posY = document.documentElement.scrollTop;   
           
           this.popupElem.style.transition = `opacity ${this.disappearingTime/1000}s ${this.disappearingType}, height 0s ${this.disappearingType} 0s`;
           
           document.querySelector('html').style.overflow = 'hidden';
           
           this.popupElem.style.height = '0px';
           this.popupElem.style.top = `${posY}px`;
           this.popupOverlay.style.display = 'block'; 
           
           this.popupElem.style.display = 'flex'; 
           
           this.popupElem.style.height = this.popupHeight;
           this.popupElem.style.width = this.popupWidth;
           this.popupElem.style.opacity = 1;
           
           
           if(this.slidingType){
               this.popupWindow.style.transition = `all ${this.slidingTime/1000}s ${this.slidingType}, height 0s ${this.slidingType} 0s`;
               switch(this.slidingTime && this.slidingType && this.slidingDir){
                   case 'left':
                       this.popupWindow.style.left = '0px';
                   break;
                   case 'right':
                       this.popupWindow.style.right = '0px';
                   break;
                   case 'top':
                       this.popupWindow.style.top = '0px';
                   break;
                   case 'bottom':
                       this.popupWindow.style.bottom = '0px';
                   break;     
               }
           } 
           
           

               if(this.autocloseTime){
                   setTimeout(() => {this.disappearance()}, this.autocloseTime);
               }
           
       }
         
       disappearance(){
           
           
           if(this.slidingTime && this.slidingType && this.slidingDir){
               this.popupWindow.style.transition = `all ${this.slidingTime/1000}s ${this.slidingType}, height 0s ${this.slidingType} ${this.slidingTime/1000}s`;

               switch(this.slidingDir){
                   case 'left':
                       this.popupWindow.style.left = '-100%';
                   break;
                   case 'right':
                       this.popupWindow.style.right = '-100%';
                   break;
                   case 'top':
                       this.popupWindow.style.top = '-100%';
                   break;
                   case 'bottom':
                       this.popupWindow.style.bottom = '-100%';
                   break;     
               }

           }
           
               this.popupElem.style.height = 0;
               this.popupElem.style.opacity = 0;
               this.popupElem.style.transition = `opacity ${this.disappearingTime/1000}s ${this.disappearingType}, height 0s ${this.disappearingType} ${this.disappearingTime/1000}s`;
               document.querySelector('html').style.overflow = 'visible';   
           
               setTimeout(() => {this.popupOverlay.style.height = 'inherit'}, (this.disappearingTime+100));
       }
               
   }   