// Trivia Game JavaScript

$(document).ready(function() {

  //setup variables with trivia questions and answers
  var questionsArray = [
    "In what year did the team move from Municipal Stadium to Kauffman Stadium?",
    "Which team did the Royals beat to win their first American League pennant in 1980?",
    "What was Royals Hall of Famer George Brett’s final batting average in 1980?",
    "Who was the winning pitcher in Game 7 of the 1985 World Series?",
    "Who is the winningest pitcher in Royals history?"
  ];

  var answersArray = [
    ["1970", "1971", "1973", "1975"],
    ["Boston", "Oakland", "New York Yankees", "Detroit Tigers"],
    [".370", ".375", ".380", ".390"],
    ["Charlie Liebrandt", "Bret Saberhagen", "Bud Black", "Danny Jackson"],
    ["Mark Gubicza", "Dennis Leonard", "Paul Splittorff", "Bret Saberhagen"]
  ];

  var correctAnswer = ["1973", "New York Yankees", ".390", "Bret Saberhagen", "Paul Splittorff"];
  
  var imagesArray = [
    "assets/images/kauffman.jpg",
    "assets/images/yankees.png",
    "assets/images/brett.jpeg",
    "assets/images/saberhagen.jpeg",
    "assets/images/splittorff.jpeg"
  ];

  var rightAnsTotal;
  var wrongAnsTotal;
  var unansweredTotal;
  var intervalTwo;
  var ans;
  var questionNumber;
  var triviaQuestion;


  console.log(questionsArray);
  console.log(answersArray);
  console.log(correctAnswer);


  // initiateGame();
  
  function initiateGame() {

    rightAnsTotal = 0;
    wrongAnsTotal = 0;
    unansweredTotal = 0;
    ans = "";
  
    //start with the first question
    questionNumber = 0;
  
    $("#triviaDisplay").empty();
    $("#triviaDisplayTwo").empty();

    // create a start button element
    var startButton = $("<button>");
    startButton.addClass("start");
    startButton.text("Start");    

    //append the button to the trivia html
    $("#triviaDisplay").append(startButton);

    senseClick();
  }

  
  // On Click of Start button, call function to print a new question 
  //along with the four possible answers that are clickable
  //
  function senseClick() {
    $(".start").on("click", function() {
      newQuestion(questionNumber);

      // Adding click event listener to all elements with a class of "qAnswer"
      // run the checkAnswer function
      $(document).on("click", ".qAnswer", function(event) {
        // grab the data from the answer clicked and assign to variable "ans"
        ans = $(this).attr("data-answer");
        console.log(ans);
        checkAnswer(questionNumber);
      });
    });
  }


  //run this function each time we want to present a new trivia question to be answered
  //
  function newQuestion(i) {

    clearInterval(intervalTwo);

    //empty the divs first
    $("#triviaDisplay").empty();
    $("#triviaDisplayTwo").empty();

    //  Execute the runTimer function.
    runTimer();

    //grab the trivia element
    triviaQuestion = $("#triviaDisplayTwo");

    //build the triviaQuestion element by adding question 
    triviaQuestion.append("Question: " + questionsArray[i] + "<hr>");

    var possibleAnswers = [];
    possibleAnswers = answersArray[i];

    //continue building the triviaQuestion element by adding the four possible answers 
    for (j=0; j<possibleAnswers.length; j++) {

      //dynamically generate clickable html for each answer in the array
      var answer = $("<div>");

      // adds a class of qAnswer to the div
      answer.addClass("qAnswer");
      // adds a data attribute of the answer string
      answer.attr("data-answer", possibleAnswers[j]);
      // provides the text for the div 
      answer.text(possibleAnswers[j]);
      // appends the div to the triviaQuestion div
      triviaQuestion.append(answer);

      console.log(possibleAnswers[j]);

    };

    //append the triviaQuestion element to the html
    $("#triviaDisplayTwo").append(triviaQuestion);

    console.log(triviaQuestion);
  }


  // ----------------
  //on a click of an html answer, do these steps to determine if answer is correct
  function checkAnswer(i) {
    // first, stop the timer
    stop();

    // grab the answer from the array associated with the question number
    var rightAnswer = correctAnswer[i];
    console.log(rightAnswer);

    // empty the trivia element
    $("#triviaDisplayTwo").empty();

    // grab the trivia element
    var triviaAnswer = $("#triviaDisplayTwo");

    var image = $("<img>");
    image.attr("src", imagesArray[i]);

    // provide a message depending if the answer does or does not match the correct answer
    if (ans === rightAnswer) {
      //increment rightAnsTotal
      rightAnsTotal++;

      //build the triviaAnswer element by adding the answer and image 
      triviaAnswer.append("You are right!  The correct answer is: " + rightAnswer + "<hr>");
      triviaAnswer.append(image);
  
    } else {
      //increment wrongAnsTotal
      wrongAnsTotal++;

      //build the triviaAnswer element by adding the answer and image 
      triviaAnswer.append("You are wrong!  The correct answer is: " + rightAnswer + "<hr>");
      triviaAnswer.append(image);
    }

    clearInterval(intervalTwo);

    //then call newQuestion to print the next question along with the four clickable answers
    //if at the end of the list of questions, go back to the first question
    if (questionNumber<4) {
      //go to the next question
      questionNumber++;

      // hold for 5 seconds, then call newQuestion
      intervalTwo = setInterval(function(){newQuestion(questionNumber)}, 1000 * 2);

    } else {
      //if at the end of questions, hold for 5 seconds, then log the results
      intervalTwo = setInterval(logResults, 1000 * 2);
    }
  }
  // -------------


  function outOfTime(i) {
    var rightAnswer = correctAnswer[i];

    // increment unansweredTotal
    unansweredTotal++;

    //empty the trivia element
    $("#triviaDisplayTwo").empty();

    //grab the trivia element
    var triviaAnswer = $("#triviaDisplayTwo");

    triviaAnswer.append("Sorry, you ran out of time.  The correct answer is: " + rightAnswer + "<hr>");

    var image = $("<img>");
    image.attr("src", imagesArray[i]);
    triviaAnswer.append(image);

    clearInterval(intervalTwo);

    //then call newQuestion to print the next question along with the four clickable answers
    //if at the end of the list of questions, go back to the first question
    if (questionNumber<4) {
      //go to the next question
      questionNumber++;

      // hold for 5 seconds, then call newQuestion
      intervalTwo = setInterval(function(){newQuestion(questionNumber)}, 1000 * 2);

    } else {
      //if at the end of questions, hold for 5 seconds, then log the results
      intervalTwo = setInterval(logResults, 1000 * 2);

    }

  }

  // function that logs results, asks if you want to play again,
  // then restarts game if a button click is sensed
  function logResults(){

    //empty the trivia element
    $("#triviaDisplay").empty();
    $("#triviaDisplayTwo").empty();

    //grab the trivia element
    triviaQuestion = $("#triviaDisplayTwo");

    //build the triviaQuestion element by adding the results 
    triviaQuestion.append("Correct Answers: " + rightAnsTotal + "<hr>");
    triviaQuestion.append("Incorrect Answers: " + wrongAnsTotal + "<hr>");
    triviaQuestion.append("Unanswered: " + unansweredTotal + "<hr>");

    // clearInterval(intervalTwo);

    // intervalTwo = setInterval(initiateGame, 1000 * 2);

    //create another button to restart
    // var startAgain = $("<button>");
    // startAgain.addClass("start");
    // startAgain.text("Start");    

    //append the button to the trivia html
    // triviaQuestion.append("Click here to play again.");

    // listen for a click; on click, initiate another game
    // $(document).on("click", "#triviaDisplayTwo", function(event) {
    //   startAnotherGame();
    // });

  }

  // function startAnotherGame() {
  //   triviaQuestion.empty();
  //   $(document).on("click", "#triviaDisplayTwo", function(event) {
  //     initiateGame();
  //   });
  // }


  //  Variable that will hold our interval ID when we execute
  //  the "run" function
  var intervalId;
  var number;

  //  The runTimer function sets an interval
  //  that runs the decrement function once a second.
  //  *****BUG FIX******** 
  //  Clearing the intervalId prior to setting our new intervalId will not allow multiple instances.
  function runTimer() {
    number = 15;
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
  }

  //  The decrement function.
  function decrement() {

    //  Decrease number by one.
    number--;

    //  Show the number in the #triviaDisplay tag.
    $("#triviaDisplay").html("<h2>" + number + "</h2>");


    //  Once number hits zero...
    if (number === 0) {

      //  ...run the stop function.
      stop();

      outOfTime(questionNumber);      

      //  Alert the user that time is up.
      alert("Time is up!");
    }
  }

  //  The stop function
  function stop() {

    //  Clears our intervalId
    //  We just pass the name of the interval
    //  to the clearInterval function.
    clearInterval(intervalId);
  }


  initiateGame();

  

});