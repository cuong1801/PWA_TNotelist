//firebase.auth.Auth.Persistence.LOCAL;


function login() {
    $("#login_Error").hide();
    var email = document.getElementById("email_field").value;
    var password = document.getElementById("password_field").value;
    if (email != "" && password != "") {
        document.getElementById("loading_login").style.display = "block";
        $("#loading_login").show();

        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            $("#loading_login").hide();
            $("#login_Error").show().text(errorMessage);
        });
    } else {
        $("#login_Error").show().text("Form is incomplete, please fill out all fields.");
    }
}

function register() {
    $("#signUp_Error").hide();
    var email = $("#emailSignUp").val();
    var password = $("#passwordSignUp").val();
    var passwordC = $("#password_confirmationSignUp").val();

    if (email != "" && password != "" && passwordC != "") {
        if (password == passwordC) {
            document.getElementById("loading_SignUp").style.display = "block";
            $("#loading_SignUp").show();
            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                $("#signUp_Error").show().text(errorMessage);
                $("#loading_SignUp").hide();
            });
        } else {
            $("#signUp_Error").show().text("Your password and confirmation password do not match.");
        }
    } else {
        $("#signUp_Error").show().text("Form is incomplete, please fill out all fields.");
    }

}


function logout() {
    firebase.auth().signOut().then(function() {
        window.location.assign("index.html");
    }).catch(function(error) {
        window.alert(error.message)
    });

}

function signinFB() {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday,email');
    firebase.auth().useDeviceLanguage();

    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        document.querySelector("#sign-out").style.display = "block";
        console.log(user);
        var user = result.user;
        console.log(user.email);
        var userImage = document.querySelector("#user-image");

        // appending the user profile image

        var userPic = document.createElement("img");
        userPic.src = user.photoURL;
        userImage.append(userPic);

        // appending the user email address

        //var userEmail = document.querySelector("#user-email");
        //userEmail.innerHTML = user.email;

        // ...
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        alert(errorMessage)
            // ...
    });
}

function signinGG() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().useDeviceLanguage();

    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.

        var user = result.user;
        // ...
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        alert(errorMessage);
    });

}