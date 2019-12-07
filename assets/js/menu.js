// var firebaseConfig = {
//     apiKey: "AIzaSyD17r7mphJ8Vh_rXYHG8WAHgnTfCa2RgaE",
//     authDomain: "t-notelist.firebaseapp.com",
//     databaseURL: "https://t-notelist.firebaseio.com",
//     storageBucket: "t-notelist.appspot.com",
//   };
//   firebase.initializeApp(firebaseConfig);

//   var storage = firebase.storage();
var temp="";
$(document).ready(function(){
    $(".menu-button").click(function(){
    $(".menu-bar").toggleClass( "open" );
    })
    })
    // In your Javascript (external .js resource or <script> tag)
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
         
          var user = firebase.auth().currentUser;
      
          if(user != null){
            
              var idUser=firebase.auth().currentUser.uid;
                db.collection('category').onSnapshot(snapshot => {
                    snapshot.docChanges().forEach(change => {
                        if(change.type === 'added'&&change.doc.data().userID===idUser){
                        $("#ListNotes_category").append('<option>'+change.doc.data().category+'</option>');
                        $("#ListNotes_category1").append('<option ">'+change.doc.data().category+'</option>');
                        }
                    });
                });
            } 
        }
    });
  

var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');
//listen for file selection
fileButton.addEventListener('change', function(e){
    //get file
    var file = e.target.files[0];
    //create a storage ref
    
    var storageRef = firebase.storage().ref('/NoteImage/' +file.name);
    //upload file
    var task =storageRef.put(file);
    temp = file.name;
    alert(temp);
    // upload progress bar
    task.on('state_changed',
        function progress(snapshot){
            var percentage = (snapshot.bytedTransferred/snapshot.totalByles)*100;
            // uploader.value = percentage;
        },
        function error(err){

        },
        function complete(){

        }
    );
});