$(() => {

  // DOM Variables
  const $playButton = $('#play-btn');
  const $welcome = $('.welcome');
  const $livesLeft = $('#lives');
  const $countdownClock = $('#game-clock');
  const $fallingPieces = $('.piece');
  const $goodPieces = $('.good');
  const $badPieces = $('.bad');
  const $endZone = $('.falling-div-coll');
  const $summary = $('.summary');
  const $playBtn = $('.play-btn');
  const $summaryLose = $('#lose');
  const $summaryWin = $('#win');
  const $scoreSumBox = $('.finalscore');
  const $livesSumBox = $('.finallives');
  const goodImagesArray = ['./css/images/apple30px.jpg', './css/images/grapes30px.jpg', './css/images/banana30px.jpg', './css/images/orange30px.jpg'];
  const badImagesArray = ['./css/images/grinch30px.jpg', './css/images/car30px.jpg', './css/images/mincepie30px.jpg', './css/images/rock30px.jpg'];
  const goodSound = document.querySelector('audio#goodup');
  const badSound = document.querySelector('audio#badsound');
  let $gamePiece = $('.mrsDoubtfire');
  let $gamePieceOffset = $gamePiece.offset();
  let $pointCounter = $('#points-counter');
  let startingLives = 3;
  let timeRemaining = 60;
  let timerIsRunning = false;
  let timerId = null;
  let pointAcc = 0;
  let fallingTimerIdArr = [];

  //On Click of play button, then game begins
  $playButton.on('click', function() {
    $welcome.css('display', 'none');
    //Sound in here as playGame is triggered if player plays again so track not needed to restart as it is looped
    document.querySelector('audio#maintrack').play();
    gameStart();
    keyPressActivate();
  });

  //Load Game Piece Images Randomly
  function gameImagesGood() {
    for (let i=0; i<$goodPieces.length; i++) {
      const ranMathGood = Math.floor(Math.random() * goodImagesArray.length);
      $($goodPieces[i]).css('background-image', `url('${goodImagesArray[ranMathGood]}')`);
    }
  }

  function gameImagesBad() {
    for (let i=0; i<$badPieces.length; i++) {
      const ranMathBad = Math.floor(Math.random() * badImagesArray.length);
      $($badPieces[i]).css('background-image', `url('${badImagesArray[ranMathBad]}')`);
    }
  }

  // Game Pieces on load
  function loadPieces() {
    $fallingPieces.css('display', 'flex');
    $gamePiece.css('display', 'inline-block');
  }

  //Lives functionality
  function livesAtStart() {
    $livesLeft.text(startingLives);
  }

  //Points Zero push
  function pointsAtStart() {
    $pointCounter.text(pointAcc);
  }

  //Countdown Timer
  function startStopTimer() {
    if(timerIsRunning) {
      clearInterval(timerId);
      timerIsRunning = false;
    } else {
      timerId = setInterval(() => {
        timeRemaining--;
        $countdownClock.text(timeRemaining);

        if(timeRemaining === 0) {
          clearInterval(timerId);
          endOfGameLose();
        }
      }, 1000);
      timerIsRunning = true;
    }
  }

  //FALLING PIECES ONE BY ONE
  function fallingPiecesGo() {
    for(let i = 0; i < $fallingPieces.length; i++){
      const $piece = $($fallingPieces[i]);
      const fallingTimerId = setInterval(() => {
        scoreChecker();
        endZoneReach();
        $piece.css('marginTop', parseInt($piece.css('marginTop'))+ (Math.random()*(Math.random()*10)));
      }, Math.random()+100);
      fallingTimerIdArr.push(fallingTimerId);
    }
  }

  function fallingPieceClear() {
    for (let i=0; i < fallingTimerIdArr.length; i++) {
      clearInterval(fallingTimerIdArr[i]);
    }
  }

  // COLLISION MAIN FUNC
  function collisionTest() {
    $gamePiece = $('.mrsDoubtfire');
    $gamePieceOffset = $gamePiece.offset();
    $pointCounter = $('#points-counter');

    const fallingPiecesOffsets = [];
    let piecesArraySingle = null;

    for (let i=0; i<$fallingPieces.length; i++) {
      const fpPiece = $($fallingPieces[i]);
      fallingPiecesOffsets.push(fpPiece.offset());
    }

    //GAME PIECE COLLISION
    for(let i=0; i<$fallingPieces.length; i++) {
      const fpPiece2 = $($fallingPieces[i]);
      if(fallingPiecesOffsets[i].left <= $gamePieceOffset.left + $gamePiece.width() && fallingPiecesOffsets[i].left + $fallingPieces.width() > $gamePieceOffset.left && fallingPiecesOffsets[i].top < $gamePieceOffset.top + $gamePiece.height() && $fallingPieces.height() + fallingPiecesOffsets[i].top > $gamePieceOffset.top) {

        piecesArraySingle= fpPiece2.hasClass('good');
        if(piecesArraySingle) {
          $(fpPiece2.animate({'margin-top': '0'}, 100, 'swing'));
          positiveCollision();
        } else {
          $(fpPiece2.animate({'margin-top': '0'}, 100, 'swing'));
          negativeCollision();
        }
      }
    }
  }

  // FUNCTION FOR POSITIVE COLLISION
  function positiveCollision() {
    pointAcc = pointAcc + 50;
    $pointCounter.text(pointAcc);
    goodSound.play();
  }

  //FUNCTION CHECKING FOR SCORE
  function scoreChecker() {
    if (pointAcc === 2000) {
      endOfGameWin();
    }
  }

  //FUNCTION FOR NEGATIVE COLLISION
  function negativeCollision() {
    pointAcc = pointAcc - 30;
    $pointCounter.text(pointAcc);
    startingLives = startingLives - 1;
    $livesLeft.text(startingLives);
    badSound.play();

    if (startingLives === 0) {
      startingLives = 0;
      endOfGameLose();
    }
  }

  //ENDZONE working for each div specifically
  function endZoneReach() {
    let piecesArrayEndZone = null;

    for(let i = 0; i < $fallingPieces.length; i++) {
      const $ezPiece = $($fallingPieces[i]);

      if($ezPiece.offset().left <= $endZone.offset().left + $endZone.width() && $ezPiece.offset().left + $ezPiece.width() > $endZone.offset().left && $ezPiece.offset().top < $endZone.offset().top + $endZone.height() && $ezPiece.height() + $ezPiece.offset().top > $endZone.offset().top) {
        piecesArrayEndZone= $ezPiece.hasClass('good');

        if(piecesArrayEndZone === true) {
          negativeCollision();
          $ezPiece.css('margin-top', '0');
        } else {
          $ezPiece.css('margin-top', '0');
        }
      }
    }
  }

  //Key presses
  function keyPressActivate() {
    $(document).keydown(function(e) {
      const $key = $('.mrsDoubtfire');
      const keyCode = e.keyCode;
      collisionTest();

      if(keyCode === 37) {
        $key.css('margin-left', '-=18px');
      }else if(keyCode === 38) {
        $key.css('margin-top', '-=18px');
      }else if(keyCode === 39) {
        $key.css('margin-left', '+=18px');
      }else if(keyCode === 40) {
        $key.css('margin-top', '+=18px');
      }
    });
  }

  //END OF GAME
  function endOfGameLose() {
    $summaryLose.css('display', 'block');
    clearInterval(timerId);
    $gamePiece.css('display', 'none');
    fallingPieceClear();
    fallingTimerIdArr = [];
    $fallingPieces.css('margin-top', '0');
    $scoreSumBox.text(pointAcc);
    $livesSumBox.text(startingLives);
  }

  function endOfGameWin() {
    $summaryWin.css('display', 'block');
    clearInterval(timerId);
    $gamePiece.css('display', 'none');
    fallingPieceClear();
    fallingTimerIdArr = [];
    $fallingPieces.css('margin-top', '0');
    $scoreSumBox.text(pointAcc);
    $livesSumBox.text(startingLives);
  }

  // PLAY AGAIN
  function playAgain() {
    startingLives = 3;
    timeRemaining = 60;
    $countdownClock.text(timeRemaining);
    timerId = null;
    pointAcc = 0;
    timerIsRunning = false;
    $summary.css('display', 'none');
    $gamePiece.css({'margin-top': '410px', 'margin-left': '400px'});
    gameStart();
  }

  $playBtn.on('click', function(){
    playAgain();
  });

  //CALLS TO START GAME
  function gameStart() {
    fallingPiecesGo();
    startStopTimer();
    livesAtStart();
    pointsAtStart();
    loadPieces();
    gameImagesGood();
    gameImagesBad();
  }

});
