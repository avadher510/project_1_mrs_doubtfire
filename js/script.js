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

  // MOVEMENTS
  let $fallingPieces = $('.piece');
  // let $fallingPiecesOffset = $fallingPieces.offset();
  let $gamePiece = $('.mrsDoubtfire');
  let $gamePieceOffset = $gamePiece.offset();
  const $endZone = $('.falling-div-coll');
  // let $endZoneOffset = $endZone.offset();
  // let $badPiece = ('.bad');
  // let $goodPiece = ('.good');
  let pointAcc = 0;
  const $piecesArray = [$('.good-pos-one'), $('.good-pos-two'), $('.good-pos-three'), $('.good-pos-four'), $('.good-pos-five'), $('.good-pos-six'), $('.good-pos-seven'), $('.good-pos-eight'), $('.good-pos-nine'), $('.good-pos-ten'), $('.good-pos-eleven'), $('.good-pos-twelve'), $('.good-pos-thirteen'), $('.good-pos-fourteen'), $('.good-pos-fifteen'), $('.good-pos-sixteen'), $('.good-pos-seventeen'), $('.good-pos-eighteen'), $('.good-pos-nineteen'), $('.bad-pos-one'), $('.bad-pos-two') , $('.bad-pos-three') , $('.bad-pos-four') , $('.bad-pos-five') , $('.bad-pos-six') , $('.bad-pos-seven') , $('.bad-pos-eight') , $('.bad-pos-nine') , $('.bad-pos-ten') , $('.bad-pos-eleven') , $('.bad-pos-twelve')];
  // const randomMathValue = Math.floor(Math.random()*31);
  const $goodOne = $('.good-pos-one');
  const $goodTwo = $('.good-pos-two');
  const $goodThree = $('.good-pos-three');
  const $goodFour = $('.good-pos-four');
  const $goodFive = $('.good-pos-five');
  const $goodSix = $('.good-pos-six');
  const $goodSeven = $('.good-pos-seven');
  const $goodEight = $('.good-pos-eight');
  const $goodNine = $('.good-pos-nine');
  const $goodTen = $('.good-pos-ten');
  const $goodEleven = $('.good-pos-eleven');
  const $goodTwelve = $('.good-pos-twelve');
  const $goodThirteen = $('.good-pos-thirteen');
  const $goodFourteen = $('.good-pos-fourteen');
  const $goodFifteen = $('.good-pos-fifteen');
  const $goodSixteen = $('.good-pos-sixteen');
  const $goodSeventeen = $('.good-pos-seventeen');
  const $goodEighteen = $('.good-pos-eighteen');
  const $goodNineteen = $('.good-pos-nineteen');
  const $badOne = $('.bad-pos-one');
  const $badTwo = $('.bad-pos-two');
  const $badThree = $('.bad-pos-three');
  const $badFour = $('.bad-pos-four');
  const $badFive = $('.bad-pos-five');
  const $badSix = $('.bad-pos-six');
  const $badSeven = $('.bad-pos-seven');
  const $badEight = $('.bad-pos-eight');
  const $badNine = $('.bad-pos-nine');
  const $badTen = $('.bad-pos-ten');
  const $badEleven = $('.bad-pos-11');
  const $badTwelve = $('.bad-pos-12');

  //FALLING PIECES ONE BY ONE
  function fallingPieces() {
    setInterval(() => {
      endZoneReach();
      $goodOne.css('marginTop', parseInt($goodOne.css('marginTop'))+1);
    }, (Math.random()*2) + 10);
    setInterval(() => {
      endZoneReach();
      $goodTwo.css('marginTop', parseInt($goodTwo.css('marginTop'))+1);
    }, (Math.random()*15) * 30);
    setInterval(() => {
      endZoneReach();
      $goodThree.css('marginTop', parseInt($goodThree.css('marginTop'))+1);
    }, (Math.random()*15) * 30);
    setInterval(() => {
      endZoneReach();
      $goodFour.css('marginTop', parseInt($goodFour.css('marginTop'))+1);
    }, (Math.random()*15) * 30);
    setInterval(() => {
      endZoneReach();
      $goodFive.css('marginTop', parseInt($goodFive.css('marginTop'))+1);
    }, (Math.random()*15) * 30);
    setInterval(() => {
      endZoneReach();
      $goodSix.css('marginTop', parseInt($goodSix.css('marginTop'))+1);
    }, (Math.random()*15) * 30);
    setInterval(() => {
      endZoneReach();
      $goodSeven.css('marginTop', parseInt($goodSeven.css('marginTop'))+1);
    }, (Math.random()*15) * 30);
    setInterval(() => {
      endZoneReach();
      $goodEight.css('marginTop', parseInt($goodEight.css('marginTop'))+1);
    }, (Math.random()*15) * 30);
    setInterval(() => {
      endZoneReach();
      $goodNine.css('marginTop', parseInt($goodNine.css('marginTop'))+1);
    }, (Math.random()*15) * 30);
    setInterval(() => {
      endZoneReach();
      $goodTen.css('marginTop', parseInt($goodTen.css('marginTop'))+1);
    }, (Math.random()*15) * 30);
    setInterval(() => {
      endZoneReach();
      $goodEleven.css('marginTop', parseInt($goodEleven.css('marginTop'))+1);
    }, (Math.random()*15) * 30);
    setInterval(() => {
      endZoneReach();
      $goodTwelve.css('marginTop', parseInt($goodTwelve.css('marginTop'))+1);
    }, (Math.random()*15) * 30);
    setInterval(() => {
      endZoneReach();
      $goodThirteen.css('marginTop', parseInt($goodThirteen.css('marginTop'))+1);
    }, (Math.random()*15) * 30);
    setInterval(() => {
      endZoneReach();
      $goodFourteen.css('marginTop', parseInt($goodFourteen.css('marginTop'))+1);
    }, (Math.random()*15) * 30);
    setInterval(() => {
      endZoneReach();
      $goodFifteen.css('marginTop', parseInt($goodFifteen.css('marginTop'))+1);
    }, (Math.random()*15) * 30);
    setInterval(() => {
      endZoneReach();
      $goodSixteen.css('marginTop', parseInt($goodSixteen.css('marginTop'))+1);
    }, (Math.random()*15) * 30);
    setInterval(() => {
      endZoneReach();
      $goodSeventeen.css('marginTop', parseInt($goodSeventeen.css('marginTop'))+1);
    }, (Math.random()*15) * 30);
    setInterval(() => {
      endZoneReach();
      $goodEighteen.css('marginTop', parseInt($goodEighteen.css('marginTop'))+1);
    }, (Math.random()*15) * 30);
    setInterval(() => {
      endZoneReach();
      $goodNineteen.css('marginTop', parseInt($goodNineteen.css('marginTop'))+1);
    }, (Math.random()*15) * 30);
    setInterval(() => {
      endZoneReach();
      $badOne.css('marginTop', parseInt($badOne.css('marginTop'))+1);
    }, (Math.random()*15) * 30);
    setInterval(() => {
      endZoneReach();
      $badTwo.css('marginTop', parseInt($badTwo.css('marginTop'))+1);
    }, (Math.random()*15) * 30);
    setInterval(() => {
      endZoneReach();
      $badThree.css('marginTop', parseInt($badThree.css('marginTop'))+1);
    }, (Math.random()*15) * 30);
    setInterval(() => {
      endZoneReach();
      $badFour.css('marginTop', parseInt($badFour.css('marginTop'))+1);
    }, (Math.random()*15) * 30);
    setInterval(() => {
      endZoneReach();
      $badFive.css('marginTop', parseInt($badFive.css('marginTop'))+1);
    }, (Math.random()*15) * 30);
    setInterval(() => {
      endZoneReach();
      $badSix.css('marginTop', parseInt($badSix.css('marginTop'))+1);
    }, (Math.random()*15) * 30);
    setInterval(() => {
      endZoneReach();
      $badSeven.css('marginTop', parseInt($badSeven.css('marginTop'))+1);
    }, (Math.random()*15) * 30);
    setInterval(() => {
      endZoneReach();
      $badEight.css('marginTop', parseInt($badEight.css('marginTop'))+1);
    }, (Math.random()*15) * 30);
    setInterval(() => {
      endZoneReach();
      $badNine.css('marginTop', parseInt($badNine.css('marginTop'))+1);
    }, (Math.random()*15) * 30);
    setInterval(() => {
      endZoneReach();
      $badTen.css('marginTop', parseInt($badTen.css('marginTop'))+1);
    }, (Math.random()*15) * 30);
    setInterval(() => {
      endZoneReach();
      $badEleven.css('marginTop', parseInt($badEleven.css('marginTop'))+1);
    }, (Math.random()*15) * 30);
    setInterval(() => {
      endZoneReach();
      $badTwelve.css('marginTop', parseInt($badTwelve.css('marginTop'))+1);
    }, (Math.random()*15) * 30);
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

    //CREATING DIV RANDOMLY
    // function pieceCreated() {
    //
    // }

    //COLLISIONS
    //GAME PIECE COLLISION
    //NOT APPLYING TO ALL DIVS!!
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
  }


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
    fallingPieces();
    startStopTimer();
  }

});
