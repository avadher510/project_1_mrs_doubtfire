$(() => {

  //On Click of play button, then game begins
  const $playButton = $('#play-btn');
  const $welcome = $('.welcome');
  const $livesLeft = $('#lives');
  // const $summary = $('.summary');
  let startingLives = 3;

  $playButton.on('click', function() {
    $welcome.css('display', 'none');
    gameStart();
  });

  //Lives functionality
  // function lifeMonitoring() {
  //   if(startingLives === 0) {
  //     $summary.css('display', 'inline-block');
  //   }
  // }
  function livesAtStart() {
    $livesLeft.text(startingLives);
  }



  // const $mrsDoubtfire = $('.mrsDoubtfire');
  const $countdownClock = $('#game-clock');

  //Countdown Timer
  let timeRemaining = 60;
  let timerIsRunning = false;
  let timerId = null;

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
          //run this part
        }
      }, 1000);
      timerIsRunning = true;
    }
    // when timer reaches 0 run playAgain() which change display of summary from none etc.
  }

  // Fallings Pieces
  let $fallingPieces = $('.piece');
  console.log($fallingPieces);
  let $gamePiece = $('.mrsDoubtfire');
  let $gamePieceOffset = $gamePiece.offset();
  const $endZone = $('.falling-div-coll');
  let pointAcc = 0;
  const $piecesArray = [$('.good-pos-one'), $('.good-pos-two'), $('.good-pos-three'), $('.good-pos-four'), $('.good-pos-five'), $('.good-pos-six'), $('.good-pos-seven'), $('.good-pos-eight'), $('.good-pos-nine'), $('.good-pos-ten'), $('.good-pos-eleven'), $('.good-pos-twelve'), $('.good-pos-thirteen'), $('.good-pos-fourteen'), $('.good-pos-fifteen'), $('.good-pos-sixteen'), $('.good-pos-seventeen'), $('.good-pos-eighteen'), $('.good-pos-nineteen'), $('.bad-pos-one'), $('.bad-pos-two') , $('.bad-pos-three') , $('.bad-pos-four') , $('.bad-pos-five') , $('.bad-pos-six') , $('.bad-pos-seven') , $('.bad-pos-eight') , $('.bad-pos-nine') , $('.bad-pos-ten') , $('.bad-pos-eleven') , $('.bad-pos-twelve')];



  //FALLING PIECES ONE BY ONE
  function fallingPiecesGo() {
    for(let i = 0; i < $fallingPieces.length; i++){
      const $piece = $($fallingPieces[i]);
      setInterval(() => {
        endZoneReach();
        $piece.css('marginTop', parseInt($piece.css('marginTop'))+ (Math.random()+1));
      }, Math.random());
    }
  }




  // const collisionCheck = function() {
  //
  // };

  let $pointCounter = $('#points-counter');
  // let gameWindow = $('#game-area')
  function collisionTest() {
    $fallingPieces = $('.piece');
    // $fallingPiecesOffset = $fallingPieces.offset();
    $gamePiece = $('.mrsDoubtfire');
    $gamePieceOffset = $gamePiece.offset();
    $pointCounter = $('#points-counter');

    const fallingPiecesOffsets = [];
    let piecesArraySingle = null;

    for (let i=0; i<$piecesArray.length; i++) {
      fallingPiecesOffsets.push($piecesArray[i].offset());
    }

    //COLLISIONS
    //GAME PIECE COLLISION
    for(let i=0; i<$piecesArray.length; i++) {
      if(fallingPiecesOffsets[i].left <= $gamePieceOffset.left + $gamePiece.width() && fallingPiecesOffsets[i].left + $fallingPieces.width() > $gamePieceOffset.left && fallingPiecesOffsets[i].top < $gamePieceOffset.top + $gamePiece.height() && $fallingPieces.height() + fallingPiecesOffsets[i].top > $gamePieceOffset.top) {
        piecesArraySingle= $piecesArray[i].hasClass('good');
        if(piecesArraySingle) {
          console.log('hit good one');
          $piecesArray[i].hide();
        } else {
          console.log('hit bad one');
        }
        if(piecesArraySingle === true) {
          positiveCollision();
        }else{
          negativeCollision();
        }
      }
    }
  }

  function positiveCollision() {
    pointAcc = pointAcc + 10;
    $pointCounter.text(pointAcc);
  }

  function negativeCollision() {
    pointAcc = pointAcc - 100;
    $pointCounter.text(pointAcc);
    startingLives = startingLives - 1;
    $livesLeft.text(startingLives);
  }

  //ENDZONE working for each div specifically
  function endZoneReach() {
    let piecesArrayEndZone = null;
    for(let i = 0; i < $piecesArray.length; i++) {
      if($piecesArray[i].offset().left <= $endZone.offset().left + $endZone.width() && $piecesArray[i].offset().left + $piecesArray[i].width() > $endZone.offset().left && $piecesArray[i].offset().top < $endZone.offset().top + $endZone.height() && $piecesArray[i].height() + $piecesArray[i].offset().top > $endZone.offset().top) {
        piecesArrayEndZone= $piecesArray[i].hasClass('good');
        if(piecesArrayEndZone === true) {
          console.log('You missed a good one');
          negativeCollision();
          $piecesArray[i].hide();
        } else {
          console.log('bad one gone');
          $piecesArray[i].hide();
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

  function gameStart() {
    fallingPiecesGo();
    startStopTimer();
    livesAtStart();
  }

});
