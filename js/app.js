$(document).ready(function() {
	
    $("li").hover(function()
        {
            $(this).css('background-color', 'gray'); 
			$(this).css('color', 'white'); 
        },
        function()
        {
            $(this).css('background-color', 'white')
			$(this).css('color', 'black'); 
        });
	$("li").click(function()
		{
			$(this).find("input").prop("checked",true);
			$(this).parent().parent().find("button").click();
			
		});
		
	////////////////////////////////////////////////// Hides stuff //////////////////////////////////////////////////
	$("#quizName").hide();
	$("#quizName").fadeIn(3000);
	$("#question").hide();
	$(".resultsDiv").hide();
	$("#starsContainer").hide();
	$("#duneContainer").hide();
	$("#androidContainer").hide();
	$("#gatacaContainer").hide();
	var countQuestionsCorrect = 0;
	var countQuestionsWrong = 0;
	var previousCountQuestionsCorrect = 0;
	
	////////////////////////////////////////////////// SETS VARIABLES //////////////////////////////////////////////////
		
	var qandA = function(question, choice0, choice1, choice2, choice3, id) {
		this.question = question;
		this.choice0 = choice0;
		this.choice1 = choice1;
		this.choice2 = choice2;
		this.choice3 = choice3;
		this.id = id
	}
	
	var imgArray = {}
	
	//private answer bank
	var answers = ["Stars My Destination", "Dune", "Gataca", "Do Androids Dream of Electric Sheep"];
	
	//sets the choices users will see
	var questionsAndAnswers = new Array() 
		
		questionsAndAnswers[0] = new qandA("Alfred Bester imagines a future in which people can teleport a thousand miles with a single thought, where the rich barricade themselves in labyrinths and protect themselves with radioactive hit men - and where an inarticulate outcast is the most valuable and dangerous man alive.", "Harry Potter", "Ender's Game", "Stars My Destination", "None of the above",  0);
		questionsAndAnswers[1] = new qandA("The story explores the multi-layered interactions of politics, religion, ecology, technology, and human emotion", "Dune", "Harry Potter","I, Robot", "Voldemort", 1);
		questionsAndAnswers[2] = new qandA("Explores the idea of destiny and the ways in which it can and does govern lives. Characters continually battle both with society and with themselves to find their place in the world and who they are destined to be according to their genes.", "Gataca", "Time machine", "1984", "Harry Potter", 2);
		questionsAndAnswers[3] = new qandA("Unlike humans, they possess no sense of empathy. In essence, Deckard probes the existence of defining qualities that separate humans from androids.", "Cyborg", "Do Androids Dream of Electric Sheep", "I, Robot", "The Humanoids", 3);

	
	//////////////////////////////////////////////////SETS VARIABLE FOR THE MASTER FUNCTON (WHICH IS STARTED AT THE LAST LINE) 
	var count = 0
	var master = function () {
	
	
		//////////////////////////////////////////////////Radomizes question
	//    var randomizeQuestions = function () {
	//  	questionsAndAnswers.sort(function () {
	//			return Math.floor(Math.random()*4);
	//		});
		
			//for (var i = 0; i < questionsAndAnswers.length; i++) {
			//	console.log(questionsAndAnswers[i]);
			//};
	
	//	}
		//////////////////////////////////////////////////Initialize the randomize question method
	//	var test = new randomizeQuestions();
	
	
		//append questions
		$("#continueButton").on("click", function() {
			$("[id=result]").text("");
			$("#question").show();
			$("#whySciFi").hide();
			count = count + 1;
			console.log(count);
			$("#quizName").animate({top:"-30", width:"400"})
			
			///////////////////////////////////////////////////////
			var showQuestionPicture = function() {
				$("#continueButton").text("Continue")
				$("#continueButton").show()
				
				var buttonAnswer = $('input[name=quiz]:checked').val();
				console.log(buttonAnswer);
				
				for (var i = 0; i<answers.length ; i++)
			 	{
					if (buttonAnswer == answers[i]) {
					countQuestionsCorrect = countQuestionsCorrect + 1;
					$("input[name=quiz]:checked").parent().find("#result").text("Correct!");
					break;
					}
					
					else {
						$("input[name=quiz]:checked").parent().find("#result").text("Incorrect!");
						
					}
				}
			}
			
			
			///////////////////////////////////////////////////////
			var next = function() {	
			
			$("#questionContainer1").hide();
			document.getElementById("q0").checked = false;
			document.getElementById("q1").checked = false;
			document.getElementById("q2").checked = false;
			document.getElementById("q3").checked = false;
			$("#continueButton").hide();
			
			var qa = questionsAndAnswers[0]
			
			//sets the variables for the choices
			//only change this if the variables of the class qandA changes
			var r = qa.choice0;
			var x = qa.choice1;
			var y = qa.choice2;
			var z = qa.choice3;
			
			//pushes first array to the end
			a = questionsAndAnswers.shift();
			questionsAndAnswers.push(a);
			
			
			//select question out of the class and replaces it as the header
			$("#hint").text(qa.question);
			
			//selects the choice out of the class and replaces it as the question
			$("#questionZero").text(r); 	//choice 0
			$("#questionOne").text(x); 		//choice 1
			$("#questionTwo").text(y); 		//choice 2
			$("#questionThree").text(z); 	//choce 3
			
			//changes the value of the radio button to correspond to the value of the the choice
			$("#q0").val(r); //q0 retreives form ID from html file
			$("#q1").val(x);
			$("#q2").val(y);
			$("#q3").val(z);
						
			}
			///////////////////////////////////////////////////////
		
			//////////////////////////////////////////////////STARTS COUNTING HERE
			////////////////////////////////////////////////// 1. CHECKS YOUR ANSWER TO SEE IF IT IS CORRECT AND SHOWS THE HIDE BUTTON
			//////////////////////////////////////////////////
			//////////////////////////////////////////////////
			//////////////////////////////////////////////////
			
			if (count % 2===0) {
				count+1
				showQuestionPicture();
							
			}
			////////////////////////////////////////////////// 2. CONTINUES ONTO THE NEXT QUESTION
			else if (count > 8) {
				calculateResults();
				$("#androidContainer").hide();
			}
		
			else if (count % 2==! 0){
				if (count === 1) {
				next();
				$("#starsContainer").fadeIn(3000);

				$("#questionContainer1").fadeIn(2000);
				}
				else if (count === 3) {
					next();
					$("#questionContainer1").hide();
					$("#starsContainer").hide();
					$("#questionContainer1").fadeIn(2000);	
					$("#duneContainer").fadeIn(3000)
		
				}
				else if (count === 5) {
					next();
					$("#questionContainer1").hide();
					$("#duneContainer").hide();
					$("#questionContainer1").fadeIn(2000);
					$("#gatacaContainer").fadeIn(3000);
					
					
				}
				else if (count === 7) {
					next();
					$("#questionContainer1").hide();
					$("#gatacaContainer").hide();
					$("#androidContainer").fadeIn(2000);
					$("#questionContainer1").fadeIn(3000);
				}
			}

		});

	}
	
	////////////////////////////////////////////////// STARTS THE MASTER PROGRAM //////////////////////////////////////////////////
	var calculateResults = function() {
		$(".resultsDiv").show();
		$(".questionOne").hide();
		$("#quesAnsweredCorrectly").text(countQuestionsCorrect)
		$("#quesAnsweredWrong").text(answers.length - countQuestionsCorrect)
		console.log(countQuestionsCorrect)
	}
	
	////////////////////////////////////////////////// STARTS THE MASTER PROGRAM //////////////////////////////////////////////////
	
	var masterTest = new master();

	
});