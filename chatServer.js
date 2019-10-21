/*
chatServer.js
Author: David Goedicke (da.goedicke@gmail.com)
Closley based on work from Nikolas Martelaro (nmartelaro@gmail.com) as well as Captain Anonymous (https://codepen.io/anon/pen/PEVYXz) who forked of an original work by Ian Tairea (https://codepen.io/mrtairea/pen/yJapwv)
*/

var express = require('express'); // web server application
var app = express(); // webapp
var http = require('http').Server(app); // connects http library to server
var io = require('socket.io')(http); // connect websocket library to server
var serverPort = 8000;

var OneLinerJoke = require('one-liner-joke');



//---------------------- WEBAPP SERVER SETUP ---------------------------------//
// use express to create the simple webapp
app.use(express.static('public')); // find pages in public directory

// start the server and say what port it is on
http.listen(serverPort, function() {
  console.log('listening on *:%s', serverPort);
});
//----------------------------------------------------------------------------//


//---------------------- WEBSOCKET COMMUNICATION -----------------------------//
// this is the websocket event handler and say if someone connects
// as long as someone is connected, listen for messages
io.on('connect', function(socket) {
  console.log('a new user connected');
  var questionNum = 0; // keep count of question, used for IF condition.
  socket.on('loaded', function() { // we wait until the client has loaded and contacted us that it is ready to go.

    socket.emit('answer', "Hey, I think I'm funny.."); //We start with the introduction;
    setTimeout(timedQuestion, 5000, socket, "What is your name?"); // Wait a moment and respond with a question.

  });
  socket.on('message', (data) => { // If we get a new message from the client we process it;
    console.log(data);
    questionNum = bot(data, socket, questionNum); // run the bot function with the new message
  });
  socket.on('disconnect', function() { // This function  gets called when the browser window gets closed
    console.log('user disconnected');
  });
});
//--------------------------CHAT BOT FUNCTION-------------------------------//
function bot(data, socket, questionNum) {
  var input = data; // This is generally really terrible from a security point of view ToDo avoid code injection
  var answer;
  var question;
  var waitTime;

  /// These are the main statments that make up the conversation.
  if (questionNum == 0) {
    answer = 'Hello ' + input + ' :-)'; // output response
    waitTime = 5000;
    question = 'Do you want to hear a joke??'; // load next question
  }
  else if (questionNum == 1) {
    	if (input.toLowerCase()  == 'no'){
		answer = "Then I'm confused why you're here";
		waitTime = 5000;
		question = "I'm funny so I will just tell you a joke anyways. What do you want to hear a joke about?";
	}
	else if (input.toLowerCase()  == 'yes'){
		answer = "Yay! I'm really funny I promise.";
		waitTime=5000;
		question= "What do you want to hear a joke about?";
	}
  }
  else if (questionNum >1  &  questionNum < 20 ) {
	var getRandomJokeWithTag = OneLinerJoke.getRandomJokeWithTag(input)
	console.log(getRandomJokeWithTag['body'])
	if ( input.toLowerCase() == 'nothing'){
		answer = "Pretty mad you didn't like my jokes but whatever, bye."
		waitTime = 0;
		question = ''; 
	}
	else if (getRandomJokeWithTag['body'] == ''){
		answer = "Apparently, I'm not funny enough to have a joke about that :(";
		waitTime = 5000;
		question = "Please try another topic! Hopefully I don't disappoint twice.";
	}
	else{
		answer = getRandomJokeWithTag['body'];
		waitTime = 5000;
		question = "What do you want to hear a joke about next?"; // load next question
  	}
}
 else {
    answer = "I know I'm funny but you really need to get a life. Bye!" ; // output response
    waitTime = 0;
    question = '';
  }


  /// We take the changed data and distribute it across the required objects.
  socket.emit('answer', answer);
  setTimeout(timedQuestion, waitTime, socket, question);
  return (questionNum + 1);
}

function timedQuestion(socket, question) {
  if (question != '') {
    socket.emit('question', question);
  } else {
    //console.log('No Question send!');
  }

}
//----------------------------------------------------------------------------//
