    
document.addEventListener('DOMContentLoaded', () => {
    const popupLogin = new Popup({
        targetSelector: '.btn-login',
        popupElemSelector: '.popup-login',
        overlaySelector: '.popup-login__overlay',
        windowSelector: '.popup-login__window',
        closeBtnSelector: '.popup-login__close',
        displayPopup: 'flex',
        popupHeight: '100vh',
        popupWidth: '100%',
        disappearingTime: 1000, //ms transition disappearing time
        disappearingType: 'linear', //default val: ease transition disappearing type
        //slidingTime: 500, //ms transition sliding time
        //slidingType: 'linear', //default val: ease transition sliding type
        //slidingDir: 'top', //default: left
        //autocloseTime: 2000, //ms
        closeOnMiss: true, 
        closeOnKeys: '27, 67, 88' //esc 27, c - 67, x - 88
        }),
          popupBasket = new Popup({
            targetSelector: '.btn-basket',
            popupElemSelector: '.popup-basket',
            overlaySelector: '.popup-basket__overlay',
            windowSelector: '.popup-basket__window',
            closeBtnSelector: '.popup-basket__close',
            displayPopup: 'flex',
            popupHeight: '100vh',
            popupWidth: '100%',
            disappearingTime: 1000, //ms transition disappearing time
            disappearingType: 'linear', //default val: ease transition disappearing type
            //slidingTime: 500, //ms transition sliding time
            //slidingType: 'linear', //default val: ease transition sliding type
            //slidingDir: 'top', //default: left
            //autocloseTime: 2000, //ms
            closeOnMiss: true, 
            closeOnKeys: '27, 67, 88' //esc 27, c - 67, x - 88
          }),
          popupResume = new Popup({
            targetSelector: '.btn-send-resume',
            popupElemSelector: '.popup-resume',
            overlaySelector: '.popup-resume__overlay',
            windowSelector: '.popup-resume__window',
            closeBtnSelector: '.popup-resume__close',
            displayPopup: 'flex',
            popupHeight: '100vh',
            popupWidth: '100%',
            disappearingTime: 1000, //ms transition disappearing time
            disappearingType: 'linear', //default val: ease 
            closeOnMiss: true, 
            closeOnKeys: '27, 67, 88' //esc 27, c - 67, x - 88
          });
});