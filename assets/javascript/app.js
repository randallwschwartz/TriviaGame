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
  // var correctAnswer = [answersArray[0,2], answersArray[1,2], answersArray[2,3], answersArray[3,1], answersArray[4,2]];


  console.log(questionsArray);
  console.log(answersArray);
  console.log(correctAnswer);


  initiateGame();
  senseClick();
  
  function initiateGame() {

    $("#triviaDisplay").empty();

    // create a start button element
    var startButton = $("<button>");
    startButton.addClass("start");
    startButton.text("Start");    

    //append the button to the trivia html
    $("#triviaDisplay").append(startButton);

  }

  var rightAnsTotal = 0;
  var wrongAnsTotal = 0;
  var unansweredTotal = 0;

  var interval2;
  var ans = "";

  //start with the first question
  var questionNumber = 0;
  
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

    clearInterval(interval2);

    //empty the divs first
    $("#triviaDisplay").empty();
    $("#triviaDisplay2").empty();

    //***maybe remove this****start the timer and call an out of time function if exceed 30 seconds
    // setInterval(outOfTime, 1000 * 30);

    //  Execute the runTimer function.
    runTimer();

    //grab the trivia element
    var triviaQuestion = $("#triviaDisplay2");

    //build the triviaQuestion element by adding question 
    triviaQuestion.append("Question: " + questionsArray[i] + "<hr><hr>");

    var possibleAnswers = [];
    possibleAnswers = answersArray[i];

    //continue building the triviaQuestion element by adding the four possible answers 
    for (j=0; j<possibleAnswers.length; j++) {
      // triviaQuestion.append(possibleAnswers[j] + "<hr>");

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
    $("#triviaDisplay2").append(triviaQuestion);

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
    $("#triviaDisplay2").empty();

    // grab the trivia element
    var triviaAnswer = $("#triviaDisplay2");

    // provide a message depending if the answer does or does not match the correct answer
    if (ans === rightAnswer) {
      //increment rightAnsTotal
      rightAnsTotal++;

      //build the triviaAnswer element by adding the answer and image 
      triviaAnswer.append("You are right!  The correct answer is: " + rightAnswer + "<hr><hr>");
      // triviaAnswer.append(image);

    } else {
      //increment wrongAnsTotal
      wrongAnsTotal++;

      //build the triviaAnswer element by adding the answer and image 
      triviaAnswer.append("You are wrong!  The correct answer is: " + rightAnswer + "<hr><hr>");
      // triviaAnswer.append(image);
    }

    clearInterval(interval2);

    //then call newQuestion to print the next question along with the four clickable answers
    //if at the end of the list of questions, go back to the first question
    if (questionNumber<4) {
      //go to the next question
      questionNumber++;

      // hold for 5 seconds, then call newQuestion
      interval2 = setInterval(function(){newQuestion(questionNumber)}, 1000 * 2);

    } else {
      //if at the end of questions, hold for 5 seconds, then log the results
      interval2 = setInterval(logResults, 1000 * 2);
    }
  }
  // -------------


  function outOfTime(i) {
    var rightAnswer = correctAnswer[i];

    // increment unansweredTotal
    unansweredTotal++;

    //empty the trivia element
    $("#triviaDisplay2").empty();

    //grab the trivia element
    var triviaAnswer = $("#triviaDisplay2");

    triviaAnswer.append("Sorry, you ran out of time.  The correct answer is: " + rightAnswer + "<hr><hr>");
      // triviaAnswer.append(image);

    clearInterval(interval2);

    //then call newQuestion to print the next question along with the four clickable answers
    //if at the end of the list of questions, go back to the first question
    if (questionNumber<4) {
      //go to the next question
      questionNumber++;

      // hold for 5 seconds, then call newQuestion
      interval2 = setInterval(function(){newQuestion(questionNumber)}, 1000 * 2);

    } else {
      //if at the end of questions, hold for 5 seconds, then log the results
      interval2 = setInterval(logResults, 1000 * 2);

    }

  }

  // function that logs results and asks if you want to play again
  function logResults(){

    //empty the trivia element
    $("#triviaDisplay").empty();
    $("#triviaDisplay2").empty();

    //grab the trivia element
    var triviaQuestion = $("#triviaDisplay2");

    //build the triviaQuestion element by adding the results 
    triviaQuestion.append("Correct Answers: " + rightAnsTotal + "<hr>");
    triviaQuestion.append("Incorrect Answers: " + wrongAnsTotal + "<hr>");
    triviaQuestion.append("Unanswered: " + unansweredTotal + "<hr>");

    //create another button to restart
    var startButtonTwo = $("<button>");
    startButtonTwo.addClass("startTwo");
    startButtonTwo.text("Start");    

    //append the button to the trivia html
    triviaQuestion.append("Do you want to play again? " + startButtonTwo);

    $(".startTwo").on("click", function() {
      initiateGame();
      senseClick();
    });
  
  }


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

});