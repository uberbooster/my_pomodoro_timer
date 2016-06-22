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


  startBtn.on('click', startButtonClicked);
  pauseBtn.on('click', pauseTimer);
  shortBreakBtn.on('click', shortBreakButtonClicked);


  function startButtonClicked(){
    working = 1;
    startCountdown();
  };

  function shortBreakButtonClicked(){
    onShortBreak = 1; // flags that the short break button was clicked
    minutes.text('05'); // sets minutes to 5
    seconds.text('00'); // sets seconds to 00
    shortBreakBtn.addClass("disabled");
    shortBreakBtn.attr("disabled",'disabled');
    startCountdown(); // starts the countdown
  };

  function pauseTimer(){ // this function only runs when the pause button is clicked (or the resume button)
    if (pause === 0){ // if pause = 0 it means the pause button was clicked.  If pause = 1 it means the resume button was clicked
      pause = 1; // sets the pause variable flag to 1, which will clear the interval (stop the clock) in the startCountdown function
      pauseBtn.text('Resume'); // changes the text on the pause button to resume
    } else {  // this only executes if the resume button is clicked
      pause = 0; // sets the pause button flag to 0, meaning the user wants to resume the timer
      pauseBtn.text('Pause'); // changes the text on the resume button to pause
      startCountdown(); // runs the startCountdown function, which continues the timer
    };
  };

  function startCountdown(){
    if (working === 1){ // if the start work button was clicked
      startBtn.addClass("disabled");
      startBtn.attr("disabled",'disabled');
      pauseBtn.removeClass('disabled');
      pauseBtn.removeAttr('disabled');
    };

    var countdown = setInterval(function(){
      var secondsVal = +seconds.text(); // the + sign makes this behave like a number
      var minutesVal = +minutes.text();
      if(pause === 1){ // checks to see if the pause button was clicked
        clearInterval(countdown);
      };
      if (secondsVal === 0 && minutesVal ===0){ // the tinmer has run down to 00:00
        shortBreakBtn.removeClass('disabled');
        shortBreakBtn.removeAttr('disabled');
        clearInterval(countdown);
        working = 0;
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
      document.getElementsByTagName("TITLE")[0].innerHTML = minutes.text()+":"+seconds.text()+" PTimer"
    }, 1000);
  };
});
