// Created by Tuukka Rouhiainen and Sauli Sjögren
$(document).ready(function () {

    function getTimeDate() {
        // Show current time and date. Clock on the screen
        var date = new Date();
        $('.hour').html(addZero(date.getHours()) + ":");
        $('.min').html(addZero(date.getMinutes()) + ":");
        $('.second').html(addZero(date.getSeconds()));

        function addZero(i) {
            if (i < 10)(i = "0" + i);
            return i;
        }
        if (date.getSeconds() == "0") {
          $.getJSON("http://api.reittiopas.fi/hsl/beta/?request=stop&userhash=9278df5c9c3b57ed68c68fea50730cb1c185b448a3cb&format=json&code=e2215", function (data) {
              print_schedule(data);
          });
          $.getJSON("http://api.reittiopas.fi/hsl/beta/?request=stop&userhash=9278df5c9c3b57ed68c68fea50730cb1c185b448a3cb&format=json&code=e2229", function (data) {
              print_schedule2(data);
          });
        }
    }
    window.setInterval(getTimeDate, 1000);


// Creates table where schedules are shown
    var theader = "<thead>" + "<tr>" + "<th>" + "Bus line" + "</th>" + "<th>" + "Departure" + "</th>" + "<th>" + "Destination" + "</th>" + "</tr>" + "</thead>";

    function print_schedule(data) {
        // Prints schedules on the screen
        var i;
        $("#mytable").remove();
        var tbl = $("<table/>").attr("id", "mytable");
        $(".busschedule").append(tbl);
        $("#mytable").append(theader);

        if (data[0].departures == null) {
            // If there are no schedules at the time, an empty table will be shown
            for (k = 0; k < 4; k++) {
                var td1 = "<tr><td>" + "</td>";
                var td2 = "<td>" + "</td>";
                var td3 = "<td>" + "</td></tr>";
                $("#mytable").append(td1 + td2 + td3);
            }
        } else {
            for (i = 0; i < data[0].departures.length; i++) {
                var td1 = "<tr><td>" + cleanBusNumber(data[0].departures[i]["code"]) + "</td>";
                var td2 = "<td>" + timeCleaner(data[0].departures[i].time) + "</td>";
                var td3 = "<td>" + searchDestination(data, data[0].departures[i].code) + "</td></tr>";
                $("#mytable").append(td1 + td2 + td3);
                if (i == 4){break;}
            }
            for (i; i < 4; i++) {
                var td1 = "<tr><td>" + "</td>";
                var td2 = "<td>" + "</td>";
                var td3 = "<td>" + "</td></tr>";
                $("#mytable").append(td1 + td2 + td3);
            }
        }
    }

    function print_schedule2(data) {
        // does the same thing as print_schedule(data)
        var i;
        $("#mytable2").remove();
        var tbl2 = $("<table/>").attr("id", "mytable2");
        $(".busschedule2").append(tbl2);
        $("#mytable2").append(theader);

        if (data[0].departures == null) {
             // If there are no schedules at the time, an empty table will be shown
            for (k = 0; k < 4; k++) {
                var td1 = "<tr><td>" + "</td>";
                var td2 = "<td>" + "</td>";
                var td3 = "<td>" + "</td></tr>";
                $("#mytable2").append(td1 + td2 + td3);
            }
        } else {
            for (i = 0; i < data[0].departures.length; i++) {
                var td1 = "<tr><td>" + cleanBusNumber(data[0].departures[i]["code"]) + "</td>";
                var td2 = "<td>" + timeCleaner(data[0].departures[i].time) + "</td>";
                var td3 = "<td>" + searchDestination(data, data[0].departures[i].code) + "</td></tr>";
                $("#mytable2").append(td1 + td2 + td3);
                if (i == 4){break;}

            }
            for (i; i < 4; i++) {
                var td1 = "<tr><td>" + "</td>";
                var td2 = "<td>" + "</td>";
                var td3 = "<td>" + "</td></tr>";
                $("#mytable2").append(td1 + td2 + td3);
            }
        }
    }


    function timeCleaner(time) {
        // add zeros to schedules if they are not shown. For example departure time 23.50 will need this that 0 after 5 is shown
        if (time.toString().length === 3) {
            return "0" + time.toString().slice(0, 1) + " : " + time.toString().slice(1);
        }
        if (time.toString().slice(0, 2) === "24") {
            return "00" + " : " + time.toString().slice(2);
        }
        if (time.toString().slice(0, 2) === "25") {
            return "01" + " : " + time.toString().slice(2);
        }
        return time.toString().slice(0, 2) + " : " + time.toString().slice(2);
    }

    function searchDestination(data, line) {
        // matches buslines and destinations
        var destination;
        $.each(data[0].lines, function (i, value) {
            if (value.search(line) >= 0) {
                destination = value.split(":")[1].split(",")[0];
            }
        });
        return destination;
    }

    function cleanBusNumber(line) {
        // function styles the line number to a normal bus line number
        var newLine = line.split(" ")[0];
        newLine = newLine.replace(2, "");
        if (newLine[0] === "0") {
            newLine = newLine.replace(0, "");
        }
        return newLine;
    }

 
});

 

