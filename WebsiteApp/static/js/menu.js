let cachedFoodLookup;

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

let foodElemBuilder = (food, id) => {
  let listEntry = $(`<li class='cart__item'></li>`);
  let paraTag = $(`<span>${food.title} (${food.price} грн.) </span>`);
  let button = $(`<a href="javascript:menuRemove(${id})"><ion-icon name="trash" class="cart__remove"></ion-icon></a>`);
  listEntry.append(paraTag);
  listEntry.append(button);
  return listEntry;
}

let updateCart = () => {
  let cookie = getCookie("menu");
  if (cookie.length <= 0) {
    $(".cart").hide();
  }
  else {
    $(".cart").show();
    let cartbody = $(".cart__body");
    cartbody.empty();
    let items = cookie.split(",");
    if (items.length == 1 && items[0] == "") {
      $(".cart").hide();
    }
    else {
      let price = 0;
      for (let item in items) {
        let foodItem = lookupFoodById(items[item]);
        let itemElem = foodElemBuilder(foodItem, item);
        cartbody.append(itemElem);
        price += parseFloat(foodItem.price);
      }
      $(".cart__total").text(price);
    }
  }
}

let menuItemClicked = (id) => {
  let cookie = getCookie("menu");
  if (cookie.length <= 0) {
    setCookie("menu", id, 1);
  } else {
    let items = cookie.split(",");
    if (items.length == 1 && items[0] == "") {
      items = [];
    }

    items.push(id);

    cookie = items.join(",");
    setCookie("menu", cookie, 1);
  }
  updateCart();
}

let menuRemove = (id) => {
  let cookie = getCookie("menu");
  let items = cookie.split(",");
  items.splice(id, 1);
  cookie = items.join(",");
  setCookie("menu", cookie, 1);
  updateCart();
}

let menuRemoveAll = () => {
  setCookie("menu", "", 1);
  updateCart();
}

window.onload = async () => {
  lookupFood().then(data => {
    cachedFoodLookup = data;
    updateCart();
  });
}

let lookupFood = () => {
  let baseAddress = document.location.origin;
  let url = baseAddress + "/food_json";

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

let lookupFoodById = (id) => {
  if (!cachedFoodLookup) {
    lookupFood().then(data => {
      cachedFoodLookup = data;
    });
  }
  return cachedFoodLookup[id];
}

$("#place_order_form").submit(function (e) {
  e.preventDefault();
  $.ajax({
    url: $(this).attr("action"),
    type: "POST",
    data: $(this).serialize(),
    success: (data) => {
      if (data.error) {
        Swal.fire({
          title: "Помилка",
          text: data.message,
          icon: "error",
          confirmButtonText: "Ок"
        });
      }
      else {
        Swal.fire({
          title: "Успіх",
          text: data.message,
          icon: "success",
          confirmButtonText: "Ок"
        });
        $("#place_order_form").trigger("reset");
        menuRemoveAll();
      }
    }
  });
});