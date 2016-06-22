$(document).ready(function(){
  var pauseBtn = $('#pause');
  var startBtn = $('#start-work');
  var resetBtn = $('#reset');
  var shortBreakBtn = $('#short-break');
  var longBreakBtn = $('#long-break');
  var minutes = $('#minutes');
  var seconds = $('#seconds');
  var pause = 0;

  startBtn.on('click', startCountdown);
  pauseBtn.on('click', pauseTimer);

  function pauseTimer(){
    if (pause === 0){
      pause = 1;
      pauseBtn.text('Resume');
    } else {
      pause = 0;
      pauseBtn.text('Pause');
      startCountdown();
    };
  };




  function startCountdown(){
    startBtn.addClass("disabled");
    startBtn.attr("disabled",'disabled');
    pauseBtn.removeClass('disabled');
    pauseBtn.removeAttr('disabled');

    var countdown = setInterval(function(){
      var secondsVal = +seconds.text(); // the + sign makes this behave like a number
      var minutesVal = +minutes.text();
      if(pause === 1){
        clearInterval(countdown);
      };
      if (secondsVal === 0 && minutesVal ===0){
        shortBreakBtn.removeClass('disabled');
        shortBreakBtn.removeAttr('disabled');
        clearInterval(countdown);
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
