

// #########################################################################################
// Hides Navbar on scroll-down
{
    const navbar = document.querySelector('.navbar');

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (lastScrollY < window.scrollY) {
            navbar.classList.add('nav--remove');
        }
        if (lastScrollY > window.scrollY) {
            navbar.classList.remove('nav--remove');

        }

        lastScrollY = window.scrollY;



    });
}
// #########################################################################################


// #########################################################################################
// Hmaburger Menu
{
    function showSidebar(){
        const hamburger = document.querySelector('.hamburger');
        const sidebar = document.querySelector('.sidebar');
        sidebar.style.display = 'flex';
        hamburger.style.display = 'none';
    }

    function hideSidebar(){
        const hamburger = document.querySelector('.hamburger');
        const sidebar = document.querySelector('.sidebar');
        sidebar.style.display = 'none';
        hamburger.style.display = 'block';

    }
}

// #########################################################################################


// #########################################################################################
// Project-Cards Scroll Effect
{

    let cards = document.querySelectorAll(".card");
    let subtitle = document.querySelector(".sub-title")
    let projects = document.querySelector(".projects");
    let changeContent = [`Flappy Bird: the game where a chubby bird tries flying through pipes like a drunk butterfly.`, `Ping Pong: Don't let the ball touch the wall`, `Tic Tac Toe: Classic X's and O's`, `Gun Game: Shoot your enimes off the map`, `Snake Game: Eat Eat Eat... Repeat`, `Check more on github`];

    function rotateCards() {
        let angle = 0;
        cards.forEach((card) => {
            if (card.classList.contains("active")) {
                card.style.transform = `translate(-50%, -120vh) rotate(-48deg)`;
            } else {
                card.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
                angle = angle - 10;
            }
        });
    }

    rotateCards();

    window.addEventListener("scroll", () => {

        let proportion = projects.getBoundingClientRect().top / window.innerHeight;
        if (proportion <= 0) {
            let n = cards.length;
            let index = Math.ceil((proportion * n) / 2);
            index = Math.abs(index) - 1;
            // console.log('index ', index);
            for (let i = 0; i < n; i++) {
                // console.log('i ', i);
                if (i <= index) {
                    cards[i].classList.add("active");
                    if (index === 4) {
                        subtitle.innerHTML = changeContent[index + 1];
                    }
                    // console.log('index + 1 ',index+1)
                } else {
                    cards[i].classList.remove("active");
                    subtitle.innerHTML = changeContent[index + 1];

                }
            }
            rotateCards();
        }
    });


    // Code for responsiveness

    function adjust() {
        let windowWidth = window.innerWidth;
        let left = document.querySelector(".left");
        left.remove();
        if (windowWidth < 800) {
            projects.insertAdjacentElement("beforebegin", left);
        } else {
            projects.insertAdjacentElement("afterbegin", left);
        }
    }
    adjust();

    window.addEventListener("resize", adjust);


}
// #########################################################################################


// #########################################################################################
// Typewriter
{
    let TxtType = function (el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function () {
        let i = this.loopNum % this.toRotate.length;
        let fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

        let that = this;
        let delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function () {
            that.tick();
        }, delta);
    };

    window.onload = function () {
        let elements = document.getElementsByClassName('typewrite');
        for (let i = 0; i < elements.length; i++) {
            let toRotate = elements[i].getAttribute('data-type');
            let period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        let css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #000; }";
        document.body.appendChild(css);
    };
}
// #########################################################################################


// #########################################################################################
// Video play on hover
{
    const videos = document.querySelectorAll('.project-video');
    const projectImage = document.querySelectorAll('.project-image');



    projectImage.forEach(image => {
        image.addEventListener('mouseenter', () => {
            image.classList.add('hidden');

            videos.forEach(video => {
                video.classList.remove('hidden');
                video.muted = 'True';
                video.play();
            })
        });

        image.addEventListener('mouseleave', () => {
            image.classList.remove('hidden');
            videos.forEach(video => {
                video.classList.add('hidden');
                video.pause();
                video.currentTime = 0;

            })
        });
    })
}
// #########################################################################################


// #########################################################################################
// Animations
{

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show-items");
            } else {
                entry.target.classList.remove("show-items");
            }
        });
    });


    const scrollBottom = document.querySelectorAll(".scroll-bottom");
    scrollBottom.forEach((el) => observer.observe(el));

    const scrollLeft = document.querySelectorAll(".scroll-left");
    scrollLeft.forEach((el) => observer.observe(el));


}


{

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("loaded");
            } else {
                entry.target.classList.remove("loaded");
            }
        });
    });


    const load = document.querySelectorAll(".load");
    load.forEach((el) => observer.observe(el));

}


{

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("shown");
            } else {
                entry.target.classList.remove("shown");
            }
        });
    });


    const show = document.querySelectorAll(".show");
    show.forEach((el) => observer.observe(el));

}

{

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const target = entry.target;
            if (entry.isIntersecting) {
                target.classList.add(`path-1`);
            } else {
                target.classList.remove(`path-1`);
            }

        });
    });

    const path = document.querySelectorAll(".path1");
    path.forEach((el) => observer.observe(el));

}

{

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const target = entry.target;
            if (entry.isIntersecting) {
                target.classList.add(`path-2`);
            } else {
                target.classList.remove(`path-2`);
            }

        });
    });

    const path = document.querySelectorAll(".path2");
    path.forEach((el) => observer.observe(el));

}

{

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const target = entry.target;
            if (entry.isIntersecting) {
                target.classList.add(`path-3`);
            } else {
                target.classList.remove(`path-3`);
            }

        });
    });

    const path = document.querySelectorAll(".path3");
    path.forEach((el) => observer.observe(el));

}

{

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const target = entry.target;
            if (entry.isIntersecting) {
                target.classList.add(`path-4`);
            } else {
                target.classList.remove(`path-4`);
            }

        });
    });

    const path = document.querySelectorAll(".path4");
    path.forEach((el) => observer.observe(el));

}

// #########################################################################################
