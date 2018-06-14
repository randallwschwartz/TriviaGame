// Trivia Game JavaScript

$(document).ready(function() {

  //setup variables with trivia questions and answers
  var questionsArray = [
    "In what year did the team move from Municipal Stadium to Kauffman (née Royals) Stadium?",
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

  //create set timeout methods
  setTimeout(fiveSeconds, 1000 * 5);
  setTimeout(tenSeconds, 1000 * 10);

  initiateGame();

  
  function initiateGame() {

    $("#triviaDisplay").empty();

    // var startButton = $("<button id='start'>" + "Start" + "</button>");
    var startButton = $("<button>");
    startButton.addClass("start");
    startButton.text("Start");    

    //append the button to the trivia html
    $("#triviaDisplay").append(startButton);

  }


  function fiveSeconds() {

    // in the element with an id of time-left add an h2 saying About 10 Seconds Left!
    // console log 10 seconds left
    $("#time-left").append("<h2>About 10 Seconds Left!</h2>");
    console.log("10 seconds left");
  }
  
  function tenSeconds() {
  
    // in the element with an id of time-left add an h2 saying About 5 Seconds Left!
    // console log 5 seconds left
    $("#time-left").append("<h2>About 5 Seconds Left!</h2>");
    console.log("5 seconds left");
  }

  // // add a for loop to loop through the trivia answers
  // for (i = 0; i < questionsArray.length; i++) {

  // };

  //start with the first question
  var questionNumber = 0;

  //on a click of start button, call function to print a new question along with the four possible answers that are clickable
  $(".start").on("click", function() {
    newQuestion(questionNumber);
  });

  // Adding click event listener to all elements with a class of "qAnswer", run the checkAnswer function
  $(document).on("click", ".qAnswer", checkAnswer(questionNumber));




  // ----------------

  function checkAnswer(i) {
    //on a click of an html answer, do these steps to determine if answer is correct
    var correctAns = false;
    // grab the data from the answer clicked and assign to variable "ans"
    var ans = $(this).attr("data-answer");
    // pick the answer from the array associated with the question number
    var rightAnswer = correctAnswer[i];

    if (ans = rightAnswer) {
      correctAns = true;
    }

    //empty the trivia element
    $("#triviaDisplay2").empty();

    //grab the trivia element
    var triviaAnswer = $("#triviaDisplay2");

    // Creates an element to hold the image
    // var image = $("<img>").attr("src", imgURL);

    if (correctAns) {
      //build the triviaAnswer element by adding the answer and image 
      triviaAnswer.append("You are right!  The correct answer is: " + rightAnswer + "<hr><hr>");
      // triviaAnswer.append(image);

    } else {
      triviaAnswer.append("You are wrong!  The correct answer is: " + rightAnswer + "<hr><hr>");

    }

    //then call function to print a new question along with the four possible answers that are clickable
    if (questionNumber<4) {
      //go to the next question
      questionNumber++;

      //hold for 5 seconds, then call newQuestion
      setInterval(newQuestion(questionNumber), 1000 * 5);
    } else {
      //if at the end of questions, start over
      questionNumber = 0;

      //hold for 5 seconds, then call newQuestion
      setInterval(newQuestion(questionNumber), 1000 * 5);
    }
  }



  // -------------

  function newQuestion(i) {
    //run this function each time we want to present a new trivia question to be answered

    //empty the divs first
    $("#triviaDisplay").empty();
    $("#triviaDisplay2").empty();

    //start the timer and call an out of time function if exceed 30 seconds
    setInterval(outOfTime, 1000 * 30);


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

    };

    //append the triviaQuestion element to the html
    $("#triviaDisplay2").append(triviaQuestion);
    console.log(triviaQuestion);
  }

  function outOfTime() {
    var rightAnswer = correctAnswer[i];

    //empty the trivia element
    $("#triviaDisplay2").empty();

    //grab the trivia element
    var triviaAnswer = $("#triviaDisplay2");

    triviaAnswer.append("Sorry, you ran out of time.  The correct answer is: " + rightAnswer + "<hr><hr>");
      // triviaAnswer.append(image);


    //then call function to print a new question along with the four possible answers that are clickable
    if (questionNumber<4) {
      //go to the next question
      questionNumber++;

      //hold for 5 seconds, then call newQuestion
      setInterval(newQuestion(questionNumber), 1000 * 5);
    } else {
      //if at the end of questions, start over
      questionNumber = 0;

      //hold for 5 seconds, then call newQuestion
      setInterval(newQuestion(questionNumber), 1000 * 5);
    }

  }

  // $("#triviaDisplay2").on("click", function() {
  //   //on a click of start button, call function to print a new question along with the four possible answers that are clickable

  //   // add a for loop to loop through the trivia questions
  //   for (i = 0; i < questionsArray.length; i++) {

  //     // call the newQuestion function
  //     newQuestion(i);

  //   };

  // });


});