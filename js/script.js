$(() => {

  const $mrsDoubtfire = $('.mrsDoubtfire');
  const $goodFallingPiece = $('.good-pos-seven');
  const $countdownClock = $('#game-clock');

  //Countdown Timer
  let timeRemaining = 60;
  let timerIsRunning = false;
  let timerId = null;

  function startStopTimer() {
    // stop the timer if it is running
    if(timerIsRunning) {
      clearInterval(timerId);
      timerIsRunning = false;
    } else {
      // start the timer if it is NOT running
      timerId = setInterval(() => {
        timeRemaining--;
        $countdownClock.text(timeRemaining);

        if(timeRemaining === 0) {
          clearInterval(timerId);
          //run this part
        }
      }, 1000);
      timerIsRunning = true;
    }
    // add "ringing" class to timer when time reaches 0
  }

  // //mousefollow
  // $(document).on('mousemove', function(e){
  //   $mrsDoubtfire.css({
  //     left: e.pageX,
  //     top: e.pageY
  //   });
  // $mrsDoubtfire.position().left;
  // $mrsDoubtfire.position().top;

  // const movementData = function () {
  //   setInterval(() => {
  //     $mrsDoubtfire.css('marginLeft', parseInt($mrsDoubtfire.css('marginLeft'))+1);
  //     console.log($mrsDoubtfire);
  //   }, 10);
  // };

  const fallingPieces = function () {
    setInterval(() => {
      $goodFallingPiece.css('marginTop', parseInt($goodFallingPiece.css('marginTop'))+1);
      collisionMath();
    }, 30);
  };


  // //ARROW KEY MOVEMENTS
  // let gameWindow = $('#game-area')
  let mrsDfPiece = $('.mrsDoubtfire')
  //   w = gameWindow.width() - mrsDfPiece.width(),
  //   d = {},
  //   x = 3;
  //
  // function newv(v,a,b) {
  //   let n = parseInt(v, 10) - (d[a] ? x : 0) + (d[b] ? x : 0);
  //   return n < 0 ? 0 : n > w ? w : n;
  // }
  //
  // $(window).keydown(function(e) {
  //   d[e.which] = true;
  // });
  // $(window).keydown(function(e) {
  //   d[e.which] = false;
  // });
  //
  // setInterval(function() {
  //   mrsDfPiece.css({
  //     left: function(i,v) {
  //       return newv(v,37,39);
  //     },
  //     top: function(i,v)  {
  //       return newv(v,38,40);
  //     }
  //   });
  // }, 20);

  let left = 0;
  let top = 0;

  function move(e) {
    if (e.keyCode === 40) {
      top += 2;
      mrsDfPiece.style.top = (parseInt(top) + top) + 'px';
    }
  }
  document.onkeydown = move;






  //COLLISION MATH - NOT WORKING
  const collisionMath = function() {
    if ($mrsDoubtfire.left < $goodFallingPiece.position().left + $goodFallingPiece.position().width && $mrsDoubtfire.left + $mrsDoubtfire.width > $goodFallingPiece.position().left && $mrsDoubtfire.top < $goodFallingPiece.position().top + $goodFallingPiece.position().height && $mrsDoubtfire.height + $mrsDoubtfire.top > $goodFallingPiece.position().top) {
      console.log('collision detected');
    }
  };


  function gameStart() {
    // movementData();
    fallingPieces();
    startStopTimer();
  }

  $goodFallingPiece.on('click', collisionMath());

  gameStart();
  // // let $fallingPiecePosition = ;
  //
  // $(document).mousemove(function(e){
  //   $mrsDoubtfire.css({left: e.pageX, top: e.pageY});
  // });
  //
  // const mrsDfCollMath = {x: 5, y: 5, width: 30, height: 60};
  // const fallPieceCollMath = {x: 5, y: 5, width: 30, height: 30};
  //
  // const movementData = function () {
  //   setInterval(() => {
  //     $mrsDoubtfire.css('marginLeft', parseInt($mrsDoubtfire.css('marginLeft'))+1);
  //     console.log($mrsDoubtfire);
  //   }, 10);
  // };
  //

  //








  // movementData();

  // collisionMath();




  // // collisionMath();



});
