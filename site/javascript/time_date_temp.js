$(document).ready(function ()  {
    
  var date;
    var yy;
    var year;

    function getTimeDate() {
        // Show current time and date. Clock on the screen
        date = new Date();
        yy = date.getYear();
        year = (yy < 1000) ? yy + 1900 : yy;
        $('#date').html(date.getDate() + "." + (date.getMonth() + 1) + "." + year);
        $('.hour').html(addZero(date.getHours()) + ":");
        $('.min').html(addZero(date.getMinutes()) + ":");
        $('.second').html(addZero(date.getSeconds()));

        function addZero(i) {
            if (i < 10)(i = "0" + i);
            return i;



        }
    }
    
    function print_temperature() {
           $.getJSON("http://api.openweathermap.org/data/2.5/weather?id=6295613&mode=json&APPID=f2504fd23a51d501c64e5fa91c4f8f84", function (data) {
        var temp_celcius = data.main.temp - 273.15;
        $("#temperature").html(temp_celcius + "&#x2103");
               console.log(data.wind.speed);
    });
        setTimeout(function () {
            print_temperature();
        }, 120000);
     
    }
    window.setInterval(getTimeDate, 1000);
    print_temperature();
    
    
    


});
