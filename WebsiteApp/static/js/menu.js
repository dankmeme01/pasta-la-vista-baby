function setCookie(cname, cvalue) {
  document.cookie = cname + "=" + cvalue + ";path=/menu";
}

function getCookie(cname) {
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

function menuItemClicked(id) {
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
    console.log(cookie);
    setCookie("menu", cookie, 1);
  }
}