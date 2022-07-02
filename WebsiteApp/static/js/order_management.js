let latestHash = "";

setInterval(() => {
  $.ajax({
    url: document.location.origin + "/orders_json/",
    success: (data) => {
      if (latestHash == "") {
        latestHash = data.hash;
        return;
      }
      if (data.hash != latestHash) {
        document.location.reload();
      }
    }
  })
}, 1000 * 15);