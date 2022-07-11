let deliveryPopup = () => {
  Swal.fire({
    html: `<div class="delivery-popup">
      <div class = "glovo">
        <a class = "glovo__href" target="_blank" href="https://glovoapp.com/ua/uk/cherkasi/pasta-la-vista-baby-chk/?utm_campaign=maplinks&utm_medium=organic&utm_source=googlemaps"><img src="${$("#hidden-img-del1").text()}"></a>
        <p class = "glovo__title">Glovo</p>
      </div>
      <div class = "misteram">
        <a class = "misteram__href" target="_blank" href="https://misteram.com.ua/cherkassy/pastalavista"><img src="${$("#hidden-img-del2").text()}"></a>
        <p class = "misteram__title">Mister.Am</p>
      </div>
      `,
    title: "Оберіть варіант доставки",
    showConfirmButton: false,
    showCloseButton: false,
    showCancelButton: false,
    heightAuto: false,
  })
};