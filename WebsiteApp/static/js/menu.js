let cachedFoodLookup;

let menuItemClicked = (id) => {
  let elem = $(`#menu-item-${id}`);
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Added to cart',
    showConfirmButton: false,
    timer: 1000,
    toast: true
  })
  menuAdd(id);
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

// let selectCategory = (category) => {
//   // get all elements with class menu1__item, hide them, and display those who have a class food-category-{category}
//   if (category === "all") {
//     $(".menu1__item").show();
//     $(".menu1__empty").hide();
//     $(".menu1__class").removeClass("menu1__class_selected");
//     $(".menu1__class_all").addClass("menu1__class_selected");
//     return;
//   }

//   $(".menu1__item").hide();
//   let elems = $(`.menu1__item.food-category-${category}`);

//   if (elems.length <= 0) {
//     $(".menu1__empty").show();
//   }
//   else {
//     elems.show();
//     $(".menu1__empty").hide();
//   }
//   // now get all categories (with class menu1__class) and put menu1__class_selected only for one with id category-selector-{category}
//   $(".menu1__class").removeClass("menu1__class_selected");
//   $(`#category-selector-${category}`).addClass("menu1__class_selected");
// }

let selectCategory = (category) => {
  if (category === "all") {
    $(".menu1__category_items").show();
    $(".menu1__empty").hide();
    $(".menu1__class").removeClass("menu1__class_selected");
    $(".menu1__class_all").addClass("menu1__class_selected");
    return;
  }

  $(".menu1__category_items").hide();

  let elems = $(`.menu1__item.food-category-${category}`);
  if (elems.length <= 0) {
    $(".menu1__empty").show();
  }
  else {
    $(`#category-${category}`).show();
    $(".menu1__empty").hide();
  }

  $(".menu1__class").removeClass("menu1__class_selected");
  $(`#category-selector-${category}`).addClass("menu1__class_selected");
}
