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

//cart function

const product = [
  {
    id: 0,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1650240624i/58725016.jpg",
    title: "Elektra",
    price: 10,
  },
  {
    id: 1,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1653086275i/58756502.jpg",
    title: "Jackal",
    price: 22,
  },
  {
    id: 2,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1642803780i/59807954.jpg",
    title: "Other Birds",
    price: 32,
  },
  {
    id: 3,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1642705453i/59912428.jpg",
    title: "Mad Honey",
    price: 15,
  },
  {
    id: 4,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654709397i/58537371.jpg",
    title: "Nightcrawling",
    price: 16,
  },
  {
    id: 5,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1663514088i/60209470.jpg",
    title: "The Winners",
    price: 22,
  },
];

const categories = [...new Set(product.map((item) => 
  {return item}))]
  let i=0;
  document.getElementById('root').innerHTML = categories.map((item) => {
    var { image, title, price } = item;
    return `
      <div class="cart-box">
        <div class="img-box">
          <img class='images' src=${image}></img>
        </div>
        <div class='bottom'>
          <p>${title}</p>
          <h2>$${price}</h2>
          <button onclick='addtocart(${i++})'>Add to cart</button>
        </div>
      </div>
    `
  }).join('');

  var cart = [];

  function addtocart(a) {
    cart.push({...categories[a]});
    displaycart();
  }

  function delElement(a) {
    cart.splice(a, 1);
    displaycart();
  }
  
  function displaycart(a) {
    let j = 0, total=0;
    if (cart.length == 0) {
      document.getElementById('cartItem').innerHTML = `<h1>Cart is empty</h1>`;
      document.getElementById('total').innerHTML = "$ "+0+".00";
    } else {
      document.getElementById("cartItem").innerHTML = cart.map((items) => {
        var { image, title, price } = items;
        total = total + price;
        document.getElementById('total').innerHTML = "$ "+total+".00";
        return `
          <div class="cart-item">
            <div class="row-img">
              <img class="rowimg" src=${image}>
            </div>
            <p style="font-size: 12px;">${title}</p>
            <h2 style="font-size: 15px;">$${price}.00</h2>
            <i class='fa fa-trash' onclick='delElement(${j++})'></i>
          </div>
        `;
      }).join('');
    }
  }
