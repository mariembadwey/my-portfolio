/* =========================================
   DOM ELEMENTS
========================================= */

const body = document.body;

const languageSwitch =
    document.getElementById("languageSwitch");

const themeToggle =
    document.getElementById("themeToggle");

const menuToggle =
    document.getElementById("menuToggle");

const navLinks =
    document.querySelector(".nav-links");

const currentYear =
    document.getElementById("currentYear");


/* =========================================
   YEAR
========================================= */

if (currentYear) {
    currentYear.textContent =
        new Date().getFullYear();
}


/* =========================================
   LANGUAGE
========================================= */

let currentLanguage =
    localStorage.getItem("language") || "en";


function updateLanguage() {

    const elements =
         document.querySelectorAll("[data-en][data-ar]:not(.hero-fixed-en)");

    elements.forEach(element => {

        /*
         * IMPORTANT:
         * Section names that we want to stay English
         * will NOT use this attribute.
         */

        if (currentLanguage === "ar") {

            element.textContent =
                element.getAttribute("data-ar");

        } else {

            element.textContent =
                element.getAttribute("data-en");

        }

    });


    if (currentLanguage === "ar") {

        body.classList.add("arabic");

        document.documentElement.lang = "ar";

        document.documentElement.dir = "rtl";

    } else {

        body.classList.remove("arabic");

        document.documentElement.lang = "en";

        document.documentElement.dir = "ltr";
    }
}


if (languageSwitch) {

    languageSwitch.addEventListener(
        "click",
        () => {

            currentLanguage =
                currentLanguage === "en"
                    ? "ar"
                    : "en";

            localStorage.setItem(
                "language",
                currentLanguage
            );

            updateLanguage();

        }
    );
}


/* =========================================
   THEME
========================================= */

let currentTheme =
    localStorage.getItem("theme") || "dark";


function updateTheme() {

    if (currentTheme === "light") {

        body.classList.add("light-mode");

        if (themeToggle) {

            themeToggle.innerHTML =
                '<i class="fa-solid fa-sun"></i>';
        }

    } else {

        body.classList.remove("light-mode");

        if (themeToggle) {

            themeToggle.innerHTML =
                '<i class="fa-solid fa-moon"></i>';
        }
    }
}


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            currentTheme =
                currentTheme === "dark"
                    ? "light"
                    : "dark";

            localStorage.setItem(
                "theme",
                currentTheme
            );

            updateTheme();
        }
    );
}


/* =========================================
   MOBILE MENU
========================================= */

if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle("open");

            const icon =
                menuToggle.querySelector("i");

            if (navLinks.classList.contains("open")) {

                icon.classList.remove("fa-bars");

                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");
            }
        }
    );
}


/* Close mobile menu */

document
    .querySelectorAll(".nav-link")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navLinks.classList.remove("open");

                const icon =
                    menuToggle.querySelector("i");

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");
            }
        );

    });


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    revealObserver.unobserve(
                        entry.target
                    );
                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================
   ACTIVE NAV LINK
========================================= */

const sections =
    document.querySelectorAll("section[id]");


const navItems =
    document.querySelectorAll(".nav-link");


const sectionObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navItems.forEach(link => {

                        link.classList.remove(
                            "active"
                        );

                    });

                    const activeLink =
                        document.querySelector(
                            `.nav-link[href="#${entry.target.id}"]`
                        );

                    if (activeLink) {

                        activeLink.classList.add(
                            "active"
                        );
                    }
                }

            });

        },
        {
            threshold: 0.35
        }
    );


sections.forEach(section => {

    sectionObserver.observe(section);

});


/* =========================================
   MOUSE GLOW
========================================= */

const mouseGlow =
    document.querySelector(".mouse-glow");


document.addEventListener(
    "mousemove",
    event => {

        if (!mouseGlow) return;

        mouseGlow.style.left =
            `${event.clientX}px`;

        mouseGlow.style.top =
            `${event.clientY}px`;
    }
);


/* =========================================
   TILT EFFECT
========================================= */

const tiltCards =
    document.querySelectorAll(".tilt-card");


tiltCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -3;

            const rotateY =
                ((x - centerX) / centerX) * 3;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-7px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";

        }
    );

});


/* =========================================
   INITIALIZE
========================================= */

updateLanguage();

updateTheme();