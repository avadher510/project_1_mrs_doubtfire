$(() => {
  //On Click of play button, then game begins
  const $playButton = $('#play-btn');
  const $welcome = $('.welcome');

  $playButton.on('click', function() {
    $welcome.css('display', 'none');
    gameStart();
  });


  // const $mrsDoubtfire = $('.mrsDoubtfire');
  const $goodFallingPiece = $('.good-pos-one');
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

  const fallingPieces = function () {
    setInterval(() => {
      $goodFallingPiece.css('marginTop', parseInt($goodFallingPiece.css('marginTop'))+1);
      // collisionMath();
    }, 30);
  };

  // MOVEMENTS
  // let gameWindow = $('#game-area')
  let $fallingPieces = $('.piece');
  let $fallingPiecesOffset = $fallingPieces.offset();
  let $gamePiece = $('.mrsDoubtfire');
  let $gamePieceOffset = $gamePiece.offset();
  let $badPiece = ('.bad');
  let $goodPiece = ('.good');

  function collisionTest() {
    $fallingPieces = $('.piece');
    $fallingPiecesOffset = $fallingPieces.offset();
    $gamePiece = $('.mrsDoubtfire');
    $gamePieceOffset = $gamePiece.offset();
    $badPiece = ('.bad');
    $goodPiece = ('.good');

    //COLLISIONS

    // console.log($fallingPiecesOffset.left <= $gamePieceOffset.left + $gamePiece.width(), $fallingPiecesOffset.left + $fallingPieces.width() > $gamePieceOffset.left , $fallingPiecesOffset.top < $gamePieceOffset.top + $gamePiece.height());

    if($fallingPiecesOffset.left <= $gamePieceOffset.left + $gamePiece.width() && $fallingPiecesOffset.left + $fallingPieces.width() > $gamePieceOffset.left && $fallingPiecesOffset.top < $gamePieceOffset.top + $gamePiece.height() && $fallingPieces.height() + $fallingPiecesOffset.top > $gamePieceOffset.top && $badPiece) {
      console.log('bad collision recorded');
      // badCollision();
    }else if($fallingPiecesOffset.left <= $gamePieceOffset.left + $gamePiece.width() && $fallingPiecesOffset.left + $fallingPieces.width() > $gamePieceOffset.left && $fallingPiecesOffset.top < $gamePieceOffset.top + $gamePiece.height() && $fallingPieces.height() + $fallingPiecesOffset.top > $gamePieceOffset.top && $goodPiece) {
      console.log('good collision recorded');
    }
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
  // const $pointCounter = $('#points-counter');
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
