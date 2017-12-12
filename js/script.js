$(() => {
  //On Click of play button, then game begins
  const $playButton = $('#play-btn');
  const $welcome = $('.welcome');

  $playButton.on('click', function() {
    $welcome.css('display', 'none');
    gameStart();
  });


  // const $mrsDoubtfire = $('.mrsDoubtfire');
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
    // when timer reaches 0 run playAgain() which change display of summary from none etc.
  }

  // MOVEMENTS
  let $fallingPieces = $('.piece');
  let $fallingPiecesOffset = $fallingPieces.offset();
  let $gamePiece = $('.mrsDoubtfire');
  let $gamePieceOffset = $gamePiece.offset();
  let $endZone = $('.falling-div-coll');
  let $endZoneOffset = $endZone.offset();
  let $badPiece = ('.bad');
  let $goodPiece = ('.good');
  let pointAcc = 0;

  const fallingPieces = function () {
    setInterval(() => {
      endZoneReach();
      $fallingPieces.css('marginTop', parseInt($fallingPieces.css('marginTop'))+1);
    }, 30);
  };

  function endZoneReach() {
    if($fallingPiecesOffset.left <= $endZoneOffset.left + $endZone.width() && $fallingPiecesOffset.left + $fallingPieces.width() > $endZoneOffset.left && $fallingPiecesOffset.top < $endZoneOffset.top + $endZone.height() && $fallingPieces.height() + $fallingPiecesOffset.top > $endZoneOffset.top) {
      console.log('hit the bottom');
      $
    }
  }

  // const collisionCheck = function() {
  //
  // };

  let $pointCounter = $('#points-counter');
  // let gameWindow = $('#game-area')
  function collisionTest() {
    $fallingPieces = $('.piece');
    $fallingPiecesOffset = $fallingPieces.offset();
    $gamePiece = $('.mrsDoubtfire');
    $gamePieceOffset = $gamePiece.offset();
    $endZone = $('.falling-div-coll');
    $endZoneOffset = $endZone.offset();
    $badPiece = ('.bad');
    $goodPiece = ('.good');
    $pointCounter = $('#points-counter');

    //COLLISIONS

    // console.log($fallingPiecesOffset.left <= $gamePieceOffset.left + $gamePiece.width(), $fallingPiecesOffset.left + $fallingPieces.width() > $gamePieceOffset.left , $fallingPiecesOffset.top < $gamePieceOffset.top + $gamePiece.height());
    //GAME PIECE COLLISION
    if($fallingPiecesOffset.left <= $gamePieceOffset.left + $gamePiece.width() && $fallingPiecesOffset.left + $fallingPieces.width() > $gamePieceOffset.left && $fallingPiecesOffset.top < $gamePieceOffset.top + $gamePiece.height() && $fallingPieces.height() + $fallingPiecesOffset.top > $gamePieceOffset.top) {
      if($fallingPieces.hasClass('bad')) {
        console.log('bad collision recorded');
        pointAcc = pointAcc + 10;
        console.log(pointAcc);
        $pointCounter.text(pointAcc);
      }else {
        console.log('GREAT GOOD ONE');
      }
    }

    // Falling DIVs at bottom of game area
  }



  $(document).keydown(function(e) {
    const $key = $('.mrsDoubtfire');
    const keyCode = e.keyCode;
    collisionTest();
    if(keyCode === 37) {
      $key.css('margin-left', '-=10px');
    }else if(keyCode === 38) {
      $key.css('margin-top', '-=10px');
    }else if(keyCode === 39) {
      $key.css('margin-left', '+=10px');
    }else if(keyCode === 40) {
      $key.css('margin-top', '+=10px');
    }
  });

  // let points = 0;
  //
  // function goodCollision() {
  //   points = points + 10;
  //   $pointCounter.text(points);
  // }
  // function badCollision() {
  //   points = points - 5;
  //   $pointCounter.text(points);
  // }


  function gameStart() {
    fallingPieces();
    startStopTimer();
  }

});
