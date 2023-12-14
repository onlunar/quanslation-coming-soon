// Initialize Firebase
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

var config = {
    apiKey: "AIzaSyAOsxAmHWqZIoLP6pTYP-ATVmivcl9mAJU",
    authDomain: "quanslation-coming-soon.firebaseapp.com",
    projectId: "quanslation-coming-soon",
    storageBucket: "quanslation-coming-soon.appspot.com",
    messagingSenderId: "882355767915",
    appId: "1:882355767915:web:975fef7931c9724471bf2e",
    measurementId: "G-3ELVVVE122"
};
firebase.initializeApp(config);
var db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
});

var recaptchaEmail;

function recaptchaCallback(){
    db.collection('Emails').get().then(function (qs) {
        qs.forEach(function (element) {
            if (element.data()['ID'] == email) {
                is_present = true;
            }
        });

        if (is_present == false) {
            db.collection("Emails").add({
                'ID': email,
            })
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                    $("#notifs-form-btn").text("Notified!");
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        }
    });
}

$(document).ready(function () {

    $('#notifs-form-btn').click(function (e) {
        var is_present = false;
        email = $('#notifs-form-input').val();
        if (validateEmail(email)) {
            recaptchaEmail = grecaptcha.render('notifs-form', {
                'sitekey': '6Lf9EDEpAAAAABUpOB-cg9ciC4UBdiDGkhJSTSe9',
                'theme': 'dark',
                'callback': recaptchaCallback,
            });

        }
        else {
            alert('Invalid Email');
        }
    });

});