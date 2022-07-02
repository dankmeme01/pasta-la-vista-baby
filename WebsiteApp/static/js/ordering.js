
let submitForm = () => {
  Swal.fire({
    title: 'Точно?',
    icon: 'question',
    text: 'Ви дійсно хочете підтвердити замовлення?',
    showDenyButton: true,
    confirmButtonColor: '#3085d6',
    denyButtonColor: '#d33',
    confirmButtonText: 'Так, підтвердити!',
    denyButtonText: 'Ні, відмінити'
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: $("#order_form").attr("action"),
        type: $("#order_form").attr("method"),
        data: $("#order_form").serialize(),
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
