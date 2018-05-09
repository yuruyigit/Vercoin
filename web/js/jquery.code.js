$.fn.sendCode = function (option) {
  var t =$(this);
  var defaults = {
    time: 120,
    api: '/sendSms',
    cell: '',
    countriesId: '',
    sendingClass:'code_sending'
  };
  var options = $.extend(defaults, option);
  t.attr("data-sending", '0');
  t.on("click", function (e) {
    e.preventDefault();
    // sending return
    if (t.attr("data-sending") === '1') {
      return false;
    }
    var config = {
      method: "post",
      url: options.api,
      data: {
        "cell": options.cell,
        "countriesId": options.countriesId
      },
	  success: function(data,status,xhr){
		  console.log(data)
		  console.log(status)
		  console.log(xhr)
	  },
	  error: function(data,status,xhr){
		  console.log(data)
		  console.log(status)
		  console.log(xhr)
	  }
	  
    }
    $.ajax(config)

	
	
  })
}