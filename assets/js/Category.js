var category_Name = document.getElementById("category_Name");
var insert = document.getElementById('insert');
var update = document.getElementById('update');
var remove = document.getElementById('remove');
var n = 0;
var d;
  
function addnewcategory (){
  
    var firebaseRef = firebase.database().ref("category");
    var rootRef = firebase.database().ref().child("category");
    var categoryText = category_Name.value;

    var categoryTextvalue = categoryText.trim();
    rootRef.once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        if (categoryTextvalue === childData ) {
          alert('It already exists!!!!!');
          return d = true;
        } 
     
      });
    });
   
      if (categoryTextvalue.length === 0 || d==true) {
          alert('Please enter the category!!!!!');
          return false;
      } 
      else {
        // firebaseRef.child(+n++).set(categoryTextvalue);
        // firebaseRef.push().child(n++).set(categoryTextvalue);
        firebaseRef.push().set(categoryTextvalue);
        alert("Happy");
        location.reload();
      }
    }

$(document).ready(function(){
    var rootRef = firebase.database().ref().child("category");
   
    rootRef.on("child_added", snap=>{
        // var category_Name=snap.child("n++").val();
        // alert(snap.val());
        $("#categoryList").append(    '<li><table><tr><td><a href="#">'+snap.val()+'</a></td><td></td><td><i class="material-icons button edit">edit</i><i onclick="deleteCategory()" class="material-icons button delete">delete</i></td></tr></table></li>');
    })
    })
 
function deleteCategory(){
  alert("Bạn chắc bắn muốn xóa ???");
  var firebaseRef = firebase.database().ref("category");
  var rootRef = firebase.database().ref().child("category");
  rootRef.once('value', function(snapshot) {
    // snapshot.forEach(function(childSnapshot) {
    //   var childKey = childSnapshot.key;
    //   var childData = childSnapshot.val();
      if (snapshot.val() === null ) {
        alert('It already exists!!!!!');
  
      } 
      else{
        rootRef.remove();
        location.reload();
      }
   
    });
  // });
}
   
  