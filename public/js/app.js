var func;
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
    seconds.text('04')
    checkButtonStatus();
    startCountdown();
  };

  function pauseButtonClicked(){ // this function only runs when the pause button is clicked (or the resume button)
    if (pause === 0){ // if pause = 0 it means the pause button was clicked.  If pause = 1 it means the resume button was clicked
      pause = 1; // sets the pause variable flag to 1, which will clear the interval (stop the clock) in the startCountdown function
      pauseBtn.text('Resume'); // changes the text on the pause button to resume
    } else {  // this only executes if the resume button is clicked
      pause = 0; // sets the pause button flag to 0, meaning the user wants to resume the timer
      pauseBtn.text('Pause'); // changes the text on the resume button to pause
      startCountdown(); // runs the startCountdown function, which continues the timer
    };
  };

  function shortBreakButtonClicked(){
    onShortBreak = 1; // flags that the short break button was clicked
    shortBreakSessions = shortBreakSessions + 1;
    minutes.text('00'); // sets minutes to 5
    seconds.text('05'); // sets seconds to 00
    startCountdown(); // starts the countdown
  };

  function longBreakButtonClicked(){
    onLongBreak = 1;
    longBreakSessions = longBreakSessions + 1;
    minutes.text('00'); // sets minutes to 5
    seconds.text('06'); // sets seconds to 00
    longBreakBtn.addClass("disabled");
    longBreakBtn.attr("disabled",'disabled');
    startCountdown(); // starts the countdown
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
    seconds.text('07');
    setButtonsToWaitingToWork();
    document.getElementsByTagName("TITLE")[0].innerHTML = "25:00 Pomodoro Timer"  // this puts the timer in the title tab
  };





  function checkButtonStatus(){
    if (reset === 1){
        reset = 0;
        setButtonsToWaitingToWork();
    } else {
      if (working === 0 && onShortBreak === 0 && workingSessions === 0 && shortBreakSessions === 0 && onLongBreak === 0 && pomodoros === 0){ //this means the person is currently working
        // set buttons for working status
        //
      } else {
        if (working === 1 && onShortBreak === 1 && pomodoros < 3){
          // set buttons for a short break
        } else {
          if(working === 1 && onShortBreak === 0 && pomodoros ===3){
            // set buttons for working status, but prepare longBreakBtn to be enabled
          } else {

          }

        }
      }
    }
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
  func = setButtonsToWaitingForLongBreak;

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
    clearInerval(coundown);
    var countdown = setInterval(function(){
      var secondsVal = +seconds.text(); // the + sign makes this behave like a number
      var minutesVal = +minutes.text();
      if(pause === 1){ // checks to see if the pause button was clicked
        clearInterval(countdown);
      };
      if ((secondsVal === 0 && minutesVal ===0) || reset === 1){ // the timer has run down to 00:00 or the reset button was clicked
        clearInterval(countdown);
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
