
$(document).ready(function() {
  var k = 0;
  showEvents();
  function parse_date(data) {
          // parses date from the  start_time on .json file
          var date = data.split("T")[0].split("-")[2] + "." + data.split("T")[0].split("-")[1] + "." + data.split("T")[0].split("-")[0];
          return date + " ";
      }

      function parse_time(data) {
          // parses time from the start_time on .json file
          var time = data.split("T")[1].split("+")[0].split(":")[0] + ":" + data.split("T")[1].split("+")[0].split(":")[1];
          return time;
      }

      function replace_newline(data) {
          // Changes all .json format newlines to htlm format newlines
          data.replace("\n", "<br>");
          return data.replace(/\n/g, "<br>");
      }


        function Events(data) {
            // Events will be shown for 30 sec at a time
            if (k > data.data.length - 1) {
                k = 0;
            }
            $(".picturehandler img").remove();
            $(".eventLocation h2").remove();
            $(".eventTitle h3").remove();
            $(".eventMetaPostedOnDate h2").remove();
            $(".time").empty();
            $(".date").empty();
            $(".picturehandler").prepend("<img src=" + data.data[k].id + ">");
            $(".eventTitle").append("<h3>" + data.data[k].name + "</h3>");
            $(".eventLocation").append("<h2>" + " @ " + " " + data.data[k].place.name + "</h2>");

            $(".time").append(parse_time(data.data[k].start_time));
            $(".date").append(parse_date(data.data[k].start_time))

            k++;
        }
        function showEvents() {
                // downloads events from the .json file on server
                $.getJSON("javascript/events.json", function (data) {
                    if (data.data[0] == null) {
                        $(".picturehandler img").remove();
                        $(".eventLocation h2").remove();
                        $(".eventTitle h3").remove();
                        $(".eventMetaPostedOnDate h2").remove();
                        $(".time").empty();
                        $(".date").empty();
                        $(".eventTitle").append("<h3 id='no_events'>" + "No events" + "</h3>");
                    }
                    else {
                        Events(data);
                    }
                });
            }
        setInterval(function () {
                showEvents()
            }, 5000);
});
