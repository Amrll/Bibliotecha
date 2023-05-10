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

document.querySelectorAll(".search-form a , .category-container a").forEach((tab) => {
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

//for search engine api using open library
function getbooks() {
  const input = document.getElementById("input").value;
  const outputContainer = document.getElementById("output");
  outputContainer.innerHTML = "";

  const apiUrl = `http://openlibrary.org/search.json?q=${input}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const books = data.docs.filter((book) => {
        const isbn = book.isbn ? book.isbn[0] : "";
        const coverImageUrl = `http://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
        return coverImageUrl !== "";
      });

      let container;
      let bookCount = 0;

      for (let i = 0; i < books.length; i++) {
        const book = books[i];
        const title = book.title;
        const author = book.author_name ? book.author_name[0] : "Unknown";
        const isbn = book.isbn ? book.isbn[0] : "";
        const bookDetailsUrl = `book-details.html?isbn=${isbn}`;
        const coverImageUrl = `http://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;

        if (bookCount % 4 === 0) {
          container = document.createElement("div");
          container.classList.add("books-container");
          outputContainer.appendChild(container);
        }

        const bookBox = document.createElement("div");
        bookBox.classList.add("books-box");

        const coverImage = document.createElement("img");
        coverImage.src = coverImageUrl;
        bookBox.appendChild(coverImage);

        const authorName = document.createElement("font");
        authorName.textContent = author;
        bookBox.appendChild(authorName);

        const bookTitle = document.createElement("p");
        bookTitle.textContent = title;
        bookBox.appendChild(bookTitle);

        const addToCartLink = document.createElement("a");
        addToCartLink.href = bookDetailsUrl;
        addToCartLink.textContent = "ADD TO CART";
        bookBox.appendChild(addToCartLink);

        container.appendChild(bookBox);

        bookCount++;
      }
    })
    .catch((error) => {
      console.error("Error fetching books:", error);
    });
}

function getBookDetails() {
  const isbn = getParameterByName("isbn");
  const apiUrl = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const bookInfo = data[`ISBN:${isbn}`];
      if (bookInfo) {
        const title = bookInfo.title;
        const author = bookInfo.authors ? bookInfo.authors[0].name : "Unknown";
        const description = bookInfo.notes ? bookInfo.notes.value : "No description available";

        document.getElementById("book-title").textContent = title;
        document.getElementById("book-author").textContent = author;
        document.getElementById("book-description").textContent = description;
      }
    })
    .catch((error) => {
      console.error("Error fetching book details:", error);
    });
}





