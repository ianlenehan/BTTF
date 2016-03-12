
var answers = {
  // four possible answers, followed by which index is correct, and the message that displays when answered
  1: ["SCIENCE", "TIMETVL", "OUTATIME", "TIME4U", 2, "The custom plate on the deLorean was 'OUTATIME'!"],
  2: ["LONE PINE", "WILD OAK", "BIG FIR", "TWIN PINES", 3, "Marty meets Doc at the Twin Pines mall."],
  3: ["CHICAGO vs MIAMI", "NEW YORK vs LA", "SAN FRANCISCO vs TEXAS", "BALTIMORE vs ATLANTA", 0, "Marty talks with a baseball fan about how Chicago faced Miami in the World Series."],
  4: ["SEPT. 21, 2015", "OCT. 21, 2015", "NOV. 8, 2015", "DEC. 1, 2015", 1, "BTTF nerds of the world recently celebrated Back to the Future Day on October 21, 2015."],
  5: ["MILK", "PEPSI", "ROOT BEER", "ICE WATER", 3, "Marty asks for iced water in 1885!"],
  6: ["CLARA", "CATHERINE", "CATELYN", "CORRINA", 0, "After saving her life, Doc and Clara fall in love."],
  7: ["CLINT EASTWOOD", "JOHN WAYNE", "JIMMY CARTER", "CALVIN KLEIN", 3, "Marty's teenage mum finds Calvin Klein written on his boxer shorts and mistakes it for his name."],
  8: ["121 GIGAWATTS", "121 MEGAWATTS", "1.21 GIGWATTS", "1.21 MEGAWATTS", 2, "The flux capacitor requires 1.21 Gigawatts of power!"],
  9: ["OOH LA LA", "HUSTLER", "PLAYBOY", "OUI OUI OUI", 0, "Marty thinks he's recovered the Sports Almanac until he finds a copy of Ooh La La inside the cover!"],
  10: ["COPERNICUS", "EINSTEIN", "EDISON", "TESLA", 0, "Doc's dog in 1955 is called Copernicus. His dog in 1985 is called Einstein."],
};

var question = 'media/questions/q1.png';
var timerImage = 'media/timer/10s.png'
var timerCountdown = 10;
var questionCounter = 1;
var TimerID = '';
var array = '';
var playerPoints = 0;
var name = '';

var startGame = function() {
  $('.question').stop(true).animate();
  $('.insert').stop(true).animate();
  playerPoints = 0;
  questionCounter = 1;
  $(".question").animate({
    opacity: 0
  }, 2500, function() {
    question = "media/questions/q" + questionCounter + ".png"
    $('.question').attr('src', question);
    $(".question").animate({
      opacity: 1
    }, 300);
    // imageCounter++;
    countdownTimer();
  })
};

var countdownTimer = function() {
  array = answers[questionCounter]
  $(".headline").animate({
    opacity: 0
  }, 3000);
  $("#one").text(array[0]);
  $("#two").text(array[1]);
  $("#three").text(array[2]);
  $("#four").text(array[3]);
  $(".insert").animate({
    opacity: 0
  }, 13000);
  $(".question").animate({
    opacity: 0
  }, 13000);
  timerCountdown = 10;
  timerImage = 'media/timer/10s.png';
  timerID = setInterval(function() {
    $(".timer").attr('src', timerImage)
    timerCountdown--;
    timerImage = 'media/timer/' + timerCountdown + 's.png'
    if (timerCountdown < 0) {
      clearInterval(timerID);
      swal({
        title: "Sorry!",
        text: array[5] + " No points for this question!",
        type: "warning",
        showCancelButton: false,
        confirmButtonColor: "rgb(16, 150, 81)",
        confirmButtonText: "Next question!",
        closeOnConfirm: true
      }, function() {
        nextMove();;
      });
      timerCountdown = 10;
    }
  }, 1000);
};

var nextMove = function() {
  questionCounter++
  if (questionCounter > 10) {
    myDataRef.push({name: name, points: playerPoints});
    setTimeout(function() {
      swal({
        title: "Congratulations " + name + "!",
        text: "You have prevented Doc Brown from being committed! Your final tally is " + playerPoints + " points! You can play again, even if it's obviously cheating.",
        type: "success",
        showCancelButton: true,
        confirmButtonColor: "rgb(16, 150, 81)",
        confirmButtonText: "Play Again",
        closeOnConfirm: true
      }, function() {
        startGame();
      });
    }, 1000);
    // return;
  } else {
    question = "media/questions/q" + questionCounter + ".png"
    $('.question').attr('src', question).css({
      opacity: '1'
    });
    $('.insert').css({
      opacity: '1'
    })
    $(".timer").attr('src', 'media/timer/10s.png')
    countdownTimer();
  }
};


$(document).ready(function() {



  $('.question').on('click', function() {
    swal({
        title: "Hi There!",
        text: "Your Name Please:",
        type: "input",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "your name"
      },
      function(inputValue) {
        name = inputValue;
        if (inputValue === false) return false;
        if (inputValue === "") {
          swal.showInputError("You don't have a name? That's terrible.");
          return false
        };
        swal({
          title: "Hi " + inputValue + "!",
          text: "Answer the questions in time to prevent Doc Brown from being committed in the future! Are you ready to play?",
          type: "success",
          showCancelButton: false,
          confirmButtonColor: "rgb(16, 150, 81)",
          confirmButtonText: "Let's Play!",
          closeOnConfirm: true
        }, function() {
          startGame();;
        });
      });

  });

  $('.answer').on('click', function() {
    $('.question').stop(true).animate();
    $('.insert').stop(true).animate();
    clearInterval(timerID);
    var whichAnswer = +$(this).attr('data-index');
    if (whichAnswer === array[4]) {
      var score = (timerCountdown + 1) * 10
      playerPoints += score;
      swal({
        title: "Correct!",
        text: array[5] + " You have earned " + score + " points!",
        type: "success",
        showCancelButton: false,
        confirmButtonColor: "rgb(16, 150, 81)",
        confirmButtonText: "Next question!",
        closeOnConfirm: true
      }, function() {
        nextMove();;
      });
    } else {
      swal({
        title: "Sorry!",
        text: array[5] + " No points for this question!",
        type: "warning",
        showCancelButton: false,
        confirmButtonColor: "rgb(16, 150, 81)",
        confirmButtonText: "Next question!",
        closeOnConfirm: true
      }, function() {
        nextMove();;
      });
    }
  });

  $('p').hover(function() {
        $(this).stop().animate({ fontSize : '24px', color: 'rgba(0, 0, 0, 1)' });
  },
  function() {
        $(this).stop().animate({ fontSize : '18px',  });
  });

  $('.mute').on('click', function () {
    $('.audio').toggle();
  })
});
