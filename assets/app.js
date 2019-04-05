//Firebase
var config = {
    apiKey: "AIzaSyBhokVq9nucX6DgJGDE2ukOKfmWB2tgQBk",
    authDomain: "trainscheduler-9ad27.firebaseapp.com",
    databaseURL: "https://trainscheduler-9ad27.firebaseio.com",
    projectId: "trainscheduler-9ad27",
    storageBucket: "trainscheduler-9ad27.appspot.com",
    messagingSenderId: "124319332734"
};
  firebase.initializeApp(config);
  var database = firebase.database()  
  
  $("#add-train-btn").on("click", function(event){
      event.preventDefault();
      
      //grabbing user input
var trainName = $("#train-name-input").val().trim()
var destination = $("#destination-input").val().trim()
var firstTrain= $("#start-input").val().trim()
var arrival = $("#frequency").val().trim()
console.log("this is name of train "+ trainName)

// Creates local "temp" object for holding train data (robot voice)
var newTrain = {
    name: trainName,
    destinations: destination,
    departure: firstTrain,
    freqency: arrival
};
//uploads train data to database
database.ref().push(newTrain);

// logs everything to console
console.log(newTrain.name +" last to log")
//console.log(newTrain.destinations)
//console.log(newTrain.departure)
//console.log(newTrain.freqency)

alert("Thomas minion added");

//clears all the text-boxes
$("#train-name-input").val("")
$("#destination-input").val("")
$("#start-input").val("")
$("#frequency").val("")
});

// create firebase event for adding train to the database and row in the html
database.ref().on("child_added", function(childSnapshot){
console.log(childSnapshot.val());

// Store everything into variable.
var trainName = childSnapshot.val().name
var destination = childSnapshot.val().destinations
var firstTrain = childSnapshot.val().departure
var arrival = childSnapshot.val().freqency

// Train Info
console.log(trainName+ "after database name intel")
console.log(destination)
console.log(firstTrain)
console.log(arrival)

// var trainTime = moment().diff(moment())
var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(firstTrain),
    $("<td>").text(arrival),
    // $("<td>").text("minAway"),


);
$("#train-table > tbody").append(newRow);


});
