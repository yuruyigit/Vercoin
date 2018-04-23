
//省市控件，使用方法可以参考：赛事报名和我的主页个人信息修改
$(document).ready(function(){
    $('#i_province').on('change', function(){
        updateCitySelections($(this).val());
    });
    var cityData = null;
    //获取省份城市
    $.get('/public/provinces/cities', function (data) {
        cityData = data;
        var sourceProvince = $('#i_province').val();
        var sourceCity = $('#i_city').val();
        renderProvinceData(cityData, sourceProvince);
        renderCityData(sourceProvince, sourceCity);
    }, "json");
    function renderProvinceData(cityData, sourceProvince){
        var options = "";
        if(!sourceProvince){
            options = "<option value=''>请选择</option>";
        }
        if(cityData){
            for(var i in cityData){
                options += "<option value='"+cityData[i].name+"'>"+cityData[i].name+"</option>";
            }
        }
        $("#i_province").html(options);
    }
    function renderCityData(province, city){
        if(province){
            $('#i_province').val(province);
            updateCitySelections(province);
        }
        if(city){
        	$('#i_city').val(city);
        }
    }
    function updateCitySelections(province){
        $("#i_city option").remove();
        var cities;
        for(var i in cityData){
            if(cityData[i].name == province){
                cities = cityData[i].cities;
                break;
            }
        }
        for(var k in cities){
        	
            $("#i_city").append("<option value='"+cities[k].name+"'>"+cities[k].name+"</option>");
        }
    }
});