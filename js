document.addEventListener("DOMContentLoaded", function() {
  var cities = [
    { name: "LONDON", hint: "A city famous for its historic landmarks and royal palaces" },
    { name: "PARIS", hint: "Known as the City of Love and famous for the Eiffel Tower" },
    { name: "ROME", hint: "An ancient city known for its rich history and architectural wonders" },
    { name: "BERLIN", hint: "Renowned for its vibrant art and music scene" },
    { name: "MADRID", hint: "A lively city known for its vibrant street life and historic architecture" },
    { name: "TOKYO", hint: "A bustling metropolis known for its technology and tradition" },
    { name: "BEIJING", hint: "A city with a rich cultural heritage and modern development" },
    { name: "MOSCOW", hint: "Famous for its stunning architecture and cultural landmarks" },
    { name: "CAIRO", hint: "A historic city, known for its ancient monuments and pyramids" },
    { name: "NAIROBI", hint: "A city known for its wildlife, national parks, and safaris" },
    { name: "BANGKOK", hint: "A vibrant city, famous for its street markets and ornate temples" },
    { name: "SYDNEY", hint: "Known for its iconic opera house and harbor" },
    { name: "ATHENS", hint: "Known for its ancient ruins and historical significance" },
    { name: "AMSTERDAM", hint: "Famous for its picturesque canals and museums" },
    { name: "STOCKHOLM", hint: "A city known for its beautiful architecture and vibrant culture" },
    { name: "BRUSSELS", hint: "Known for its stunning architecture and chocolate" },
    { name: "DUBLIN", hint: "A city with a rich history and vibrant pub culture" },
    { name: "VIENNA", hint: "Famous for its imperial palaces and classical music" },
    { name: "WASHINGTON", hint: "Known for its iconic monuments and political significance" },
    { name: "OTTAWA", hint: "A city renowned for its cultural diversity and natural beauty" },
    { name: "BRASILIA", hint: "Known for its vibrant culture, samba music, and carnivals" },
    { name: "NEW DELHI", hint: "A city with a rich history and cultural heritage" },
    { name: "ANKARA", hint: "Known for its historic landmarks and unique blend of cultures" },
    { name: "OSLO", hint: "A city surrounded by beautiful fjords and natural landscapes" },
    { name: "HELSINKI", hint: "Famous for its design, saunas, and Northern Lights" },
    { name: "CANBERRA", hint: "Known for its modern architecture and outdoor lifestyle" },
    { name: "COPENHAGEN", hint: "A city known for its historic sites and vibrant waterfront" },
    { name: "BUDAPEST", hint: "Famous for its stunning architecture and thermal baths" },
    { name: "WARSAW", hint: "Known for its historic old town and vibrant nightlife" },
    { name: "PRAGUE", hint: "Famous for its stunning medieval architecture and beer" },
    { name: "LISBON", hint: "Known for its colorful tiled facades and vibrant culture" },
    { name: "BUENOS AIRES", hint: "A city famous for its tango dance and vibrant culture" },
    { name: "MEXICO CITY", hint: "Known for its rich history and vibrant street life" },
    { name: "RIYADH", hint: "A city known for its modern architecture and cultural heritage" },
    { name: "KUALA LUMPUR", hint: "Famous for its diverse cuisine and iconic Petronas Towers" },
    { name: "LIMA", hint: "Known for its ancient Incan ruins and vibrant culinary scene" },
    { name: "JAKARTA", hint: "A bustling city famous for its diverse culture and vibrant street life" },
    { name: "DOHA", hint: "Known for its modernist architecture and sandy beaches" },
    { name: "ABU DHABI", hint: "A city known for its modern skyline and luxurious shopping malls" },
    { name: "HAVANA", hint: "Famous for its vintage cars, colonial architecture, and vibrant music" },
    { name: "SANTIAGO", hint: "A city surrounded by mountains and known for its vibrant culture" },
    { name: "RABAT", hint: "Famous for its bustling medinas and vibrant souks" },
    { name: "WELLINGTON", hint: "Known for its scenic beauty and outdoor adventure opportunities" },
    { name: "KIEV", hint: "A city with a rich history and beautiful architecture" },
    { name: "BOGOTA", hint: "Known for its historic old town and vibrant street art" },
    { name: "MONTREAL", hint: "Famous for its multiculturalism and diverse culinary scene" },
    { name: "CARACAS", hint: "A city known for its modern skyscrapers and lively atmosphere" },
    { name: "MANILA", hint: "Fnown for its Spanish colonial architecture and bustling markets" },
    { name: "SOFIA", hint: "A city with a rich history and stunning Orthodox churches" }
  ];
 
  var currentCityIndex;
  var scrambledCity;
  var timer;
  var timerValue = 30;
  var score = 0;
  var elapsedTime = 0;
  var totalTime = 300;
 
  var startButton = document.getElementById("start-button");
  var hintButton = document.getElementById("hint-button");
  var checkButton = document.getElementById("check-button");
  var playAgainButton = document.getElementById("play-again-button");
  var wordBox = document.getElementById("word-box");
  var messageBox = document.getElementById("message-box");
  var timerElement = document.getElementById("timer-value");
  var scoreElement = document.getElementById("score-value");
  var wordInput = document.getElementById("word-input");
 
  var facebookShareButton = document.getElementById("facebook-share");
  var twitterShareButton = document.getElementById("twitter-share");
 
  var successSound = new Audio("success-1-6297.mp3");
  var startSound = new Audio("click-game-menu-147356.mp3");
 var incorrectSound = new Audio("videogame-death-sound-43894.mp3");
  var backgroundMusic = new Audio("Balynt-Campfire.mp3");
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.3;
 
  startButton.addEventListener("click", startGame);
  hintButton.addEventListener("click", showHint);
  checkButton.addEventListener("click", checkAnswer);
  playAgainButton.addEventListener("click", startGame);
 
  facebookShareButton.addEventListener("click", shareOnFacebook);
  twitterShareButton.addEventListener("click", shareOnTwitter);
 
  wordInput.addEventListener("keypress", function(event) {
    if (event.keyCode === 13) {
      checkAnswer();
    }
  });
 
  function startGame() {
    resetGame();
    selectRandomCity();
    scrambleCity();
    wordBox.textContent = scrambledCity;
    messageBox.textContent = "Guess the city!";
    startTimer();
    hintButton.disabled = false;
    checkButton.disabled = false;
    startSound.play();
    backgroundMusic.play();
  }
 
  function resetGame() {
   timerValue = 30;
    elapsedTime = 0;
    score = 0;
    timerElement.textContent = timerValue;
    scoreElement.textContent = score;
    clearInterval(timer);
    hintButton.disabled = true;
    checkButton.disabled = true;
    playAgainButton.style.display = "none";
    stopBackgroundMusic();
  }
 
  function selectRandomCity() {
    currentCityIndex = Math.floor(Math.random() * cities.length);
  }
 
  function scrambleCity() {
    var city = cities[currentCityIndex].name;
    var letters = city.split("");
    for (var i = letters.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = letters[i];
      letters[i] = letters[j];
      letters[j] = temp;
    }
    scrambledCity = letters.join("");
  }
 
  function startTimer() {
    timer = setInterval(function () {
      timerValue--;
      elapsedTime++;
      timerElement.textContent = timerValue;
      if (timerValue === 0 || elapsedTime >= totalTime) {
        clearInterval(timer);
        endGame();
      }
    }, 1000);
  }
 
  function endGame() {
    messageBox.textContent = "Game Over! Your final score is " + score + ".";
    hintButton.disabled = true;
    checkButton.disabled = true;
    playAgainButton.style.display = "inline-block";
    stopBackgroundMusic();
  }
 
  function showHint() {
    messageBox.textContent = cities[currentCityIndex].hint;
    hintButton.disabled = true;
    }
   
    function checkAnswer() {
    var answer = wordInput.value.trim().toUpperCase();
    if (answer === cities[currentCityIndex].name) {
    messageBox.textContent = "Correct!";
    incrementScore();
    wordInput.value = "";
    successSound.play();
    if (elapsedTime < totalTime) {
    selectRandomCity();
    scrambleCity();
    wordBox.textContent = scrambledCity;
    } else {
    endGame();
    }
    } else {
    messageBox.textContent = "Incorrect answer. Try again!";
    incorrectSound.play();
    }
    }
   
    function incrementScore() {
    score++;
    scoreElement.textContent = score;
    }
   
    function stopBackgroundMusic() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    }
 
    function shareOnFacebook() {
      var shareUrl = "http://127.0.0.1:5500/game.html";
      var facebookShareUrl = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(shareUrl);
      window.open(facebookShareUrl, "_blank");
    }
   
    function shareOnTwitter() {
      var shareText = "I scored " + score + " points in the City Scramble game! Can you beat my score?"; // Customize the share text
      var shareUrl = "http://127.0.0.1:5500/game.html";
      var twitterShareUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(shareText) + "&url=" + encodeURIComponent(shareUrl);
      window.open(twitterShareUrl, "_blank");
    }
    });
