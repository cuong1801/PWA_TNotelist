firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
     
      var user = firebase.auth().currentUser;
  
      if(user != null){
          window.location.assign("main.html");
          var idUser=user.uid;
          db.collection('users').doc(idUser).onec('value').then(function(snapshot){
            if(snapshot.val()){}
            else{ $('#userProfileModal').modal('show');}
          });
      }
  
    } else {
      // No user is signed in.
  
      //document.getElementById("user_div").style.display = "none";
      //document.getElementById("loginModal").style.display = "block";
  
    }
  });