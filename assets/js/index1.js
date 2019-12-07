$(".sidebar-dropdown > a").click(function() {
    $(".sidebar-submenu").slideUp(200);
    if (
        $(this)
        .parent()
        .hasClass("active")
    ) {
        $(".sidebar-dropdown").removeClass("active");
        $(this)
            .parent()
            .removeClass("active");
    } else {
        $(".sidebar-dropdown").removeClass("active");
        $(this)
            .next(".sidebar-submenu")
            .slideDown(200);
        $(this)
            .parent()
            .addClass("active");
    }
});

$("#close-sidebar").click(function() {
    $(".page-wrapper").removeClass("toggled");
});
$("#show-sidebar").click(function() {
    $(".page-wrapper").addClass("toggled");
});

$("#back-to-top").click(function() { return $("body, html").animate({ scrollTop: 0 }, 400), !1 });
$(function() { $('[data-toggle="tooltip"]').tooltip() });

// button add

// $('#myModal').modal()
// //thẻ card cho danh sách
// // Get the modal
// var modal = document.getElementById("myModal");

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks on the button, open the modal 
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }
$('.collapse').collapse();
$('#myCollapsible').collapse({
    toggle: false
});


// alert("test");
// $('.newdm').parents.index[1]
// $(document).ready(function() {
//     $("#themdanhmuc").click(function() {
//         alert("Value: " + $("#giatridm").val());
//     });
// });

// var danhmuc = ["danhmuc1", "danhuc2", "danhmuc3"];
// $(document).ready(function() {
//     if (!localStorage.getItem('danhmuc123')) {

//         localStorage.setItem('danhmuc123', JSON.stringify(danhmuc));
//     }

//     show();
// });


// function show() {
//     var hienthi = "";

//     var show1 = JSON.parse(localStorage.getItem('danhmuc123'));
//     console.log(show1);

//     show1.forEach(function(i) {
//         hienthi = hienthi + "<li>" +
//             " <a >" + i + "</a>" +
//             "</li>";
//     });
//     $('.showdm').html(hienthi);



//     // $('.showdm').html("abcxyz");

//     // document.getElementsByClassName('showdm')[0].innerHTML = "Học javascript cơ bản";
// }

// function themdm() {
//     var giatri = $("#giatridm").val();
//     // danhmuc.push(giatri);
//     var show2 = JSON.parse(localStorage.getItem('danhmuc123'));
//     show2.push(giatri);
//     localStorage.setItem('danhmuc123', JSON.stringify(show2));
//     show();

// }

// function suadm() {


// }

// function xoadm() {

// }

//alarm
(function () {
  var Alarms,changeTime,currentAlarmNumber,getFrequencyText,setAlarm,
  indexOf = [].indexOf;

  Alarms = [];

  currentAlarmNumber = null;

  changeTime = function (value, max, actionType) {
    if (actionType === 'increase') {
      value++;
      if (value > max) {
        value = 0;
      }
    } else {
      value--;
      if (value < 0) {
        value = max;
      }
    }
    if (value < 10) {
      value = `0${value}`;
    }
    return value;
  };

  getFrequencyText = function (frequency) {
    var days;
    days = ['Mo', 'Tue', 'We', 'Th', 'Fr', 'Sa', 'Su'].filter(function (element, index) {
      return indexOf.call(frequency, index) >= 0;
    });
    if (days.length === 7) {
      days = ['Everyday'];
    }
    return days.join(' ');
  };

  setAlarm = function (alarmNumber, hours, minutes, frequency) {
    var $alarm_card;
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    $alarm_card = $($('.alarm_card')[alarmNumber]);
    $alarm_card.find('.time').html(`${hours}:${minutes}`);
    $alarm_card.find('.frequency').html(getFrequencyText(frequency));
    return Alarms[alarmNumber] = {
      hours: hours,
      minutes: minutes,
      frequency: frequency };

  };

  $(function () {
    $('.switcher').on('click', function (e) {
      e.stopPropagation();
      return $(this).toggleClass('on');
    });
    $('.alarm_card').on('click', function () {
      var $day, currentAlarm, hours, minutes;
      $day = $('.day');
      $day.removeClass('active');
      window.currentAlarmNumber = $(this).data('index');
      currentAlarm = Alarms[window.currentAlarmNumber];
      currentAlarm.frequency.forEach(function (value) {
        return $($day[value]).addClass('active');
      });
      hours = currentAlarm.hours;
      if (hours < 10) {
        hours = `0${hours}`;
      }
      minutes = currentAlarm.minutes;
      $('.hours .value').text(hours);
      $('.minutes .value').text(minutes);
      $('.alarm_cards').removeClass('shown').addClass('hidden');
      return $('.alarm_change_card_wrapper').removeClass('hidden').addClass('shown');
    });
    $('.day').on('click', function () {
      return $(this).toggleClass('active');
    });
    $('.saving_button').on('click', function () {
      var frequency, hours, minutes;
      $('.alarm_cards').removeClass('hidden').addClass('shown');
      $('.alarm_change_card_wrapper').removeClass('shown').addClass('hidden');
      hours = parseInt($('.hours .value').text());
      minutes = parseInt($('.minutes .value').text());
      frequency = [];
      $('.day').each(function (index, element) {
        if ($(element).hasClass('active')) {
          return frequency.push(index);
        }
      });
      return setAlarm(window.currentAlarmNumber, hours, minutes, frequency);
    });

    //####### Set time ########
    $('.hours .up').on('click', function () {
      var newHours;
      newHours = changeTime(parseInt($('.hours .value').text()), 23, 'increase');
      return $('.hours .value').text(newHours);
    });
    $('.hours .down').on('click', function () {
      var newHours;
      newHours = changeTime(parseInt($('.hours .value').text()), 23, 'decrease');
      return $('.hours .value').text(newHours);
    });
    $('.minutes .up').on('click', function () {
      var newMinutes;
      newMinutes = changeTime(parseInt($('.minutes .value').text()), 59, 'increase');
      return $('.minutes .value').text(newMinutes);
    });
    $('.minutes .down').on('click', function () {
      var newMinutes;
      newMinutes = changeTime(parseInt($('.minutes .value').text()), 59, 'decrease');
      return $('.minutes .value').text(newMinutes);
    });
    setAlarm(0, 18, 0, [0, 1, 2, 3, 4, 5, 6]);
    setAlarm(1, 6, 0, [1, 2, 3]);
    return setAlarm(2, 12, 0, [3, 4, 5, 6]);
  });

}).call(this);

//# sourceURL=coffeescript