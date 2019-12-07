// enable offline data
var storageRef = firebase.storage().ref();

db.enablePersistence()
    .catch(function(err) {
        if (err.code == 'failed-precondition') {
            // probably multible tabs open at once
            console.log('persistance failed');
        } else if (err.code == 'unimplemented') {
            // lack of browser support for the feature
            console.log('persistance not available');
        }
    });



window.onload = function() {
    var dem = 0;
    $('#listNotes').load('show_not.html');
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

            var user = firebase.auth().currentUser;

            if (user != null) {
                var idUser = firebase.auth().currentUser.uid;
                // var listcategory = document.getElementById("ListNotes_category").value;
                db.collection("notelist").orderBy("timepost", "desc").get().then(snapshot => {

                    snapshot.docs.forEach(doc => {
                        if (doc.data().userID == idUser) {
                            var des = doc.data().content;
                            var tit = doc.data().name;
                            var subTit = tit.slice(0, 30);
                            var subDes = des.slice(0, 30);
                            $("#name_notes").append(
                                '<a id="del' + doc.id + '" data-id="' + doc.id + '" class="card3 a "  >' +
                                '<div class="go-corner" >' +
                                '<div id="' + doc.id + '" class="go-arrow btn btn-outline-danger" onclick="deleteNote()">' +
                                'x' +
                                '</div>' +
                                '</div>' +
                                '<div  data-toggle="modal" data-target="#exampleModalScrollable' + doc.id + '">' +
                                '<div class="row">' +

                                '<div class="col-md-7">' +
                                '<h3 class="h3">' + subTit + '</h3>' +
                                '</div>' +
                                '<div class="col-md-5">' +
                                '<h4 id="' + doc.id + 'Linhcategory" class="h4" style="margin-top:20px;">' + doc.data().category + '</h4>' +
                                '</div>' +
                                '</div>' +
                                '<p class="p small ">Content:' + subDes + '</p>' +
                                '<div class="dimmer"> <h6 class="h6">' + doc.data().timepostShow + '</h6></div>' +

                                '<button type="button" class="btn btn-outline-success border border-warning" style="width:100px; margin:30px 88px"  >More</button>' +
                                '</div>' +

                                '</a>' +

                                '<div class="modal fade" id="exampleModalScrollable' + doc.id + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">' +
                                '<div class="modal-dialog modal-dialog-scrollable" role="document">' +
                                '<div class="modal-content">' +
                                '<div class="modal-header">' +
                                '<h1 id="' + doc.id + 'Linhname" class="modal-title">' + doc.data().name + '</h1>' +
                                '<small style="padding: 15px;"><em>' + doc.data().category + '</em></small>' +

                                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                                '<span aria-hidden="true">&times;</span>' +
                                '</button>' +
                                '</div>' +
                                '<div class="modal-body">' +
                                '<small><em>' + doc.data().timepostShow + '</em></small>' +
                                '<small ><em id="' + doc.id + 'Linhlocation"> ' + doc.data().location + '</em></small><br>' +
                                // '<pre>' + doc.data().content + '</pre>' +

                                '<textarea class="form-control" rows="7">' + doc.data().content + '</textarea>' +
                                '<img id="imgNote' + doc.data().name + '" style="width: 50% ; height: 50%; margin-left: 25%"></img>' +

                                '</div>' +
                                '<div class="modal-footer">' +
                                '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
                                '<button type="button" class="btn btn-primary" onclick="save(\'' + doc.id + '\')">Save</button>' +
                                '</div>' +
                                ' </div>' +
                                '</div>' +
                                '</div>'

                            );


                            var imgNote = document.getElementById("imgNote" + doc.data().name);
                            storageRef.child('NoteImage/' + doc.data().image + '').getDownloadURL().then(function(url) {
                                imgNote.src = url;
                            }).catch(function(error) {});
                        }
                    });

                });
            }
        }
    });
}

// function detailNote() {
//     // $('#detailNotes').load('detailNote.html');
//     var ref= firebase.database().ref()
//     firebase.database().ref().Push(newData);
//     var newKey = ref.Push().key();
// }
var category_selected = "";



function Category_select(category) {
    var options = category.children;
    for (var i = 0; i < options.length; i++) {
        if (options[i].selected) {
            category_selected = options[i].value;
            $('#listNotes').load('show_not.html');

            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {

                    var user = firebase.auth().currentUser;

                    if (user != null) {
                        var idUser = firebase.auth().currentUser.uid;
                        // var listcategory = document.getElementById("ListNotes_category").value;


                        db.collection("notelist").where('category', '==', category_selected).orderBy("timepost", "desc").get().then(snapshot => {
                            snapshot.docs.forEach(doc => {

                                if (doc.data().userID == idUser) {
                                    var des = doc.data().content;
                                    var tit = doc.data().name;
                                    var subTit = tit.slice(0, 30);
                                    var subDes = des.slice(0, 30);
                                    $("#name_notes").append(
                                        '<a id="del' + doc.id + '" data-id="' + doc.id + '" class="card3 a "  >' +
                                        '<div class="go-corner" >' +
                                        '<div id="' + doc.id + '" class="go-arrow btn btn-outline-danger" onclick="deleteNote()">' +
                                        'x' +
                                        '</div>' +
                                        '</div>' +
                                        '<div  data-toggle="modal" data-target="#exampleModalScrollable' + doc.id + '">' +
                                        '<div class="row">' +

                                        '<div class="col-md-7">' +
                                        '<h3 class="h3">' + subTit + '</h3>' +
                                        '</div>' +
                                        '<div class="col-md-5">' +
                                        '<h4 id="' + doc.id + 'Linhcategory" class="h4" style="margin-top:20px;">' + doc.data().category + '</h4>' +
                                        '</div>' +
                                        '</div>' +
                                        '<p class="p small ">Content:' + subDes + '</p>' +
                                        '<div class="dimmer"> <h6 class="h6">' + doc.data().timepostShow + '</h6></div>' +

                                        '<button type="button" class="btn btn-outline-success border border-warning" style="width:100px; margin:30px 88px"  >More</button>' +
                                        '</div>' +

                                        '</a>' +

                                        '<div class="modal fade" id="exampleModalScrollable' + doc.id + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">' +
                                        '<div class="modal-dialog modal-dialog-scrollable" role="document">' +
                                        '<div class="modal-content">' +
                                        '<div class="modal-header">' +
                                        '<h1 id="' + doc.id + 'Linhname" class="modal-title">' + doc.data().name + '</h1>' +
                                        '<small style="padding: 15px;"><em>' + doc.data().category + '</em></small>' +

                                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                                        '<span aria-hidden="true">&times;</span>' +
                                        '</button>' +
                                        '</div>' +
                                        '<div class="modal-body">' +
                                        '<small><em>' + doc.data().timepostShow + '</em></small>' +
                                        '<small ><em id="' + doc.id + 'Linhlocation"> ' + doc.data().location + '</em></small><br>' +
                                        // '<pre>' + doc.data().content + '</pre>' +

                                        '<textarea class="form-control" rows="7">' + doc.data().content + '</textarea>' +
                                        '<img id="imgNote' + doc.data().name + '" style="width: 50% ; height: 50%; margin-left: 25%"></img>' +

                                        '</div>' +
                                        '<div class="modal-footer">' +
                                        '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
                                        '<button type="button" class="btn btn-primary" onclick="save(\'' + doc.id + '\')">Save</button>' +
                                        '</div>' +
                                        ' </div>' +
                                        '</div>' +
                                        '</div>'


                                    );


                                    var imgNote = document.getElementById("imgNote" + doc.data().name);
                                    storageRef.child('NoteImage/' + doc.data().image + '').getDownloadURL().then(function(url) {
                                        imgNote.src = url;
                                    }).catch(function(error) {});
                                }
                            });
                        });
                    }
                }
            });
        }
    }
}
var NewNotes_name = document.getElementById("NewNotes_name");
var NewNotes_location = document.getElementById("location_Name");
var NewNotes_content = document.getElementById("NewNotes_content");
var category_Name = document.getElementById("category_Name");
var ListNotes_category = document.getElementById("ListNotes_category")

function addnewcategory() {
    var category_Name_text = category_Name.value;
    var category_Name_text_value = category_Name_text.trim();
    if (category_Name_text_value.length === 0 || category_Name_text_value.length > 15) {
        alert('Comments are required to continue!');
        return false;
    } else {
        var idUser = firebase.auth().currentUser.uid;
        db.collection("category").doc(document.getElementById("category_Name").value + idUser).set({
            category: document.getElementById("category_Name").value,
            userID: idUser
        })
        alert("Add to category");
    }
}

function deleteCategory() {
    var category_Name_text = category_Name.value;
    var category_Name_text_value = category_Name_text.trim();

    if (category_Name_text_value.length === 0 || category_Name_text_value.length > 150) {
        alert('Comments are required to continue!');

    } else {
        db.collection("category").doc(document.getElementById("category_Name").value + firebase.auth().currentUser.uid).delete();
    }
}

// function deleteCategoryInSelect() {
//   // var result = confirm("Do you want to continue?");
//   // if(result)  {
//   // alert("OK Next lesson!");
//   db.collection("category").doc(document.getElementById("ListNotes_category1").value + firebase.auth().currentUser.uid).delete();
//   // location.reload();
//   // } else {
//   // alert("Bye!");
//   // }

// }

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
document.getElementById('NewNotes_checkTime').onclick = function(e) {
    var check = false;
    if (this.checked) {
        document.getElementById('notification').style.display = 'block';
    } else {
        document.getElementById('notification').style.display = 'none';
    }

};

function save(id) {
    var today = new Date();
    var timepost;

    var DD = today.getDate();
    var MM = today.getMonth() + 1;
    var YYYY = today.getFullYear();

    var h = today.getHours();
    var m = today.getMinutes();
    DD = checkTime(DD);
    MM = checkTime(MM);
    YYYY = checkTime(YYYY);

    h = checkTime(h);
    m = checkTime(m);
    timepost = MM + "/" + DD + "/" + YYYY + " " + h + ":" + m;
    var Note_timepost = new Date(timepost);

    var name = document.getElementById(id + "Linhname").innerHTML;
    var category = document.getElementById(id + "Linhcategory").innerHTML;
    var location = document.getElementById(id + "Linhlocation").innerHTML;

    db.collection('notelist').doc(id).set({
        name: name,
        location: location,
        timepost: Note_timepost,
        timepostShow: timepost,
        content: document.getElementById(id + "Linhcontent").value,
        category: category,
        userID: firebase.auth().currentUser.uid,
        image: temp
    })

    // alert(name);
    // alert(location);

}

function writeNotesData() {
    var today = new Date();
    var timepost;

    var DD = today.getDate();
    var MM = today.getMonth() + 1;
    var YYYY = today.getFullYear();

    var h = today.getHours();
    var m = today.getMinutes();
    DD = checkTime(DD);
    MM = checkTime(MM);
    YYYY = checkTime(YYYY);

    h = checkTime(h);
    m = checkTime(m);
    timepost = MM + "/" + DD + "/" + YYYY + " " + h + ":" + m;
    var Note_timepost = new Date(timepost);
    //alert(Note_timepost);

    var NewNotes_name_text = NewNotes_name.value;
    var NewNotes_location_text = NewNotes_location.value;
    var NewNotes_name_text_value = NewNotes_name_text.trim();

    if (NewNotes_name_text_value.length === 0 || NewNotes_name_text_value.length > 20) {
        alert('Comments are required to continue!');
    } else {
        var n = 0;
        db.collection('notelist').add({
                name: document.getElementById("NewNotes_name").value,
                location: document.getElementById("location_Name").value,
                timepost: Note_timepost,
                timepostShow: timepost,
                // timenotification: document.getElementById("date_no").value,
                content: document.getElementById("NewNotes_content").value,
                category: document.getElementById("ListNotes_category1").value,
                userID: firebase.auth().currentUser.uid,
                image: temp

            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                alert(error);
                console.error("Error adding document: ", error);
            });
    }
    //window.location="index.html";
}

//listen for image profile selection
var tempProfile = "";
var userImg = document.getElementById('profile-image-upload');
userImg.addEventListener('change', function(e) {
    //get file
    var file = e.target.files[0];
    //create a storage ref

    var storageRef = firebase.storage().ref('/userImage/' + file.name);
    //upload file
    var task = storageRef.put(file);
    tempProfile = file.name;
    // upload progress bar
    task.on('state_changed',
        function progress(snapshot) {
            var percentage = (snapshot.bytedTransferred / snapshot.totalByles) * 100;
            // uploader.value = percentage;
        },
        function error(err) {
            alert(err);

        },
        function complete() {

        }
    );
});

function saveIn() {

    var idUser = firebase.auth().currentUser.uid;
    var firstName = document.getElementById("first_Name").value;
    var lastName = document.getElementById("last_Name").value;
    var nationality = document.getElementById("nationality").value;
    var timeZone = document.getElementById("DropDownTimezone").value;

    db.collection('users').doc(idUser).set({
        firstName: firstName,
        lastName: lastName,
        nationality: nationality,
        timeZone: timeZone,
        temp: tempProfile
    })
}
//delete note by select list
function deleteNote() {
    // event.stopPropagation();
    if (confirm('You want to delete note?')) {
        var id = event.target.id;
        db.collection('notelist').doc(id).delete();
        var hidden = 'del' + id;
        document.getElementById(hidden).style.display = 'none';
    } else {


    }


}
// let cross = document.createElement("deletenote");
// console.log(cross);


function EditNote() {
    console.log($('#load').load('show_not.html'));

}

function openProfile() {
    $('#userProfileModal').modal('show');
    var idUser = firebase.auth().currentUser.uid;
    var docRef = db.collection('users').doc(idUser);
    docRef.get().then(function(doc) {

        if (doc.exists) {
            console.log("Document user profile:", doc.data());
            $('#first_Name').val(doc.data().firstName);
            $('#last_Name').val(doc.data().lastName);
            $('#nationality').val(doc.data().nationality);
            $('#national').text(doc.data().nationality);
            $('#full_Name').text((doc.data().firstName) + " " + (doc.data().lastName));
            $('#DropDownTimezone').val(doc.data().timeZone);

            var imgProfile = document.getElementById("profile-image1");
            storageRef.child('userImage/' + doc.data().temp).getDownloadURL().then(function(url) {
                imgProfile.src = url;
            }).catch(function(error) {
                // Handle any errors
            });

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
        alert(error);
    });
}

function uploadImg() {
    $('#profile-image-upload').click();
}

function search() {
    $('#listNotes').load('show_not.html');
    var tim = document.getElementById("search").value;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

            var user = firebase.auth().currentUser;

            if (user != null) {
                var idUser = firebase.auth().currentUser.uid;
                // var listcategory = document.getElementById("ListNotes_category").value;
                db.collection("notelist").orderBy("timepost", "desc").get().then(snapshot => {
                    snapshot.docs.forEach(doc => {

                        if (doc.data().userID == idUser && doc.data().name == tim) {
                            var des = doc.data().content;
                            var tit = doc.data().name;
                            var subTit = tit.slice(0, 30);
                            var subDes = des.slice(0, 30);
                            $("#name_notes").append(
                                '<a id="del' + doc.id + '" data-id="' + doc.id + '" class="card3 a "  >' +
                                '<div class="go-corner" >' +
                                '<div id="' + doc.id + '" class="go-arrow btn btn-outline-danger" onclick="deleteNote()">' +
                                'x' +
                                '</div>' +
                                '</div>' +
                                '<div  data-toggle="modal" data-target="#exampleModalScrollable' + doc.id + '">' +
                                '<div class="row">' +

                                '<div class="col-md-7">' +
                                '<h3 class="h3">' + subTit + '</h3>' +
                                '</div>' +
                                '<div class="col-md-5">' +
                                '<h4 id="' + doc.id + 'Linhcategory" class="h4" style="margin-top:20px;">' + doc.data().category + '</h4>' +
                                '</div>' +
                                '</div>' +
                                '<p class="p small ">Content:' + subDes + '</p>' +
                                '<div class="dimmer"> <h6 class="h6">' + doc.data().timepostShow + '</h6></div>' +

                                '<button type="button" class="btn btn-outline-success border border-warning" style="width:100px; margin:30px 88px"  >More</button>' +
                                '</div>' +

                                '</a>' +

                                '<div class="modal fade" id="exampleModalScrollable' + doc.id + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">' +
                                '<div class="modal-dialog modal-dialog-scrollable" role="document">' +
                                '<div class="modal-content">' +
                                '<div class="modal-header">' +
                                '<h1 id="' + doc.id + 'Linhname" class="modal-title">' + doc.data().name + '</h1>' +
                                '<small style="padding: 15px;"><em>' + doc.data().category + '</em></small>' +

                                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                                '<span aria-hidden="true">&times;</span>' +
                                '</button>' +
                                '</div>' +
                                '<div class="modal-body">' +
                                '<small><em>' + doc.data().timepostShow + '</em></small>' +
                                '<small ><em id="' + doc.id + 'Linhlocation"> ' + doc.data().location + '</em></small><br>' +
                                // '<pre>' + doc.data().content + '</pre>' +

                                '<textarea class="form-control" rows="7">' + doc.data().content + '</textarea>' +
                                '<img id="imgNote' + doc.data().name + '" style="width: 50% ; height: 50%; margin-left: 25%"></img>' +

                                '</div>' +
                                '<div class="modal-footer">' +
                                '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
                                '<button type="button" class="btn btn-primary" onclick="save(\'' + doc.id + '\')">Save</button>' +
                                '</div>' +
                                ' </div>' +
                                '</div>' +
                                '</div>'


                            );


                            var imgNote = document.getElementById("imgNote" + doc.data().name);
                            storageRef.child('NoteImage/' + doc.data().image + '').getDownloadURL().then(function(url) {
                                imgNote.src = url;
                            }).catch(function(error) {});
                        } else if (doc.data().userID == idUser && document.getElementById("search").value == "" && category_selected == "") {
                            var des = doc.data().content;
                            var tit = doc.data().name;
                            var subTit = tit.slice(0, 30);
                            var subDes = des.slice(0, 30);
                            $("#name_notes").append(
                                '<a id="del' + doc.id + '" data-id="' + doc.id + '" class="card3 a "  >' +
                                '<div class="go-corner" >' +
                                '<div id="' + doc.id + '" class="go-arrow btn btn-outline-danger" onclick="deleteNote()">' +
                                'x' +
                                '</div>' +
                                '</div>' +
                                '<div  data-toggle="modal" data-target="#exampleModalScrollable' + doc.id + '">' +
                                '<div class="row">' +

                                '<div class="col-md-7">' +
                                '<h3 class="h3">' + subTit + '</h3>' +
                                '</div>' +
                                '<div class="col-md-5">' +
                                '<h4 id="' + doc.id + 'Linhcategory" class="h4" style="margin-top:20px;">' + doc.data().category + '</h4>' +
                                '</div>' +
                                '</div>' +
                                '<p class="p small ">Content:' + subDes + '</p>' +
                                '<div class="dimmer"> <h6 class="h6">' + doc.data().timepostShow + '</h6></div>' +

                                '<button type="button" class="btn btn-outline-success border border-warning" style="width:100px; margin:30px 88px"  >More</button>' +
                                '</div>' +

                                '</a>' +

                                '<div class="modal fade" id="exampleModalScrollable' + doc.id + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">' +
                                '<div class="modal-dialog modal-dialog-scrollable" role="document">' +
                                '<div class="modal-content">' +
                                '<div class="modal-header">' +
                                '<h1 id="' + doc.id + 'Linhname" class="modal-title">' + doc.data().name + '</h1>' +
                                '<small style="padding: 15px;"><em>' + doc.data().category + '</em></small>' +

                                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                                '<span aria-hidden="true">&times;</span>' +
                                '</button>' +
                                '</div>' +
                                '<div class="modal-body">' +
                                '<small><em>' + doc.data().timepostShow + '</em></small>' +
                                '<small ><em id="' + doc.id + 'Linhlocation"> ' + doc.data().location + '</em></small><br>' +
                                // '<pre>' + doc.data().content + '</pre>' +

                                '<textarea class="form-control" rows="7">' + doc.data().content + '</textarea>' +
                                '<img id="imgNote' + doc.data().name + '" style="width: 50% ; height: 50%; margin-left: 25%"></img>' +

                                '</div>' +
                                '<div class="modal-footer">' +
                                '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
                                '<button type="button" class="btn btn-primary" onclick="save(\'' + doc.id + '\')">Save</button>' +
                                '</div>' +
                                ' </div>' +
                                '</div>' +
                                '</div>'


                            );


                            var imgNote = document.getElementById("imgNote" + doc.data().name);
                            storageRef.child('NoteImage/' + doc.data().image + '').getDownloadURL().then(function(url) {
                                imgNote.src = url;
                            }).catch(function(error) {});
                        } else if (doc.data().userID == idUser && document.getElementById("search").value == "" && category_selected == doc.data().category) {
                            var des = doc.data().content;
                            var tit = doc.data().name;
                            var subTit = tit.slice(0, 30);
                            var subDes = des.slice(0, 30);
                            $("#name_notes").append(
                                '<a id="del' + doc.id + '" data-id="' + doc.id + '" class="card3 a "  >' +
                                '<div class="go-corner" >' +
                                '<div id="' + doc.id + '" class="go-arrow btn btn-outline-danger" onclick="deleteNote()">' +
                                'x' +
                                '</div>' +
                                '</div>' +
                                '<div  data-toggle="modal" data-target="#exampleModalScrollable' + doc.id + '">' +
                                '<div class="row">' +

                                '<div class="col-md-7">' +
                                '<h3 class="h3">' + subTit + '</h3>' +
                                '</div>' +
                                '<div class="col-md-5">' +
                                '<h4 id="' + doc.id + 'Linhcategory" class="h4" style="margin-top:20px;">' + doc.data().category + '</h4>' +
                                '</div>' +
                                '</div>' +
                                '<p class="p small ">Content:' + subDes + '</p>' +
                                '<div class="dimmer"> <h6 class="h6">' + doc.data().timepostShow + '</h6></div>' +

                                '<button type="button" class="btn btn-outline-success border border-warning" style="width:100px; margin:30px 88px"  >More</button>' +
                                '</div>' +

                                '</a>' +

                                '<div class="modal fade" id="exampleModalScrollable' + doc.id + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">' +
                                '<div class="modal-dialog modal-dialog-scrollable" role="document">' +
                                '<div class="modal-content">' +
                                '<div class="modal-header">' +
                                '<h1 id="' + doc.id + 'Linhname" class="modal-title">' + doc.data().name + '</h1>' +
                                '<small style="padding: 15px;"><em>' + doc.data().category + '</em></small>' +

                                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                                '<span aria-hidden="true">&times;</span>' +
                                '</button>' +
                                '</div>' +
                                '<div class="modal-body">' +
                                '<small><em>' + doc.data().timepostShow + '</em></small>' +
                                '<small ><em id="' + doc.id + 'Linhlocation"> ' + doc.data().location + '</em></small><br>' +
                                // '<pre>' + doc.data().content + '</pre>' +

                                '<textarea class="form-control" rows="7">' + doc.data().content + '</textarea>' +
                                '<img id="imgNote' + doc.data().name + '" style="width: 50% ; height: 50%; margin-left: 25%"></img>' +

                                '</div>' +
                                '<div class="modal-footer">' +
                                '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
                                '<button type="button" class="btn btn-primary" onclick="save(\'' + doc.id + '\')">Save</button>' +
                                '</div>' +
                                ' </div>' +
                                '</div>' +
                                '</div>'


                            );


                            var imgNote = document.getElementById("imgNote" + doc.data().name);
                            storageRef.child('NoteImage/' + doc.data().image + '').getDownloadURL().then(function(url) {
                                imgNote.src = url;
                            }).catch(function(error) {});
                        }
                    });
                });
            }
        }
    });
}