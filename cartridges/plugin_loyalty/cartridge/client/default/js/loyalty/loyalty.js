
$('.loyalty-submit').click(function (e) {
  e.preventDefault();
  var $form = $('#dwfrm_billing');
  $('.credit-card-content fieldset').prop('disabled', true);
  $.ajax({
    type: 'POST',
    url: $form.attr('action'),
    data: $form.serialize(),
    success: function () {
      window.location.reload();
    },
    error: function () {
      $('.credit-card-content fieldset').prop('disabled', false);
      console.log(data);
    },
    dataType: 'json'
  });
});

$('.loyalty-remove').click(function () {
  const url = $(this).data('url');
  $.ajax({
    type: 'DELETE',
    url: url,
    success: function (data) {
      window.location.reload();
    },
    error: function (data) {
      console.log(data);
    }
  });
});

$('.payment-options .nav-item').on('click', function (e) {
  e.preventDefault();
  var methodID = $(this).data('method-id');
  if (methodID.toLowerCase() === 'loyalty') {
    $('.submit-payment').hide();
  } else {
    $('.submit-payment').show();
  }
});
