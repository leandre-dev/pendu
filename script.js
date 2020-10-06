window.onload = function () {
  var alphabet = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
	"n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
  ];

  var values; // Array of topics
  var getHint; // Word getHint
  var word; // Selected word
  var guess; // Geuss
  var geusses = []; // Stored geusses
  var lives; // Lives
  var counter; // Count correct geusses
  var space; // Number of spaces in word '-'

  // Get elements
  var showLives = document.getElementById("mylives");
  var showCatagory = document.getElementById("scatagory");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");

  // create alphabet ul
  var buttons = function () {
    myButtons = document.getElementById("buttons");
    letters = document.createElement("ul");

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = "alphabet";
      list = document.createElement("li");
      list.id = "letter";
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  };

  // Create geusses ul
  result = function () {
    wordHolder = document.getElementById("hold");
    correct = document.createElement("ul");

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute("id", "my-word");
      guess = document.createElement("li");
      guess.setAttribute("class", "guess");
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  };

  // Show lives
  comments = function () {
    showLives.innerHTML = "Il vous reste " + lives + " essaie(s)";
    
    if (lives < 1) {
      showLives.innerHTML = "Aucun bonus";
      $("#fail").modal({
        escapeClose: true,
        clickClose: true,
        showClose: false,
        fadeDuration: 750
      });
    }
    else {
      for (var i = 0; i < geusses.length; i++) {
        if (counter + space === geusses.length) {
          showLives.innerHTML = "Vous gagnez un bonus!";
          $("#success").modal({
            escapeClose: true,
            clickClose: true,
            showClose: false,
            fadeDuration: 750
          });
        }
      }
    }
  };


  // Animate man
  var animate = function () {
    var drawMe = lives;
    drawArray[drawMe]();
  };

  // Hangman
  canvas = function () {
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
  };

  head = function () {
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext("2d");
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();
  };

  frame1 = function () {
    draw(0, 150, 150, 150);
    draw(10, 0, 10, 600);
  };

  frame2 = function () {
    draw(0, 5, 70, 5);
    draw(60, 5, 60, 15);
  };

  torso = function () {
    draw(60, 36, 60, 70);
  };

  rightArm = function () {
    draw(60, 46, 100, 50);
  };

  leftArm = function () {
    draw(60, 46, 20, 50);
  };

  rightLeg = function () {
    draw(60, 70, 100, 100);
  };

  leftLeg = function () {
    draw(60, 70, 20, 100);
  };

  drawArray = [
    rightLeg,
    leftLeg,
    rightArm,
    leftArm,
    torso,
    head,
    frame2,
    frame1
  ];

  // OnClick Function
  check = function () {
    list.onclick = function () {

        if(showLives.innerHTML == "Fin ! Aucun bonus" ||
        showLives.innerHTML == "Fin! Vous avez gagné un bonus!") {
        }
    	else {
    	  var geuss = this.innerHTML;
	      this.setAttribute("class", "active");
	      this.onclick = null;
	      for (var i = 0; i < word.length; i++) {
	        if (word[i] === geuss) {
	          geusses[i].innerHTML = geuss;
	          counter += 1;
	        }
	      }
	      var j = word.indexOf(geuss);
	      if (j === -1) {
	        lives -= 1;
	        comments();
	        animate();	
	      } else {
	        comments();
	      }
    	}
    };
  };

  // Play
  play = function () {
    values = [
    	"respect",
        "fidelite",
        "confiance",
        "humour",
        "honnetete",
        "transparence",
        "communication",
        "unite",
        "autonomie"
    ];

    word = values[Math.floor(Math.random() * values.length)];
    word = word.replace(/\s/g, "-");
    console.log(word);
    buttons();

    geusses = [];
    lives = 8;
    counter = 0;
    space = 0;
    result();
    comments();
    canvas();
  };

  play();

  // Hint

  hint.onclick = function () {
    hints = [
        "Signifier égard ou considération",
        "Loyauté envers une personne",
        "Sentiment de sécurité d'une personne qui se fie à elle-même",
        "Forme d'esprit railleuse",
        "Conforme à la morale",
        "Plus qu'opaque",
        "Action de transmettre des infos",
        "Capacité de collaborer avec les autres",
        "Faculté d'agir librement"
    ];

    var hintIndex = values.indexOf(word);
    showClue.innerHTML = "Astuce: " + hints[hintIndex];
  };

  // Reset

  document.getElementById("reset").onclick = function () {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    context.clearRect(0, 0, 400, 400);
    play();
  };
};
