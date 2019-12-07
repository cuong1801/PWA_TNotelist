firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
     
      var user = firebase.auth().currentUser;
  
      if(user != null){
        
          var idUser=firebase.auth().currentUser.uid;
          
          db.collection('users').doc(idUser).get().then(function(doc) {
            if (doc.exists) {
                console.log("Document user profile:", doc.data());
            } else {
                $('#userProfileModal').modal('show');
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        
      }
  
    } else {
        //window.location.assign("index.html");
      //document.getElementById("user_div").style.display = "none";
      //document.getElementById("loginModal").style.display = "block";
  
    }
  });