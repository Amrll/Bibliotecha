const menBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");
const menu = document.querySelector(".menu");
const tabs = document.querySelectorAll(".tab-content");

const swiper = new Swiper(".swiper", {
  // Default parameters
  slidesPerView: 4,
  spaceBetween: 0,
  // If we need pagination

  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },

  breakpoints: {
    // when window width is >= 320px
    350: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },

    200: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
  autoplay: {
    delay: 2500,
  },
});

document.querySelectorAll(".category-container a").forEach((tab) => {
  tab.addEventListener("click", (event) => {
    event.preventDefault();

    const target = document.querySelector(tab.getAttribute("href"));

    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    target.classList.add("active");
  });
});

//px offset when the navbar activates
const offset = 50;

//add click event to menu button
menBtn.addEventListener("click", () => {
  menu.classList.toggle("menu-open");
});

//scroll event
window.addEventListener("scroll", () => {
  if (pageYoffset > offset) {
    navbar.classList.add("navbar-active");
  } else {
    navbar.classList.remove("navbar-active");
  }
});

window.addEventListener("load", function () {
  // Hide the preloader after 3 seconds
  setTimeout(function () {
    document.querySelector("#preloader").style.display = "none";
  }, -1000);
});


//Scroll to top button script
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  var scrollToTopBtn = document.getElementById("scrollToTopBtn");

  if (document.documentElement.scrollTop > 300) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
}

function scrollToTop() {
  document.documentElement.scrollTop = 0;
}
