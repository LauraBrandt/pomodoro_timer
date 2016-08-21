$(document).ready(function() {
  var status = "work";
  var paused = "start";

  $(".progress-circle").on({
    mouseenter: function() {
      drawInactiveHover();
      drawActiveHover(((secondsLeft + 1) / totalSeconds));
    },
    mouseleave: function() {
      drawInactive();
      drawActive(((secondsLeft + 1) / totalSeconds));
    },
    mousedown: function() {
      drawInactiveMousedown()
      $(".progress-circle p").css({'font-size':'34px', 'top':'69px'});
    },
    mouseup: function() {
      drawInactive();
      $(".progress-circle p").css({'font-size':'35px', 'top':'66px'});
    },
    click: function() {
      if (paused == "start") {
        initialize();
      }
      if (paused != false) {
        paused = false;
        startTimer();
      } else {
        paused = true;
        clearInterval(timer);
        $(".progress-circle p").html("<br>Paused<br>");
      }

    }
  });

  ///// SOUNDS /////

  var bell = document.createElement('audio');
  bell.setAttribute('src', 'sounds/bell.mp3');
  var pebbles = document.createElement('audio');
  pebbles.setAttribute('src', 'sounds/pebbles.mp3');
  var one = document.createElement('audio');
  one.setAttribute('src', 'sounds/one.mp3');
  var space = document.createElement('audio');
  space.setAttribute('src', 'sounds/space.mp3');

  function playSound() {
    var sound = $("input[name=sounds]:checked").val();
    if (sound == "bell") {
      bell.play()
    } else if (sound == "pebbles") {
      pebbles.play()
    } else if (sound == "one") {
      one.play()
    } else if (sound == "space") {
      space.play()
    }
  }

  $("#bell").click(function() {
    playSound()
  });
  $("#pebbles").click(function() {
    playSound()
  });
  $("#one").click(function() {
    playSound()
  });
  $("#space").click(function() {
    playSound()
  });

  ///// CANVAS DRAWING /////

  var iProgress = document.getElementById('inactiveProgress');
  var iProgressCTX = iProgress.getContext('2d');
  drawInactive();

  var aProgress = document.getElementById('activeProgress');
  var aProgressCTX = aProgress.getContext('2d');
  drawActive(1);

  function drawInactive() {
    // Outer Circle
    iProgressCTX.beginPath();
    iProgressCTX.strokeStyle = '#555';
    iProgressCTX.lineWidth = 4;
    iProgressCTX.arc(137.5, 137.5, 130, 0, 2 * Math.PI);
    iProgressCTX.stroke();
    iProgressCTX.fillStyle = '#a0a0a0';
    iProgressCTX.fill();

    // Inner Circle
    iProgressCTX.beginPath();
    iProgressCTX.strokeStyle = '#444';
    iProgressCTX.lineWidth = 3;
    iProgressCTX.arc(137.5, 137.5, 99, 0, 2 * Math.PI);
    iProgressCTX.stroke();
    var grd = iProgressCTX.createRadialGradient(137.5, 137.5, 85, 137.5, 137.5, 120);
    grd.addColorStop(0, "#bb9093");
    grd.addColorStop(1, "#555");
    iProgressCTX.fillStyle = grd
    iProgressCTX.fill();
  };

  function drawActive(fraction) {
    aProgressCTX.clearRect(0, 0, aProgress.width, aProgress.height);
    var startArc = -(Math.PI / 2)
    var endArc = (2 * Math.PI * fraction) - (Math.PI / 2);
    aProgressCTX.beginPath();
    var grd = aProgressCTX.createRadialGradient(137.5, 137.5, 10, 137.5, 137.5, 220);
    grd.addColorStop(.34, "#222");
    grd.addColorStop(.47, "#AF0B0B");
    grd.addColorStop(.5, "#AF0B0B");
    grd.addColorStop(.53, "#AF0B0B");
    grd.addColorStop(.66, "#222");
    aProgressCTX.strokeStyle = grd //'#AF0B0B'; 
    aProgressCTX.lineWidth = 30;
    aProgressCTX.arc(137.5, 137.5, 115, startArc, endArc);
    aProgressCTX.stroke();
  };

  function drawInactiveHover() {
    // Outer Circle
    iProgressCTX.beginPath();
    iProgressCTX.strokeStyle = '#666';
    iProgressCTX.lineWidth = 4;
    iProgressCTX.arc(137.5, 137.5, 130, 0, 2 * Math.PI);
    iProgressCTX.stroke();
    iProgressCTX.fillStyle = '#b0b0b0';
    iProgressCTX.fill();

    // Inner Circle
    iProgressCTX.beginPath();
    iProgressCTX.strokeStyle = '#555';
    iProgressCTX.lineWidth = 3;
    iProgressCTX.arc(137.5, 137.5, 99, 0, 2 * Math.PI);
    iProgressCTX.stroke();
    var grd = iProgressCTX.createRadialGradient(137.5, 137.5, 85, 137.5, 137.5, 120);
    grd.addColorStop(0, "#C49B9E");
    grd.addColorStop(1, "#666");
    iProgressCTX.fillStyle = grd
    iProgressCTX.fill();
  };

  function drawActiveHover(fraction) {
    aProgressCTX.clearRect(0, 0, aProgress.width, aProgress.height);
    var startArc = -(Math.PI / 2)
    var endArc = (2 * Math.PI * fraction) - (Math.PI / 2);
    aProgressCTX.beginPath();
    var grd = aProgressCTX.createRadialGradient(137.5, 137.5, 10, 137.5, 137.5, 220);
    grd.addColorStop(.34, "#222");
    grd.addColorStop(.47, "#B31515");
    grd.addColorStop(.5, "#B31515");
    grd.addColorStop(.53, "#B31515");
    grd.addColorStop(.66, "#222");
    aProgressCTX.strokeStyle = grd //'#AF0B0B'; 
    aProgressCTX.lineWidth = 30;
    aProgressCTX.arc(137.5, 137.5, 115, startArc, endArc);
    aProgressCTX.stroke();
  };
  
  function drawInactiveMousedown() {
    // Outer Circle
    iProgressCTX.beginPath();
    iProgressCTX.strokeStyle = '#666';
    iProgressCTX.lineWidth = 4;
    iProgressCTX.arc(137.5, 137.5, 130, 0, 2 * Math.PI);
    iProgressCTX.stroke();
    iProgressCTX.fillStyle = '#b0b0b0';
    iProgressCTX.fill();

    // Inner Circle
    iProgressCTX.beginPath();
    iProgressCTX.strokeStyle = '#333';
    iProgressCTX.lineWidth = 3;
    iProgressCTX.arc(137.5, 137.5, 99, 0, 2 * Math.PI);
    iProgressCTX.stroke();
    var grd = iProgressCTX.createRadialGradient(137.5, 137.5, 93, 137.5, 137.5, 100);
    grd.addColorStop(0, "#bb9093");
    grd.addColorStop(1, "#222");
    iProgressCTX.fillStyle = grd
    iProgressCTX.fill();
  };
  

  function displayTime(secondsLeft) {
    var minutes = parseInt(secondsLeft / 60);
    var seconds = secondsLeft - (minutes * 60)
      // convert to string,
      // padding zeros on the left
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    var display_time = String(minutes) + ":" + String(seconds);
    var display_status = (status == "work") ? "Work Time" : "Break Time";
    $(".progress-circle p").html("<div id='status-message'>" + display_status + "</div>" + "<div id='time-display'>" + display_time + "</div> <div id='pause-message'>Click to pause.</div>");
  };

  ///// TIMER FUNCTIONS AND CONTROLS/////
  var secondsLeft = 25 * 60;
  var totalSeconds = 25 * 60;
  var timer

  function initialize() {
    var selector = "#" + status + "-time";
    totalSeconds = $(selector).val() * 60;
    secondsLeft = totalSeconds - 1;
  }

  function startTimer() {
    timer = setInterval(increment, 1000);
  }

  function increment() {
    displayTime(secondsLeft);
    drawActive((secondsLeft / totalSeconds));
    if (secondsLeft <= 0) {
      playSound()
      clearInterval(timer);
      status = (status == "work") ? "break" : "work";
      announceFinish();
      initialize();
      startTimer();
    } else {
      secondsLeft -= 1;
    }
  };

  function announceFinish() {
    if (status == "break") {
      $(".progress-circle p").html("<br>Break!<br>");
    } else if (status == "work") {
      $(".progress-circle p").html("<br>Work!<br>");
    }

  };

  $("#reset").click(function() {
    clearInterval(timer);
    $(".progress-circle p").html("<br>Start<br>");
    paused = "start";
    status = "work";
    drawActive(1);
  });

});