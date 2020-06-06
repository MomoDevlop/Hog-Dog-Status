// function 
// initialize firebase 

const Config = {
  apiKey: "AIzaSyDc8WO8g-PN9fVxvg5HRxEBk9X8blmpaCQ", 
  authDomain: "higdog-adcc6.firebaseapp.com",
  databaseURL: "https://higdog-adcc6.firebaseio.com",
  projectId: "higdog-adcc6",
  storageBucket: "higdog-adcc6.appspot.com",
  messagingSenderId: "841240974019",
  appId: "1:841240974019:web:1af3b05431df40a66e0876",
  measurementId: "G-F7F8LT90PJ"
};

firebase.initializeApp(Config); // Initialize firebase

let firestore = firebase.firestore(); 

const docRef = firestore.doc("samples/sandwichData"); // Create a link toward the database


const outputHeader= document.querySelector("#hotDogOutput"); // reference the header
const inputTextField = document.querySelector("#latestHotDogStatus"); // reference the inputtext

const saveButton = document.querySelector("#saveButton"); 

const loadButton = document.querySelector("#loadButton");

saveButton.addEventListener("click", function(){

  const TextToSave = inputTextField.value; // recuperate the value sent by the user
  console.log("I am going to save "+TextToSave+" to firebase"); //  a litte message 

  docRef.set({
         hotDogStatus: TextToSave

  }).then(function(){

  	console.log("Status saved!");
  }).catch(function(error){

  	console.log("Got an error : ", error );
  });

// Create a listener for the button 
  loadButton.addEventListener("click",function(){

   docRef.get().then(function(doc){

   	if (doc && doc.exists) {

   		const myData = doc.data(); // Recuparate the data  from firebase

   		outputHeader.innerText = "Hog dog status " + myData.hotDogStatus;
   	}


   }).catch(function(error){

   	console.log("Got a error", error)
   });

  });

  getRealtimeUpdates = function(){
      docRef.onSnapshot(function(doc){
      	if (doc && doc.exists) {

   		const myData = doc.data();

   		outputHeader.innerText = "Hog dog status " + myData.hotDogStatus;
   	}


      });

  }

  getRealtimeUpdates();

})










