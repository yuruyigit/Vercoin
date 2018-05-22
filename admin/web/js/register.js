$(function () {
  $("#check1").on("click", function () {
    if ($(this).is(':checked')) {
      $("#registerSubmit").removeAttr("disabled")
    } else {
      $("#registerSubmit").attr("disabled", "disabled")
    }
  });
  window.GETCODE({
    btn: $("#getCode"),
    input: $("#cell"),
    api:'/sendSms',
    country: $("#countriesId")
  })
});


