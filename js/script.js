document.addEventListener('DOMContentLoaded', () => {

    const linksToHover = document.querySelectorAll('.better-to-see__link');


    for (let i of linksToHover) {


        for (let child of i.children) {
            if (child.classList.contains("better-to-see__arrow")) {
                i.addEventListener('mouseover', () => {
                    child.style.fill = "#D2001C"
                });
                i.addEventListener('mouseout', () => {
                    child.style.fill = "#4D4D4D"
                });
            }
        }
    }


    class Burger {

        constructor(settings) {
            this.nav = document.querySelector(settings.navSelector);
            this.ham = document.querySelector(settings.hamSelector);
            this.header = document.querySelector('.header');
            this.isChanging = false;

            this.headerH;

            this.init();
        }


        init() {

            this.headerH = this.header.offsetHeight;

            const checkClientWidth = () => {

                if (window.innerWidth <= 768) {            
                    this.ham.style.display = 'block';
                    
                    this.nav.classList.remove("menu_show");
                    this.ham.classList.remove("burger_close");

                } else {

                    this.ham.style.display = 'none';

                    this.nav.classList.add("menu_show");
                    this.ham.classList.add("burger_close");
                }
            };

            checkClientWidth();

            window.addEventListener('resize', () => {
                checkClientWidth();
            });

            this.ham.addEventListener("click", this.toggleHamburger.bind(this));
            this.ham.addEventListener("touchstart", this.toggleHamburger.bind(this));

            this.ham.addEventListener("transitionend", () => {
                this.isChanging = false;
            });

            this.headerHeight = this.header.style.height;

        }

        toggleHamburger() {
            if (!this.isChanging) {
                this.nav.classList.toggle("menu_show");
                this.ham.classList.toggle("burger_close");

                this.isChanging = true;
            }

        }
    }

    const burger1 = new Burger({
        navSelector: '.header',
        hamSelector: '.burger'
    })
});
