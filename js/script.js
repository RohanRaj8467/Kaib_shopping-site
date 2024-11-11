(function($) {

  "use strict";

  var initPreloader = function() {
    $(document).ready(function($) {
    var Body = $('body');
        Body.addClass('preloader-site');
    });
    $(window).load(function() {
        $('.preloader-wrapper').fadeOut();
        $('body').removeClass('preloader-site');
    });
  }

  // init Chocolat light box
	var initChocolat = function() {
		Chocolat(document.querySelectorAll('.image-link'), {
		  imageSize: 'contain',
		  loop: true,
		})
	}

  var initSwiper = function() {

    var swiper = new Swiper(".main-swiper", {
      speed: 500,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    var category_swiper = new Swiper(".category-carousel", {
      slidesPerView: 8,
      spaceBetween: 30,
      speed: 500,
      navigation: {
        nextEl: ".category-carousel-next",
        prevEl: ".category-carousel-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 5,
        },
        1500: {
          slidesPerView: 8,
        },
      }
    });

    $(".products-carousel").each(function(){
      var $el_id = $(this).attr('id');

      var products_swiper = new Swiper("#"+$el_id+" .swiper", {
        slidesPerView: 5,
        spaceBetween: 30,
        speed: 500,
        navigation: {
          nextEl: "#"+$el_id+" .products-carousel-next",
          prevEl: "#"+$el_id+" .products-carousel-prev",
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 3,
          },
          991: {
            slidesPerView: 4,
          },
          1500: {
            slidesPerView: 5,
          },
        }
      });

    });


    // product single page
    var thumb_slider = new Swiper(".product-thumbnail-slider", {
      slidesPerView: 5,
      spaceBetween: 20,
      // autoplay: true,
      direction: "vertical",
      breakpoints: {
        0: {
          direction: "horizontal"
        },
        992: {
          direction: "vertical"
        },
      },
    });

    var large_slider = new Swiper(".product-large-slider", {
      slidesPerView: 1,
      // autoplay: true,
      spaceBetween: 0,
      effect: 'fade',
      thumbs: {
        swiper: thumb_slider,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }

  // input spinner
  var initProductQty = function(){

    $('.product-qty').each(function(){
      
      var $el_product = $(this);
      var quantity = 0;
      
      $el_product.find('.quantity-right-plus').click(function(e){
        e.preventDefault();
        quantity = parseInt($el_product.find('#quantity').val());
        $el_product.find('#quantity').val(quantity + 1);
      });

      $el_product.find('.quantity-left-minus').click(function(e){
        e.preventDefault();
        quantity = parseInt($el_product.find('#quantity').val());
        if(quantity>0){
          $el_product.find('#quantity').val(quantity - 1);
        }
      });

    });

  }

  // init jarallax parallax
  var initJarallax = function() {
    jarallax(document.querySelectorAll(".jarallax"));

    jarallax(document.querySelectorAll(".jarallax-keep-img"), {
      keepImg: true,
    });
  }

  // document ready
  $(document).ready(function() {
    
    initPreloader();
    initSwiper();
    initProductQty();
    initJarallax();
    initChocolat();

  }); // End of a document

})(jQuery);

// Get the carousel instance
const productCarousel = document.querySelector('#product-carousel');

// Event listeners for manual slide controls
document.getElementById('slide-1').addEventListener('click', () => {
  const carousel = new bootstrap.Carousel(productCarousel);
  carousel.to(0); // Jump to the first slide
});

document.getElementById('slide-2').addEventListener('click', () => {
  const carousel = new bootstrap.Carousel(productCarousel);
  carousel.to(1); // Jump to the second slide
});

document.getElementById('slide-3').addEventListener('click', () => {
  const carousel = new bootstrap.Carousel(productCarousel);
  carousel.to(2); // Jump to the third slide
});
function updateCartCount(newCount) {
  cartCount = newCount;
  document.getElementById('cart-count').textContent = cartCount;
  document.getElementById('cart-count-mobile').textContent = cartCount; // Update for mobile
}

// Example to set cart count to 3
updateCartCount(3);
// Initialize item counts
let cartCount = 0;
let wishlistCount = 0;

// Update links on load
updateLinks();

// Function to add item to Cart
function addToCart() {
  cartCount++;
  localStorage.setItem("cartCount", cartCount); // Save count in local storage
  updateLinks();
}

// Function to add item to Wishlist
function addToWishlist() {
  wishlistCount++;
  localStorage.setItem("wishlistCount", wishlistCount); // Save count in local storage
  updateLinks();
}

// Function to update Cart and Wishlist links
function updateLinks() {
  cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
  wishlistCount = parseInt(localStorage.getItem("wishlistCount")) || 0;
  
  document.getElementById("cart-link").textContent = `Cart(${cartCount})`;
  document.getElementById("wishlist-link").textContent = `Wishlist(${wishlistCount})`;

  // Update Cart and Wishlist pages
  if (document.getElementById("cart-items")) {
    document.getElementById("cart-items").textContent = cartCount > 0 ? `Items in cart: ${cartCount}` : "No items in cart.";
  }
  if (document.getElementById("wishlist-items")) {
    document.getElementById("wishlist-items").textContent = wishlistCount > 0 ? `Items in wishlist: ${wishlistCount}` : "No items in wishlist.";
  }
}
// Function to update cart count
function updateCartCount() {
  const cartCount = JSON.parse(localStorage.getItem("cartItems"))?.length || 0;
  document.querySelector(".nav-link[href='cart.html']").textContent = `Cart (${cartCount})`;
}

// Function to update wishlist count
function updateWishlistCount() {
  const wishlistCount = JSON.parse(localStorage.getItem("wishlistItems"))?.length || 0;
  document.querySelector(".nav-link[href='wishlist.html']").textContent = `Wishlist (${wishlistCount})`;
}

// Initialize counts when the page loads
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  updateWishlistCount();
  
  // Add click event listeners to "Add to Cart" and "Add to Wishlist" buttons
  document.querySelectorAll(".btn-cart").forEach(button => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      addToCart(event.target.closest(".product-item"));
    });
  });

  document.querySelectorAll(".btn-outline-dark").forEach(button => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      addToWishlist(event.target.closest(".product-item"));
    });
  });
});

// Add item to cart
function addToCart(productItem) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const productName = productItem.querySelector("h3").textContent;

  cartItems.push({ name: productName });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateCartCount();
}

// Add item to wishlist
function addToWishlist(productItem) {
  let wishlistItems = JSON.parse(localStorage.getItem("wishlistItems")) || [];
  const productName = productItem.querySelector("h3").textContent;

  wishlistItems.push({ name: productName });
  localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  updateWishlistCount();
}
let cart = [];
let wishlist = [];

// Add item to cart
function addToCart(item) {
    cart.push(item);
    updateCart();
}

// Add item to wishlist
function addToWishlist(item) {
    wishlist.push(item);
    updateWishlist();
}

// Update cart items and display in the cart page
function updateCart() {
    const cartItemsDiv = document.getElementById("cart-items");
    cartItemsDiv.innerHTML = '';
    let totalPrice = 0;
    
    cart.forEach((item, index) => {
        totalPrice += item.price;
        cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <p>${item.name}</p>
                <p>$${item.price.toFixed(2)}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    document.getElementById("total-items").innerText = cart.length;
    document.getElementById("total-price").innerText = totalPrice.toFixed(2);
}

// Update wishlist items and display in the wishlist page
function updateWishlist() {
    const wishlistItemsDiv = document.getElementById("wishlist-items");
    wishlistItemsDiv.innerHTML = '';

    wishlist.forEach((item, index) => {
        wishlistItemsDiv.innerHTML += `
            <div class="wishlist-item">
                <p>${item.name}</p>
                <button onclick="removeFromWishlist(${index})">Remove</button>
            </div>
        `;
    });
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Remove item from wishlist
function removeFromWishlist(index) {
    wishlist.splice(index, 1);
    updateWishlist();
}

// Checkout Process
document.getElementById("checkout-button").onclick = function() {
    const modal = document.getElementById("checkout-modal");
    modal.style.display = "block";
};

document.getElementsByClassName("close")[0].onclick = function() {
    document.getElementById("checkout-modal").style.display = "none";
};

window.onclick = function(event) {
    if (event.target == document.getElementById("checkout-modal")) {
        document.getElementById("checkout-modal").style.display = "none";
    }
};

document.getElementById("payment-form").onsubmit = function(event) {
    event.preventDefault();
    alert("Payment successful!");
    cart = [];
    updateCart();
    document.getElementById("checkout-modal").style.display = "none";
};


