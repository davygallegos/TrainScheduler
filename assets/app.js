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
var frequency = $("#frequency").val().trim()
console.log("this is name of train "+ trainName)

// Creates local "temp" object for holding train data (robot voice)
var newTrain = {
    name: trainName,
    destinations: destination,
    departure: firstTrain,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP,
};
//uploads train data to database
database.ref().push(newTrain);

// logs everything to console
// console.log(newTrain.name +" last to log")
//console.log(newTrain.destinations)
//console.log(newTrain.departure)
//console.log(newTrain.frequency)

// alert("Thomas minion added");

//clears all the text-boxes
$("#train-name-input").val("")
$("#destination-input").val("")
$("#start-input").val("")
$("#frequency").val("")
});

// create firebase event for adding train to the database and row in the html
database.ref().on("child_added", function(childSnapshot){
// console.log(childSnapshot.val());

// Store everything into variable.
var trainName = childSnapshot.val().name
var destination = childSnapshot.val().destinations
var firstTrain = childSnapshot.val().departure
var frequency = childSnapshot.val().frequency
// var firstTimeCon = moment(childsnapshot.val().firstTrain, "HH:mm").subtract(1, "years")
// var timeDifferce = moment().diff(moment(firstTimeCon), "minutes")
// var minutesAway = frequency - (timeDifferce % frequency)
// var nextTrain = moment().add(minutesAway, "minutes") 

// Train Info
// console.log(trainName+ "after database name intel")
// console.log(destination)
// console.log(firstTrain)
// console.log(frequency)

// var trainTime = moment().diff(moment())

// from train example
// Assumptions
// var tFrequency = 3;

// // Time is 3:30 AM
        // var firstTime = "03:30";
    
        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);
       
        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
    
        // Time apart (remainder)
        var tRemainder = diffTime % frequency;
        console.log(tRemainder);
        
        // Minute Until Train
        var tMinutesTillTrain = frequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
        
        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
        
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            // $("<td>").text(firstTrain),//need to change to next train time (calculations moment),
            $("<td>").text(nextTrain.format("hh:mm A")),
            $("<td>").text(tMinutesTillTrain)
        
            // $("<td>").text("minAway"),


        );
        $("#train-table > tbody").append(newRow);
        console.log(moment().format("ddd, hA"))
});
