
var questionCount;
var timeInt;
var timeQue;
var cor;
var inc;
var unans;

var questionObj = [
    {
        ques: "What is the name of Doc's '1985' dog in Back to the Future I?",
        A: "Oppenheimer",
        B: "Einstein",
        C: "Tesla",
        D: "Fido",
        correctAns: "B",
        status: "skipped",
        fact: "Doc always names his dogs after famous scientists.  His dog in 1985 was named Einstein, and his dog in 1955 was Copernicus.",
        html: "<img src='Assets/images/einstein.jpg'/>"
    }, 
    {
        ques: "The Red Hot Chili Peppers' bassist, Flea, played which character in Back to the Future Part II and III?",
        A: "Douglas Needles",
        B: "Biff Tannen",
        C: "Don Pinewood",
        D: "George McFly",
        correctAns: "A",
        status: "skipped",
        fact: "In addition to his role as Douglass Needles in the second and third BttF movies, Michael 'Flea' Balzary has had small parts in a number of films and TV shows, including Baby Driver, The Big Lebowski, and The Wild Thornberrys.",
        html:"<img src='Assets/images/needles.jpg'/>",
    },
    {
        ques: "What is the DeLorean's vanity plate?",
        A: "TMETRVLR",
        B: "FLXCPCTR",
        C: "BCK2FUTR",
        D: "OUTATIME",
        correctAns: "D",
        status: "skipped",
        fact: "The DeLorean time machine is actually a licensed, registered vehicle in the state of California. While the vanity license plate used in the film says 'OUTATIME', the DeLorean's real license plate reads 3CZV657.",
        html:"<img src='Assets/images/outatime.jpg'/>"
    },
    {
        ques: "How fast does the DeLorean have to go to time travel?",
        A: "99 MPH",
        B: "88 MPH",
        C: "66 MPH",
        D: "100 MPH",
        correctAns: "B",
        status:"skipped",
        fact:"The first time we see the DeLorean getting up to speed to time travel (in the parking lot of the Twin Pines Mall) is a great example of 'movie physics'.  In reality, the DMC-12 takes almost 9 seconds to go from 0-60, making it impossible for the car to reach 88 MPH in the time and distance alloted in that scene.",
        html:"<img src='Assets/images/88.jpg'/>"
    },
    {
        ques: "What song does Marty play at the Enchantment Under the Sea dance?",
        A: "The Power of Love",
        B: "Back In Time",
        C: "Johnny B. Goode",
        D: "Mr Sandman",
        correctAns: "C",
        status: "skipped",
        fact: "While Michael J Fox didn't really play any of the songs in Back to the Future, he did later learn to play the guitar, and has performed Johnny B. Goode publically on several occasions at benefit events for Parkinson's research.",
        html: "<img src='Assets/images/johnnybgoode.jpg'/>"
    },
];



var resultsObj = {
    evalAns: function(answer) {
        var quesStr = questionObj[questionCount];
        if ( answer == quesStr.correctAns ) {
            quesStr.status = "correct";
        } else {
            quesStr.status = "incorrect"
        }
    },

    updateScores: function() {
        $.each(questionObj, function(index, value) {
            if (value.status === "correct"){
                cor++;
            } else if (value.status === "incorrect") {
                inc++;
            } else {
                unans++;
            }
        });
    },
};


function timer() {
    timeLeft = timeQues;
    $('#timer').text('Time: ' + timeLeft);
    timeInt = setInterval(showTimer, 1000);
};
    
function showTimer() {
    timeLeft--;
    $('#timer').text('Time: ' + timeLeft);
    if(timeLeft < 1){        
        displayAnswer();
        // clearInterval(timeInt);
    }
    
};


//modify html to show questions
function displayQuestion () {
    var q = questionObj[questionCount];
    
    clearInterval(timeInt);
    timer();
    
    $(".ans-buttons").removeClass("hidden");
    $(".ans-buttons").addClass("shown");
    $("#question").text(q.ques);
    $("#1").text("A: " + q.A);
    $("#2").text("B: " + q.B);
    $("#3").text("C: " + q.C);
    $("#4").text("D: " + q.D);
    $("#quizpic").html("");
    
};

//modify html to show answers
function displayAnswer() {
    var q = questionObj[questionCount];
    var corAns = questionObj[questionCount].correctAns;

    if(questionCount == (questionObj.length-1)){
		setTimeout(displayResults, 1000 * timeQues);
	} else{
		questionCount++;
		setTimeout(displayQuestion, 1000 * timeQues);
	}	

    clearInterval(timeInt);
    timer()
    

    $(".ans-buttons").removeClass("shown");
    $(".ans-buttons").addClass("hidden");

    $("#question").text("That answer was " + q.status + ". The answer is " + q[corAns] + " .");
    $("#1").text("Fun fact: ");
    $("#2").text(q.fact);
    $("#3").text("");
    $("#4").text("");
    $("#quizpic").html(q.html);


};

//modify html to show final quiz results
function displayResults() {
    clearInterval(timeInt);
    resultsObj.updateScores();
    var message;

    if (cor >= 4) {
        message = "Impressive!";
    } else if (cor >= 3) {
        message = "Not bad!";
    } else {
        message = "Better luck next time!";
    }

    $(".ans-buttons").removeClass("shown");
    $(".ans-buttons").addClass("hidden");
    $("#timer").removeClass("shown");
    $("#timer").addClass("hidden");

    $("#question").text("Let's see how you did:");
    $("#1").text("Correct: " + cor);
    $("#2").text("Incorrect: " + inc);
    $("#3").text("Skipped: " + unans);
    $("#4").text(message);
    $("#quizpic").html('<iframe width=400" height="260" src="https://www.youtube.com/embed/IVy8tz54_JA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');

}


//reset variables, ques status, timer interval, and html
function init() {
    

    cor = 0;
    inc = 0;
    unans = 0;
    questionCount = 0;
    timeQues = 15;
    clearInterval(timeInt);
  

    $.each(questionObj, function(index, value) {
        value.status = "skipped";
    });

    $("#timer").removeClass("hidden");
    $("#timer").addClass("shown");

    
    displayQuestion();

};


$("#newgame").click(init);

$(".response").click(function() {
    var ans = $(this).val();
    resultsObj.evalAns(ans);
    displayAnswer();
});





