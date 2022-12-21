"use strict";
const productsMenu = document.querySelector(`.honey__products-items-list`);
const products = document.querySelectorAll(`.honey__products-items-list-btn`);
const productImages = document.querySelectorAll(`.honey__product-img`);
const navBar = document.querySelector(`.honey__nav`);
const section1 = document.querySelector(`.honey__hero-section`);
const navMenu = document.querySelector(`.honey__nav-list`);
const details = document.querySelectorAll(`.honey__products-details`);
const shopingBag = document.querySelector(
  `.honey__products-details-add-product-container`
);
const contactDetails = document.querySelector(
  `.honey__nav-list-contact-details`
);
const imgText = document.querySelector(`.honey__products-images-text`);
const cart = document.querySelector(`.honey__products-details-cart`);
const productDetailsContainer = document.querySelector(
  `.honey__products-details-cart`
);
const cartItems = document.querySelector(`.honey__products-details-cart-items`);
const closeCartBtn = document.querySelector(
  `.honey__products-details-cart-close`
);
const addToCart = document.querySelector(
  `.honey__prodcuts-details-add-product-btn`
);
const shopContainer = document.querySelector(`.honey__products-container`);
const productsNumber = document.querySelector(`.honey__products-number`);
const displayDetails = function (clickedProduct) {
  const productDetails = document.querySelector(
    `.honey__products-details-${clickedProduct.dataset.product}`
  );
  details.forEach((detail) =>
    detail.classList.remove(`display-product-details`)
  );
  productDetails.classList.add("display-product-details");
  //DISPLAY SHOPING BAG
  shopingBag.classList.add(`display-shoping-bag`);
};

// WHEN I CLICK ON THE TARGETED PRODUCT I WANT THE ASSOCIATED PRODUCT
productsMenu.addEventListener(`click`, function (e) {
  const clickedProduct = e.target;

  if (!clickedProduct.classList.contains(`honey__products-items-list-btn`))
    return;
  products.forEach((product) => product.classList.remove(`active`));
  clickedProduct.classList.add(`active`);
  const img = document.querySelector(
    `.honey__product-img-${clickedProduct.dataset.product}`
  );
  if (clickedProduct) {
    products.forEach((product) => (product.style.opacity = 0.5));
    clickedProduct.style.opacity = 1;
  }
  // DELETE THE ACTIVE PRODUCT CLASS AFTER EACH NEW TARGET IS GENERATED
  productImages.forEach((img) => img.classList.remove(`active-product-img`));
  //ADD THE ACTIVE CLASS TO THE NEW TARGET

  img.classList.add(`active-product-img`);
  if (imgText) imgText.style.opacity = 0;

  // DISPLAY PRODUCT DETAILS
  displayDetails(clickedProduct);
});

// STICKY NAVIGATION

// CREATE STICKY NAV AFTER THE FIRST SECTION
const observerCallback = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    navBar.classList.add(`sticky-nav`);
    contactDetails.classList.add(`contact-display`);
  } else {
    navBar.classList.remove("sticky-nav");
    contactDetails.classList.remove(`contact-display`);
  }
};

const sectionObserver = new IntersectionObserver(observerCallback, {
  root: null,
  threshold: 0,
  rootMargin: "-90px",
});

sectionObserver.observe(section1);

// CREATE SCROLL TO SECTIONS
navBar.addEventListener(`click`, function (e) {
  e.preventDefault();
  const clickedLink = e.target;

  if (clickedLink.classList.contains(`honey__nav-link`)) {
    const id = clickedLink.getAttribute("href");
    console.log(id);
    const currentPosition = document.querySelector(id).getBoundingClientRect();

    window.scrollTo({
      left: 0,
      top: currentPosition.top + scrollY,
      behavior: `smooth`,
    });
  }
});

// CREATE MENU FADE ANIMATION

const menuFadeAnimation = function (e) {
  const link = e.target;
  if (link.classList.contains(`honey__nav-link`)) {
    const siblings = link
      .closest(`.honey__nav-list`)
      .querySelectorAll(`.honey__nav-link`);
    siblings.forEach((el) => (el !== link ? (el.style.opacity = this) : ""));
  }
};

navBar.addEventListener(`mouseover`, menuFadeAnimation.bind(0.5));
navBar.addEventListener(`mouseout`, menuFadeAnimation.bind(1));

navBar.addEventListener(`mouseover`, function (e) {
  const contact = e.target;
  if (contact.classList.contains(`contact`)) {
    document
      .querySelector(`.honey__nav-list-contact-details`)
      .classList.add("display-contact");
  }
});

navBar.addEventListener(`mouseout`, function (e) {
  const contact = e.target;
  if (contact.classList.contains(`contact`)) {
    document
      .querySelector(`.honey__nav-list-contact-details`)
      .classList.remove("display-contact");
  }
});

// WHEN CART IS CLICKED OPEN THE CART
cart.addEventListener(`click`, function () {
  cartItems.classList.add(`active-cart`);
  cart.classList.add(`hidden-cart`);
  closeCartBtn.classList.remove(`hidden-cart`);
});

// CLOSE THE CART

closeCartBtn.addEventListener(`click`, function () {
  cartItems.classList.remove(`active-cart`);
  cart.classList.remove(`hidden-cart`);
  closeCartBtn.classList.add(`hidden-cart`);
});

/* WHEN I CLICK THE BAG, ADD THE SELECTED PRODUCT TO THE CART 

1.HOW?

You need the textContent of the selected product to create an element based on the selected element.

*/

const productsArray = Array.from(products);
let numberOfItems = 0;
const productNamesArr = [];
shopingBag.addEventListener(`click`, function () {
  const filtered = productsArray.filter((product) =>
    product.classList.contains(`active`)
  );
  const currentProductName = filtered[0].textContent;

  if (productNamesArr.includes(currentProductName)) return;
  productNamesArr.push(currentProductName);
  const filteredNames = productNamesArr.filter((item) => item);
  if (numberOfItems === filteredNames.length) return;
  numberOfItems++;

  console.log(filteredNames);
  const productCartElement = `<div class="honey__product-details">
<p>${currentProductName}</p><span class="honey__product-details-quantity">x1</span><span class="honey__product-details-equal">=</span><span class="honey__product-details-price">10$</span>
</div>`;
  cartItems.insertAdjacentHTML("beforeend", productCartElement);

  productsNumber.textContent = "x" + numberOfItems;
});
