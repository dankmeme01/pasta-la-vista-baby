//! ========== BURGER ==========

const hamb = document.querySelector("#hamb")
const popup = document.querySelector("#popup")
const menu = document.querySelector("#menu").cloneNode(1);
const body = document.body;
let loadHooks = [];

hamb.addEventListener("click", hambHandler);

function hambHandler(e) {
  e.preventDefault();
  popup.classList.toggle("open");
  hamb.classList.toggle("burger_active");
  body.classList.toggle("noscroll");

  renderPopup();
}

function renderPopup() {
  popup.appendChild(menu);
}

// scroll to top arrow
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// remove # from url
let hideHash = () => {
  setTimeout(() => {
    history.pushState("/", document.title, window.location.pathname
      + window.location.search);
  }, 10);
}

// remove bugged popup on page load
setTimeout(() => {
  $(".popup__reservation").css("transition", "all 0.5s ease 0s");
  $(".popup__cart").css("transition", "all 0.5s ease 0s");
}, 500);

// cookie helpers
let setCookie = (cname, cvalue) => {
  document.cookie = cname + "=" + cvalue + ";path=/";
}

let getCookie = (cname) => {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

let updateCart = (menu = null) => {
  if (menu == null) {
    menu = parseMenu();
  }

  let cartbody = $(".popup__cart__list");
  cartbody.empty();
  let total = 0;
  let foodAmount = 0;

  if (Object.keys(menu).length <= 0) {
    $(".popup__cart__empty").show();
    $(".popup__cart__price").hide();
    $("#cart-button-menu").show();
    $("#cart-button-order").hide();
    cartbody.hide();
  }
  else {
    let entries = Object.entries(menu);
    let sorted = entries.sort((a, b) => {
      let foodA = lookupFoodById(a[0]);
      let foodB = lookupFoodById(b[0]);
      return foodA.title.localeCompare(foodB.title);
    });

    // only ES10, fallback method availale
    if (Object.fromEntries) {
      sorted = Object.fromEntries(sorted);
    }
    else {
      sorted = Object.assign({}, ...sorted);
    }

    for (let foodId in menu) {
      let qty = parseInt(menu[foodId]);
      let { title, price, image } = lookupFoodById(foodId);
      cartbody.append(foodElemBuilder(title, price, foodId, qty, image));
      total += price * qty;
      foodAmount += qty; // replace qty with 1 to get the amount of food
    }
    $(".popup__cart__empty").hide();
    $(".popup__cart__price").show();
    $("#cart-button-menu").hide();
    $("#cart-button-order").show();
    cartbody.show();
  }

  $(".popup__cart__price__price1").text(total);
  $(".menu__item__cart__number").text(foodAmount);
  $(".menu__item__cart__number2").text(foodAmount);

  $(".menu__item__cart__number").removeClass("menu__item__cart__number_mod");
  $(".menu__item__cart__number2").removeClass("menu__item__cart__number2_mod");

  if (foodAmount >= 10) {
    $(".menu__item__cart__number").addClass("menu__item__cart__number_mod");
    $(".menu__item__cart__number2").addClass("menu__item__cart__number2_mod");
  }

  let link = document.location.pathname;
  // trim slashes with regex
  link = link.replace(/^\/|\/$/g, '');
  if (link == 'ordering') {
    let modbody = cartbody.clone();
    modbody.removeClass("popup__cart__list");
    modbody.addClass("popup__cart__list_orddering");
    console.log(modbody)
    let ordbtn = $(".ordering__button");
    let cbody = $(".cart");
    cbody.empty();
    modbody.appendTo(cbody);
    cbody.append(ordbtn);
  }
}

// menu cookie built like 2x3, 4x5. which means 2 items of id 3, and 4 items of id 5
let parseMenu = () => {
  let cookie = getCookie("menu");
  let items = cookie.split(',');
  let menu = {};
  for (let item of items) {
    if (item == "") continue;
    let [quantity, id] = item.split('x');
    if (!(id in menu)) {
      menu[id] = quantity;
    }
    else {
      menu[id] += quantity;
    }
  }

  return menu;
}

// save cookie
let saveMenu = (menu) => {
  let cookie = "";
  for (let item in menu) {
    cookie += `${menu[item]}x${item},`;

    if (cookie.length > 1000) {
      console.log("cookie too long, L");
      return;
    }
  }
  setCookie("menu", cookie);
}

// substract one food amount for the id
let menuSubstract = (id) => {
  let menu = parseMenu();
  if (!id in menu) return;

  menu[id]--;
  if (menu[id] == 0) {
    delete menu[id];
  }

  saveMenu(menu);
  updateCart(menu);
}

// add one food amount for the id
let menuAdd = (id) => {
  let menu = parseMenu();
  if (!(id in menu)) {
    menu[id] = 1;
  }
  else {
    menu[id]++;
  }
  saveMenu(menu);
  updateCart(menu);
}

// remove the id completely
let menuRemove = (id) => {
  let menu = parseMenu();
  if (!id in menu) return;
  delete menu[id];
  saveMenu(menu);
  updateCart(menu);
}

// remove all elements from menu
let menuRemoveAll = () => {
  saveMenu({})
  updateCart({});
}

loadHooks.push(async () => {
  lookupFood().then(data => {
    cachedFoodLookup = data;
    updateCart();
  });

  let link = document.location.pathname;
  // trim slashes with regex
  link = link.replace(/^\/|\/$/g, '');
  switch (link) {
    case "menu":
      selectCategory("all");
      $("#header_link_menu").addClass("menu__text_selected");
      break;
    case "contact":
      $("#header_link_contacts").addClass("menu__text_selected");
      break;
    case "about":
      $("#header_link_about").addClass("menu__text_selected");
      break;
  }
})

let lookupFoodById = (id) => {
  if (!cachedFoodLookup) {
    lookupFood().then(data => {
      cachedFoodLookup = data;
    });
  }
  return cachedFoodLookup[id];
}

let lookupFood = () => {
  let baseAddress = document.location.origin;
  let url = baseAddress + "/food_json/";

  return new Promise(resolve => {
    $.ajax({
      url: url,
      type: "GET",
      dataType: "json",
      success: (data) => {
        resolve(data);
      },
      error: (data) => {
        console.error(data);
      }
    });
  });
}

let foodElemBuilder = (name, price, id, qty, imgsrc, forOrdering = false) => {
  let buttonLinks = $(`.hidden_button_links`);
  let trashLink = buttonLinks.find('#button_remove_svg').text();
  let plusLink = buttonLinks.find('#button_plus_svg').text();
  let minusLink = buttonLinks.find('#button_minus_svg').text();


  let listEntry = $(`<li class='cart__item'></li>`);
  // cart__item_title - cart__item_price - cart__item_qty
  let imageTag = $(`<div class='cart__item_image'><img src='${imgsrc}' alt='${name}'></div>`);
  let paraTag = $(`<div class='cart__item_text'><span class='cart__item_title'>${name}</span><span class='cart__item_price'>${price} грн.</span></div>`);
  let buttons = $(`<div class='cart__item_buttons'><a href="javascript:menuRemove(${id})"><img class="cart__remove" src="${trashLink}"></a>
                   <div class='cart__item_modifiers'><a href="javascript:menuSubstract(${id})"><img src = "${minusLink}" class="cart__substract"></a>
                   <span class='cart__item_qty'>${qty}</span>
                   <a href="javascript:menuAdd(${id})"><img src = "${plusLink}" class="cart__add"></a></div></div>`);
  listEntry.append(imageTag);
  listEntry.append(paraTag);
  listEntry.append(buttons);
  return listEntry;
}

let popupOpened = () => {
  hideHash();
  disableScroll();
}

let popupClosed = () => {
  hideHash();
  enableScroll();
}

let disableScroll = () => {
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  window.onscroll = function () {
    window.scrollTo(scrollLeft, scrollTop);
  };
}

let enableScroll = () => {
  window.onscroll = function () { };
}

let orderModifyTool = (num) => {
  let n = $("#amount_of_tools").val();
  n = parseInt(n);
  n += num;

  let min = $("#amount_of_tools").attr("min");
  let max = $("#amount_of_tools").attr("max");
  if (n < min) n = min;
  if (n > max) n = max;
  $("#amount_of_tools").val(n);
}

let runHooks = () => {
  console.log("DOM loaded, executing hooks:", loadHooks.length);
  for (let hook of loadHooks) {
    hook();
  }
};

document.addEventListener("DOMContentLoaded", runHooks);


let submitReservation = () => {
  Swal.fire({
    title: 'Точно?',
    icon: 'question',
    text: 'Ви дійсно хочете підтвердити резервування?',
    showDenyButton: true,
    confirmButtonColor: '#3085d6',
    denyButtonColor: '#d33',
    confirmButtonText: 'Так, підтвердити!',
    denyButtonText: 'Ні, відмінити'
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: $("#reservation-form").attr("action"),
        type: $("#reservation-form").attr("method"),
        data: $("#reservation-form").serialize(),
        success: (result) => {
          Swal.fire({
            title: 'Успiх!',
            text: result.message,
            icon: 'success',
            confirmButtonText: 'OK'
          });
        },
        error: (error) => {
          Swal.fire({
            title: 'Помилка!',
            text: error.responseText,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    }
  })
}