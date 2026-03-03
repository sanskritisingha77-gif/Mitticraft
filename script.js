/* ============================= */
/* ===== HEADER SCROLL EFFECT ===== */
/* ============================= */

const header = document.querySelector("header");

if (header) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 60) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}


/* ============================= */
/* ===== TESTIMONIAL SLIDER ===== */
/* ============================= */

const track = document.querySelector(".testimonial-track");
const dots = document.querySelectorAll(".dot");
const slider = document.querySelector(".testimonial-slider");

let index = 0;
let interval = 4000;
let sliderInterval;

if (track && dots.length > 0 && slider) {

    function updateSlider() {
        track.style.transform = `translateX(-${index * 100}%)`;

        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
    }

    function nextSlide() {
        index = (index + 1) % dots.length;
        updateSlider();
    }

    function startSlider() {
        sliderInterval = setInterval(nextSlide, interval);
    }

    function stopSlider() {
        clearInterval(sliderInterval);
    }

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            index = i;
            updateSlider();
            stopSlider();
            startSlider();
        });
    });

    slider.addEventListener("mouseenter", stopSlider);
    slider.addEventListener("mouseleave", startSlider);

    startSlider();
}


/* ============================= */
/* ===== HERO SLIDESHOW ===== */
/* ============================= */

const slides = document.querySelectorAll(".slide");
let heroIndex = 0;

if (slides.length > 0) {
    setInterval(() => {
        slides[heroIndex].classList.remove("active");
        heroIndex = (heroIndex + 1) % slides.length;
        slides[heroIndex].classList.add("active");
    }, 4000);
}

/* ============================= */
/* ===== SHOP FUNCTIONALITY ===== */
/* ============================= */

function increaseQty(button) {
    const qty = button.parentElement.querySelector('.qty');
    let current = parseInt(qty.textContent);

    if (current < 10) {   // 🔥 MAX LIMIT
        qty.textContent = current + 1;
    }
}

function decreaseQty(button) {
    const qty = button.parentElement.querySelector('.qty');
    let current = parseInt(qty.textContent);

    if (current > 1) {   // 🔥 MIN LIMIT
        qty.textContent = current - 1;
    }
}

function addToCart(button, price) {
    const card = button.closest('.card');
    const name = card.querySelector('h3').textContent;
    const qty = parseInt(card.querySelector('.qty').textContent);
    const image = card.querySelector('img').src;   // ✅ GET IMAGE
    const total = qty * price;

    const item = {
        name: name,
        price: price,
        quantity: qty,
        image: image,     // ✅ SAVE IMAGE
        total: total
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(item);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Item added to cart 🛒");
}

function buyNow(button, price) {

    const card = button.closest('.card');

    const name = card.querySelector('h3').textContent;
    const qty = parseInt(card.querySelector('.qty').textContent);
    const image = card.querySelector('img').src;

    const product = [{
        name: name,
        price: price,
        quantity: qty,
        image: image
    }];

    // 🔥 IMPORTANT: Save as checkoutItems (array)
    localStorage.setItem("checkoutItems", JSON.stringify(product));

    window.location.href = "checkout.html";
}