//import Slider from './slider.js';

document.addEventListener('DOMContentLoaded', () => {

    let slidesOnScreen;
    
    
   
    
    
    let slider = new Slider('.slider', {
            //currentSlide: 1, // default = 0
            //slidesToShow: 2, //кол-во слайдов на экране. 
                /*
                 разметка гридов
                 grid-template-columns: repeat(4, 1fr); для 1 слайда на экране из Любого кол-ва слайдов
                 grid-template-columns: repeat(4, 0.125fr);  для 2 слайдов на экране из 4 слайдов 
                 grid-template-columns: repeat(6, 0.0834fr); для 2 слайдов на экране из 6 слайдов */
            speed: 500, //ms, default = 1000
            //animationType: 'linear', // default = ease

            //autoplay: true, // default = false
            //autoplayDirection: 'right', //default = right
            //autoplaySlideTime: 2000, //ms, default = 4000

            dotsEnable: false, // default = true
            //arrowsEnable: false, //default = true
            //dotsHeight: '12px', //default = 20px
            //dotsWidth: '12px' //default = 20px
        });

});