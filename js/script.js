$(() => {

  // Variables
  const $playButton = $('#play-btn');
  const $welcome = $('.welcome');
  const $livesLeft = $('#lives');
  const $countdownClock = $('#game-clock');
  const $fallingPieces = $('.piece');
  const $goodPieces = $('.good');
  const $badPieces = $('.bad');
  const $endZone = $('.falling-div-coll');
  const $piecesArray = [$('.good-pos-one'), $('.good-pos-two'), $('.good-pos-three'), $('.good-pos-four'), $('.good-pos-five'), $('.good-pos-six'), $('.good-pos-seven'), $('.good-pos-eight'), $('.good-pos-nine'), $('.good-pos-ten'), $('.good-pos-eleven'), $('.good-pos-twelve'), $('.good-pos-thirteen'), $('.good-pos-fourteen'), $('.good-pos-fifteen'), $('.good-pos-sixteen'), $('.good-pos-seventeen'), $('.good-pos-eighteen'), $('.good-pos-nineteen'), $('.bad-pos-one'), $('.bad-pos-two') , $('.bad-pos-three') , $('.bad-pos-four') , $('.bad-pos-five') , $('.bad-pos-six') , $('.bad-pos-seven') , $('.bad-pos-eight') , $('.bad-pos-nine') , $('.bad-pos-ten') , $('.bad-pos-eleven') , $('.bad-pos-twelve')];
  const audioOnLoad = document.getElementById('welcome-hello');
  // const gameTrack = document.getElementById('maintrack');
  // const $audio
  const $summaryLose = $('#lose');
  const $summaryWin = $('#win');
  const $scoreSumBox = $('.finalscore');
  const $livesSumBox = $('.finallives');
  const goodImagesArray = ['project_1/css/images/apple30px.jpg', 'project_1/css/images/grapes30px.jpg', 'project_1/css/images/banana30px.jpg', 'project_1/css/images/orange30px.jpg'];
  const badImagesArray = ['project_1/css/images/grinch30px.jpg', 'project_1/css/images/car30px.jpg', 'project_1/css/images/mincepie30px.jpg', 'project_1/css/images/rock30px.jpg'];
  let startingLives = 3;
  let timeRemaining = 60;
  let timerIsRunning = false;
  let timerId = null;
  let $gamePiece = $('.mrsDoubtfire');
  let $gamePieceOffset = $gamePiece.offset();
  let pointAcc = 0;
  let $pointCounter = $('#points-counter');

  // Sounds
  audioOnLoad.src = 'sounds/mrd-hello.wav';

  //On Click of play button, then game begins
  $playButton.on('click', function() {
    $welcome.css('display', 'none');
    gameStart();
  });

  //Load Game Piece Images Randomly
  function gameImagesGood() {
    for (let i=0; i<$goodPieces.length; i++) {
      const ranMathGood = Math.floor(Math.random() * goodImagesArray.length);
      console.log(ranMathGood);
      $($goodPieces[i]).css('background-image', `url('../${goodImagesArray[ranMathGood]}')`);
    }
  }

  function gameImagesBad() {
    for (let i=0; i<$badPieces.length; i++) {
      const ranMathBad = Math.floor(Math.random() * badImagesArray.length);
      console.log(ranMathBad);
      $($badPieces[i]).css('background-image', `url('../${badImagesArray[ranMathBad]}')`);
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
      setInterval(() => {
        endZoneReach();
        $piece.css('marginTop', parseInt($piece.css('marginTop'))+ (Math.random()*(Math.random()*10)));
      }, Math.random()*100);
    }
  }

  // COLLISION MAIN FUNC
  function collisionTest() {
    $gamePiece = $('.mrsDoubtfire');
    $gamePieceOffset = $gamePiece.offset();
    $pointCounter = $('#points-counter');

    const fallingPiecesOffsets = [];
    let piecesArraySingle = null;

    for (let i=0; i<$piecesArray.length; i++) {
      fallingPiecesOffsets.push($piecesArray[i].offset());
    }

    //GAME PIECE COLLISION
    for(let i=0; i<$piecesArray.length; i++) {
      if(fallingPiecesOffsets[i].left <= $gamePieceOffset.left + $gamePiece.width() && fallingPiecesOffsets[i].left + $fallingPieces.width() > $gamePieceOffset.left && fallingPiecesOffsets[i].top < $gamePieceOffset.top + $gamePiece.height() && $fallingPieces.height() + fallingPiecesOffsets[i].top > $gamePieceOffset.top) {
        // const alreadyCollected = $piecesArray[i].hasClass('collected');
        // if (alreadyCollected) return false;

        piecesArraySingle= $piecesArray[i].hasClass('good');
        if(piecesArraySingle) {
          // console.log('hit good one');
          $($piecesArray[i]).removeClass('good');
          $($piecesArray[i]).css('margin-top', '0');
          positiveCollision();
        } else {
          // console.log('hit bad one');
          negativeCollision();

        }
      }
    }
  }

  // FUNCTION FOR POSITIVE COLLISION
  function positiveCollision() {
    pointAcc = pointAcc + 50;
    $pointCounter.text(pointAcc);

    if (pointAcc === 1000) {
      endOfGameWin();
    }
  }

  //FUNCTIN FOR NEGATIVE COLLISION
  function negativeCollision() {
    pointAcc = pointAcc - 30;
    $pointCounter.text(pointAcc);
    startingLives = startingLives - 1;
    $livesLeft.text(startingLives);

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
          $ezPiece.hide();
        } else {
          $ezPiece.hide();
        }
      }
    }

  }

  //Key presses
  $(document).keydown(function(e) {
    const $key = $('.mrsDoubtfire');
    const keyCode = e.keyCode;
    collisionTest();

    if(keyCode === 37) {
      $key.css('margin-left', '-=8px');
    }else if(keyCode === 38) {
      $key.css('margin-top', '-=8px');
    }else if(keyCode === 39) {
      $key.css('margin-left', '+=8px');
    }else if(keyCode === 40) {
      $key.css('margin-top', '+=8px');
    }
  });

  //END OF GAME
  function endOfGameLose() {
    $summaryLose.css('display', 'block');
    clearInterval(timerId);
    $gamePiece.css('display', 'none');
    $('.piece').remove();
    $scoreSumBox.text(pointAcc);
    $livesSumBox.text(startingLives);
  }

  function endOfGameWin() {
    $summaryWin.css('display', 'block');
    clearInterval(timerId);
    $gamePiece.css('display', 'none');
    $('.piece').remove();
    $scoreSumBox.text(pointAcc);
    $livesSumBox.text(startingLives);
  }

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
