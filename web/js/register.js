$(function () {
  var SUBMIT = $("#registerSubmit"),
    CODEBTN = $("#getCode");
  /**
   * @check if the user agree
   */
  $("#check1").on("click", function () {
    if ($(this).is(':checked')) {
      SUBMIT.removeAttr("disabled")
    } else {
      SUBMIT.attr("disabled", "disabled")
    }
  });

  window.GETCODE({
    btn: $("#getCode"),
    input: $("#cell"),
    api:'/sendSms',
    country: $("#countryList")
  })

});


