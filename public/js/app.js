$.fn.hasAttr = function(name) {
   return (typeof this.attr(name) !== 'undefined' && this.attr(name) !== false);
};


$(document).ready(function(){
  var pauseBtn = $('#pause');
  var startBtn = $('#start-work');
  var resetBtn = $('#reset');
  var shortBreakBtn = $('#short-break');
  var longBreakBtn = $('#long-break');
  var minutes = $('#minutes');
  var seconds = $('#seconds');
  var countdown;
  var pause = 0;
  var working = 0;
  var onShortBreak = 0;
  var onLongBreak = 0;
  var reset = 0;
  var pomodoros = 0;
  var workSessions = 0;
  var shortBreakSessions = 0;
  var longBreakSessions = 0;


  startBtn.on('click', startButtonClicked);
  pauseBtn.on('click', pauseButtonClicked);
  shortBreakBtn.on('click', shortBreakButtonClicked);
  longBreakBtn.on('click', longBreakButtonClicked);
  resetBtn.on('click', resetButtonClicked);

  function startButtonClicked(){
    working = 1;
    onShortBreak = 0;
    onLongBreak = 0;
    workSessions = workSessions + 1;
    minutes.text('00');
    seconds.text('05')
    console.log("start clicked: " + working +" "+ onShortBreak +" "+ workSessions +" "+ shortBreakSessions +" "+ onLongBreak +" "+ pomodoros);
    checkButtonStatus();
    startCountdown();
  };

  function pauseButtonClicked(){ // this function only runs when the pause button is clicked (or the resume button)
    if (pause === 0){ // if pause = 0 it means the pause button was clicked.  If pause = 1 it means the resume button was clicked
      pause = 1; // sets the pause variable flag to 1, which will clear the interval (stop the clock) in the startCountdown function
      pauseBtn.text('> Resume'); // changes the text on the pause button to resume
      clearInterval(countdown);
    } else {  // this only executes if the resume button is clicked
      pause = 0; // sets the pause button flag to 0, meaning the user wants to resume the timer
      pauseBtn.text('|| Pause'); // changes the text on the resume button to pause
      startCountdown(); // runs the startCountdown function, which continues the timer
    };
  };

  function shortBreakButtonClicked(){
    working = 0;
    onShortBreak = 1;
    onLongBreak = 0;
    shortBreakSessions = shortBreakSessions + 1;
    pomodoros = pomodoros + 1;
    minutes.text('00'); // sets minutes to 5
    seconds.text('03'); // sets seconds to 00
    console.log("short clicked: " + working +" "+ onShortBreak +" "+ workSessions +" "+ shortBreakSessions +" "+ onLongBreak +" "+ pomodoros);
    checkButtonStatus();
    startCountdown();
  };

  function longBreakButtonClicked(){
    working = 0;
    onShortBreak = 0;
    onLongBreak = 1;
    minutes.text('00'); // sets minutes to 5
    seconds.text('04'); // sets seconds to 00
    console.log("long clicked: " + working +" "+ onShortBreak +" "+ workSessions +" "+ shortBreakSessions +" "+ onLongBreak +" "+ pomodoros);
    checkButtonStatus();
    workSessions=0;
    shortBreakSessions=0;
    pomodoros = 0;
    startCountdown();
  };

  function resetButtonClicked(){
    reset = 1;
    pause = 0;
    working = 0;
    onShortBreak = 0;
    onLongBreak = 0;
    pomodoros = 0;
    workSessions = 0;
    shortBreakSessions = 0;
    longBreakSessions = 0;
    minutes.text('00');
    seconds.text('05');
    setButtonsToWaitingToWork();
    document.getElementsByTagName("TITLE")[0].innerHTML = minutes.text()+":"+seconds.text()+" Pomodoro Timer"  // this puts the timer in the title tab
  };

  function checkButtonStatus(){
    if (reset === 1){reset = 0; setButtonsToWaitingToWork();
    } else {if (working === 0 && onShortBreak === 0 && workSessions === 0 && shortBreakSessions === 0 && onLongBreak === 0 && pomodoros === 0){setButtonsToWaitingToWork();
    } else {if (working === 1 && onShortBreak === 0 && workSessions === 1 && shortBreakSessions === 0 && onLongBreak === 0 && pomodoros === 0){setButtonsToTimerRunning();
    } else {if (working === 0 && onShortBreak === 0 && workSessions === 1 && shortBreakSessions === 0 && onLongBreak === 0 && pomodoros === 0){setButtonsToWaitingForShortBreak();
    } else {if (working === 0 && onShortBreak === 1 && workSessions === 1 && shortBreakSessions === 1 && onLongBreak === 0 && pomodoros === 1){setButtonsToTimerRunning();
    } else {if (working === 0 && onShortBreak === 0 && workSessions === 1 && shortBreakSessions === 1 && onLongBreak === 0 && pomodoros === 1){setButtonsToWaitingToWork();
    } else {if (working === 1 && onShortBreak === 0 && workSessions === 2 && shortBreakSessions === 1 && onLongBreak === 0 && pomodoros === 1){setButtonsToTimerRunning();
    } else {if (working === 0 && onShortBreak === 0 && workSessions === 2 && shortBreakSessions === 1 && onLongBreak === 0 && pomodoros === 1){setButtonsToWaitingForShortBreak();
    } else {if (working === 0 && onShortBreak === 1 && workSessions === 2 && shortBreakSessions === 2 && onLongBreak === 0 && pomodoros === 2){setButtonsToTimerRunning();
    } else {if (working === 0 && onShortBreak === 0 && workSessions === 2 && shortBreakSessions === 2 && onLongBreak === 0 && pomodoros === 2){setButtonsToWaitingToWork();
    } else {if (working === 1 && onShortBreak === 0 && workSessions === 3 && shortBreakSessions === 2 && onLongBreak === 0 && pomodoros === 2){setButtonsToTimerRunning();
    } else {if (working === 0 && onShortBreak === 0 && workSessions === 3 && shortBreakSessions === 2 && onLongBreak === 0 && pomodoros === 2){setButtonsToWaitingForShortBreak();
    } else {if (working === 0 && onShortBreak === 1 && workSessions === 3 && shortBreakSessions === 3 && onLongBreak === 0 && pomodoros === 3){setButtonsToTimerRunning();
    } else {if (working === 0 && onShortBreak === 0 && workSessions === 3 && shortBreakSessions === 3 && onLongBreak === 0 && pomodoros === 3){setButtonsToWaitingToWork();
    } else {if (working === 1 && onShortBreak === 0 && workSessions === 4 && shortBreakSessions === 3 && onLongBreak === 0 && pomodoros === 3){setButtonsToTimerRunning();
    } else {if (working === 0 && onShortBreak === 0 && workSessions === 4 && shortBreakSessions === 3 && onLongBreak === 0 && pomodoros === 3){setButtonsToWaitingForLongBreak();
    } else {if (working === 0 && onShortBreak === 0 && workSessions === 4 && shortBreakSessions === 3 && onLongBreak === 1 && pomodoros === 3){setButtonsToTimerRunning();
    } else {console.log("ERROR: " + working +" "+ onShortBreak +" "+ workSessions +" "+ shortBreakSessions +" "+ onLongBreak +" "+ pomodoros);}
    }}}}}}}}}}}}}}}}

  };



  function setButtonsToWaitingToWork(){
    if (!pauseBtn.hasClass("disabled")){pauseBtn.addClass("disabled")};
    if (!pauseBtn.hasAttr("disabled")){pauseBtn.attr("disabled",'disabled')};
    if (startBtn.hasClass("disabled")){startBtn.removeClass('disabled')};
    if (startBtn.hasAttr("disabled")){startBtn.removeAttr('disabled','disabled')};
    if (!shortBreakBtn.hasClass("disabled")){shortBreakBtn.addClass("disabled")};
    if (!shortBreakBtn.hasAttr("disabled")){shortBreakBtn.attr("disabled",'disabled')};
    if (!longBreakBtn.hasClass("disabled")){longBreakBtn.addClass("disabled")};
    if (!longBreakBtn.hasAttr("disabled")){longBreakBtn.attr("disabled",'disabled')};
  };

  function setButtonsToTimerRunning(){
    if (pauseBtn.hasClass("disabled")){pauseBtn.removeClass("disabled")};
    if (pauseBtn.hasAttr("disabled")){pauseBtn.removeAttr('disabled','disabled')};
    if (!startBtn.hasClass("disabled")){startBtn.addClass('disabled')};
    if (!startBtn.hasAttr("disabled")){startBtn.attr('disabled','disabled')};
    if (!shortBreakBtn.hasClass("disabled")){shortBreakBtn.addClass("disabled")};
    if (!shortBreakBtn.hasAttr("disabled")){shortBreakBtn.attr("disabled",'disabled')};
    if (!longBreakBtn.hasClass("disabled")){longBreakBtn.addClass("disabled")};
    if (!longBreakBtn.hasAttr("disabled")){longBreakBtn.attr("disabled",'disabled')};
  };

  function setButtonsToWaitingForShortBreak(){
    if (!pauseBtn.hasClass("disabled")){pauseBtn.addClass("disabled")};
    if (!pauseBtn.hasAttr("disabled")){pauseBtn.attr('disabled','disabled')};
    if (!startBtn.hasClass("disabled")){startBtn.addClass('disabled')};
    if (!startBtn.hasAttr("disabled")){startBtn.attr('disabled','disabled')};
    if (shortBreakBtn.hasClass("disabled")){shortBreakBtn.removeClass("disabled")};
    if (shortBreakBtn.hasAttr("disabled")){shortBreakBtn.removeAttr("disabled",'disabled')};
    if (!longBreakBtn.hasClass("disabled")){longBreakBtn.addClass("disabled")};
    if (!longBreakBtn.hasAttr("disabled")){longBreakBtn.attr("disabled",'disabled')};
  };

  function setButtonsToWaitingForLongBreak(){
    if (!pauseBtn.hasClass("disabled")){pauseBtn.addClass("disabled")};
    if (!pauseBtn.hasAttr("disabled")){pauseBtn.attr('disabled','disabled')};
    if (!startBtn.hasClass("disabled")){startBtn.addClass('disabled')};
    if (!startBtn.hasAttr("disabled")){startBtn.attr('disabled','disabled')};
    if (!shortBreakBtn.hasClass("disabled")){shortBreakBtn.addClass("disabled")};
    if (!shortBreakBtn.hasAttr("disabled")){shortBreakBtn.attr("disabled",'disabled')};
    if (longBreakBtn.hasClass("disabled")){longBreakBtn.removeClass("disabled")};
    if (longBreakBtn.hasAttr("disabled")){longBreakBtn.removeAttr("disabled",'disabled')};
  };




  function startCountdown(){
    pauseBtn.removeClass('disabled'); // enables the pause button
    pauseBtn.removeAttr('disabled');
    countdown = setInterval(function(){
      var secondsVal = +seconds.text(); // the + sign makes this behave like a number
      var minutesVal = +minutes.text();
      if ((secondsVal === 0 && minutesVal ===0) || reset === 1){ // the timer has run down to 00:00 or the reset button was clicked
        clearInterval(countdown);
        working = 0;
        onShortBreak = 0;
        onLongBreak = 0;
        console.log("coundown ended: " + working +" "+ onShortBreak +" "+ workSessions +" "+ shortBreakSessions +" "+ onLongBreak +" "+ pomodoros);
        checkButtonStatus();
        return;
      };
      if(secondsVal === 0){
        seconds.text(59);
        if(minutesVal <= 10){
            minutes.text("0" + (minutesVal-1));
        } else {
            minutes.text(minutesVal-1);
        }
      } else {
        if(secondsVal <= 10){
          seconds.text("0" + (secondsVal-1));
        } else {
          seconds.text(secondsVal -1);
        }
      };
      // console.log(typeof +secondsVal);
      document.getElementsByTagName("TITLE")[0].innerHTML = minutes.text()+":"+seconds.text()+" Pomodoro Timer"  // this puts the timer in the title tab
    }, 1000);
  };
});
