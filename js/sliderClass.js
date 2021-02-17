// A - left, D - right
//export default 
class Slider {

    constructor(sliderSelector, settings) {
        // ***** НАСТРОЙКИ ********
        this.autoplay = settings.autoplay;
        this.autoplayDirection = settings.autoplayDirection || 'right';
        this.autoplaySlideTime = settings.autoplaySlideTime || 4000;
        this.currentSlide = settings.currentSlide || 0;
        this.slidesToShow = settings.slidesToShow || 1;
        this.dotsEnable = settings.dotsEnable;
        this.arrowsEnable = settings.arrowsEnable;
        this.keysEnable = settings.keysEnable;
        this.transitionSpeed = settings.speed || 1000; //1 сек по умолчанию
        this.transitionType = settings.animationType || 'ease';
        this.transition = `transform ${this.transitionSpeed/1000}s ${this.transitionType}`,
        this.dotsHeight = settings.dotsHeight || '20px';
        this.dotsWidth = settings.dotsWidth || '20px';
        //******************************************************//

        // *****  Технические переменные   ***** 
        this.sliderSelector = sliderSelector;
        this.slider = document.querySelector(sliderSelector);
        this.sliderWrapper = document.querySelector(`${sliderSelector}__wrapper`), //записываем обёртку слайдов    
        this.slides = this.sliderWrapper.children; //записываем нодлист слайдов в значение класса this.slides
        this.isRunning = false; // Слайдер меняет в данный момент слайды?
        this.eachSlideWidth = 100 / this.slides.length;
        this.dotsWrapperClass = `${sliderSelector.slice(1)}__dots-wrapper`; //класс обёртки точек
        this.dotClass = `${sliderSelector.slice(1)}__dot`;
        this.dotActiveClass = 'active-dot';
        this.controlClass = `${sliderSelector.slice(1)}__control`;
        this.nextClass = `arrow-next`;
        this.prevClass = `arrow-prev`;
        this.dots; //точки, если будут указаны
        this.direction; //left - right
        this.iters; //кол-во нужных итераций 
        this.checkCount; //счётчик ожидания при автовоспроизведении
        this.checkAutoplay; //хранится автовоспроизведение, если будет указано
        //******************************************************//

        let beginning = (() => {
            if (typeof settings.arrowsEnable === 'undefined') {
                this.arrowsEnable = true;
            }
            if (typeof settings.dotsEnable === 'undefined') {
                this.dotsEnable = true;
            }
            if (typeof settings.keysEnable === 'undefined') {
                this.keysEnable = true;
            }
        })();

        this.beforeInit();

        this.init();
    }


    setTransition(arg) {
        (arg) ? (this.sliderWrapper.style.transition = this.transition) : // transition = default
        (this.sliderWrapper.style.transition = 'none')
    }


    pasteSlide(dir) {
        switch (dir) {
            case ('prepend'):
                this.sliderWrapper.prepend(this.sliderWrapper.lastElementChild);
                break;
            case ('append'):
                this.sliderWrapper.append(this.sliderWrapper.firstElementChild);
                break;

        }
    }

    findIters(j) {
        if (this.currentSlide > j) {
            this.direction = 'prev';
            this.iters = this.currentSlide - j
        } else {
            this.direction = 'next';
            this.iters = j - this.currentSlide
        }

    }

    changeSlide(data) {
        const {y} = data;

        if (!this.isRunning) {

            const moveRight = () => {
                    this.setTransition(true);
                    this.sliderWrapper.style.transform = `translateX(-${this.iters * this.eachSlideWidth/this.slidesToShow}%)`;
                
                },
                moveLeft = (y) => {
                    let c = y; //возможно ещё понадобится, хотя работает без неё

                    for (let i = this.iters; i > 0; i--) {
                        this.pasteSlide('prepend'); //prepend this.iters кол-во раз
                        c++;
                    }
                    this.sliderWrapper.style.transform = `translateX(-${this.iters * this.eachSlideWidth/this.slidesToShow}%)`; //Тот же самый элемент
                    

                    setTimeout(() => { //без таймаута не работает
                        this.setTransition(true);
                        this.sliderWrapper.style.transform = 'translateX(0)';
                    }, 0);

                };

            if (typeof y != 'undefined') {
                this.findIters(y)
            } else {
                this.iters = 1
            }

            this.setTransition(false);

            if (this.iters > 1) {

                if (this.direction == 'next') {
                    moveRight();
                }

                if (this.direction == 'prev') {
                    moveLeft();
                }

            } else {
                switch (this.direction) {
                    case ('next'):

                        if (this.currentSlide < this.slides.length - 1) {
                            this.currentSlide++;

                        } else {
                            this.currentSlide = 0;
                        }

                        if (this.dotsEnable) {
                            this.changeDots({
                                dir: this.direction
                            });
                        }

                        //                        if (this.autoplay) {
                        //                            setTimeout(() => {
                        //                                this.check()
                        //                            }, this.autoplaySlideTime);
                        //                        }

                        moveRight();

                        break;
                    case ('prev'):


                        moveLeft();

                        if (this.currentSlide > 0) { // Если показываемый слайд НЕ первый
                            this.currentSlide--; // то уменьшаем индекс показываемого слайда

                        } else {
                            this.currentSlide = this.slides.length - 1; // показываемый слайд равен последнему
                        }

                        if (this.dotsEnable) {
                            this.changeDots({
                                dir: this.direction
                            });
                        }

                        //                        if (this.autoplay) {
                        //                            setTimeout(() => {
                        //                                this.check()
                        //                            }, this.autoplaySlideTime);
                        //                        }

                        break;
                }
            }
        }
    }

    changeDots(data) { //функция меняющая выделенную точку на НОВЫЙ слайд
        const {target, dir} = data;

  
        
        if (target && target.classList.contains(this.dotActiveClass) || !target && this.isRunning) {
            return
        } else {

   
            
            this.isRunning = true;

            for (let j = 0; j < this.dots.length; j++) { // береём ВСЕ точки 
                this.dots[j].classList.remove(this.dotActiveClass);

                    console.log(this.dots[j]);
                
                if (target == this.dots[j]) { // j - индекс нажатой точки
                    this.dots[j].classList.add(this.dotActiveClass);

                    
                    
                    if (j < this.currentSlide) { // если мы нажали на точку, индекс которой < активной, то 
                        this.direction = 'prev';
                        this.currentSlide = j; // меняем слайд на индекс точки

                    }

                    if (j > this.currentSlide) { // если мы нажали на точку, индекс которой > активной, то
                        this.direction = 'next';
                        this.currentSlide = j; // меняем слайд на индекс точки

                    }
                }


                if (dir == 'next' || dir == 'prev') {
                    this.dots[this.currentSlide].classList.add(this.dotActiveClass);
                }
            }
        }
    }

    check() {

        let c = (this.autoplaySlideTime / 1000) + 2;

        if (this.autoplay) {
            switch (this.autoplayDirection) {
                case ('right'):
                    this.direction = 'next';
                    this.changeSlide({
                        y: this.currentSlide + 1
                    });
                 
                    return;
                    break;
                case ('left'):
                    this.direction = 'prev';
                    this.changeSlide({
                        y: this.currentSlide - 1
                    });
               
                    return;
                    break;
            }
        }

        if (this.autoplaySlideTime < 1000) { // если слайды меняются меньше чем за секунду
            let arrNum = String(this.autoplaySlideTime).split(''), //загоняем время смены слайдов в массив
                x = parseInt((arrNum[0] + arrNum[1]) * 2); //parseInt((1-ый элемент + 2-ой элемент)) - до этого он досчитает за РЕАЛЬНЫЕ 10 секунд. 10/5секунд = 2, поэтому умножаем на 2

            c = this.autoplaySlideTime / x; // c = 5 секунд, если не делить x на число
        }
        this.checkCount++;
        if (this.checkCount >= c) {
            this.autoplay = true;
            this.checkCount = 0;
        }
    }

    beforeInit() {
        const addListeners = (() => {

            if (this.autoplay) {
                this.checkAutoplay = setInterval(this.check.bind(this), this.autoplaySlideTime);
            }

            if (this.keysEnable) {
                window.addEventListener('keydown', (e) => {
                    switch (e.keyCode) {
                        case (39): //right arrow
                            if (this.autoplay) {
                                this.autoplay = false;
                                this.check()
                            }
                            if (!this.isRunning) {
                                this.direction = 'next';
                                this.changeSlide({y: this.currentSlide + 1}) //обязательно отправлять пустой объект
                            }
                            break;
                        case (37): //left arrow
                            if (this.autoplay) {
                                this.autoplay = false;
                                this.check()
                            }
                            if (!this.isRunning) {
                                this.direction = 'prev';
                                this.changeSlide({y: this.currentSlide - 1})
                            }
                            break;
                    }
                });
            }

            if (this.arrowsEnable) {
                //paste arrows in DOM

                const next = document.createElement('img'),
                      prev = document.createElement('img'),
                      arrowWrapper = document.createElement('div');

                arrowWrapper.classList.add(`${this.sliderSelector.slice(1)}__arrow-wrapper`);
                
                next.classList.add(this.controlClass);
                prev.classList.add(this.controlClass);

                next.classList.add(this.nextClass);
                prev.classList.add(this.prevClass);
                
                next.setAttribute('src', 'img/videos-about-us/arrow-r.svg');
                prev.setAttribute('src', 'img/videos-about-us/arrow-l.svg');
                
                arrowWrapper.prepend(next);
                arrowWrapper.prepend(prev);
                this.slider.parentElement.prepend(arrowWrapper);

                next.style.top = '45%';
                prev.style.top = '45%';

                next.addEventListener('click', () => {
                    if (this.autoplay) {
                        this.autoplay = false;
                        this.check()
                    }
                    if (!this.isRunning) {
                        this.direction = 'next';
                        this.changeSlide({y: this.currentSlide + 1}) //работает только если послать пустой объект
                    }
                });
                prev.addEventListener('click', () => {
                    if (this.autoplay) {
                        this.autoplay = false;
                        this.check()
                    }
                    if (!this.isRunning) {
                        this.direction = 'prev';
                        this.changeSlide({y: this.currentSlide - 1}) //работает только если послать пустой объект
                    }
                });

            }

            if (this.dotsEnable) {

                const dot = document.createElement('li'),
                    dotsWrapper = document.createElement('ul');

                dotsWrapper.classList.add(this.dotsWrapperClass); //добаляем созданному диву класс указанный в начале
                dot.classList.add(this.dotClass); //добавляем созданной точке указанный в начале класс     


                this.slider.append(dotsWrapper); //добавляем обёртку точек в конец слайдера

                dotsWrapper.style.width = `${10*this.slides.length}%`; //определяем ширину контейнера точек по кол-ву слайдов
                dotsWrapper.style.height = this.dotsHeight; // приравниваем высоту контейнера указанной в начале высоте точки



                for (let i = 0; i < this.slides.length; i++) {
                    let cloneDot = dot.cloneNode();

                    dotsWrapper.append(cloneDot); //вставляем в конец созданную точку
                    this.dots = document.getElementsByClassName(this.dotClass);
                    //записываем в переменную коллекцию ДОБАВЛЕННЫХ ДИНАМИЧЕСКИ точек

                    cloneDot.style.height = this.dotsHeight;
                    cloneDot.style.width = this.dotsWidth;

                    this.dots[i].addEventListener('click', (e) => {
                        this.autoplay = false;
                        if (!this.isRunning) {

                            this.check();
                            this.changeSlide({
                                y: i
                            });
                            this.changeDots({
                                target: e.target
                            });
                           
                        }

                    });

                    this.dots[i].addEventListener('touchstart', (e) => {
                        this.autoplay = false;
                        if (!this.isRunning) {

                            this.check();
                            this.changeSlide({
                                y: i
                            });
                            this.changeDots({
                                target: e.target
                            });
                        
                        }

                    });

                }

                this.dots[this.currentSlide].classList.add(this.dotActiveClass); // Помечаем активной точку, соответствующую индексу активного слайда

            }

            this.sliderWrapper.addEventListener('transitionend', () => {

                if (this.direction == 'next') { // вперед
                    for (let i = 0; i < this.iters; i++) {
                        this.pasteSlide('append');
                        this.setTransition(false); //отключаем transition
                        this.sliderWrapper.style.transform = 'translateX(0)';
                    }
                }

                setTimeout(() => {
                    this.isRunning = false;
                    this.direction = '';
                    this.iters = '';
                  
                }, 0);
            }, false);
            
            const addWindowWidthChecker = (() => {
                
                const checkClientWidth = () => {
                    
                    if (window.innerWidth >= 768) {      
                        this.slidesToShow = 2    
                        } else if(window.innerWidth <= 768) {
                        this.slidesToShow = 1;
                    }
                    console.log(`разрешение: ${window.innerWidth}`);
                    console.log(`показывать ${this.slidesToShow} слайдов`);
                };
                
                checkClientWidth();

                window.addEventListener('resize', () => {
                            checkClientWidth();
                });
                
                
            })();
        })();
 
        for (let i = 0; i < this.slides.length; i++) {
            if (i < this.currentSlide) {
                this.pasteSlide('append');
            }
            //this.slides[i].style.width = `${this.eachSlideWidth/this.slidesToShow}%`;
            //Присваиваем каждому слайду занимаемое им место
        }

        this.setTransition(false); //отключаем transition

        this.sliderWrapper.style.width = `${this.slides.length*100}%`; //ширина обёртки слайдер = количество слайдов умножить на 100%, 
        setTimeout(() => {

            this.setTransition(true); // Присваиваем свойству transition параметры, указанные пользователем в начале      
        }, 1);

    }

    init() {

        this.checkCount = 0; //счётчик ожидания при автовоспроизведении после клика

        let waitingToAutoPlay; //время ожидания перед следующим автопроигрыванием слайдов
    }
}