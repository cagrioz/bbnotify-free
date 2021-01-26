chrome.storage.local.set({ notifications: null });

// Firebase config
const firebaseConfig = {
    apiKey: 'AIzaSyC1CVMwbV6GKPKWS3OqKHDQRo4UlKx48c8',
    authDomain: 'bbcollab-auto.firebaseapp.com',
    projectId: 'bbcollab-auto',
    databaseURL: 'https://bbcollab-auto-default-rtdb.firebaseio.com/',
    storageBucket: 'bbcollab-auto.appspot.com',
    messagingSenderId: '584618097637',
    appId: '1:584618097637:web:5d910fad549172c9440d0c',
    measurementId: 'G-YBGFW5RF6V',
};

firebase.initializeApp(firebaseConfig);

// Db init
let db = firebase.database();
// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());

const uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            chrome.runtime.sendMessage({ message: 'sign_in' }, function (response) {

                if (response.message === 'success') {
                    console.log(JSON.stringify(authResult, null, 4));
                    console.log(authResult);
                    window.location.replace('./main.html');
                }

                firebase
                    .database()
                    .ref('users/' + authResult.user.uid)
                    .set({
                        username: authResult.user.displayName,
                        email: authResult.user.email,
                    });
            });

            return false;
            
        },
    },
    signInFlow: 'popup',
    // signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            customParameters: {
                prompt: 'select_account',
            },
        },
    ],
    // Terms of service url.
    // tosUrl: '<your-tos-url>',
    // Privacy policy url.
    // privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start('.sign_in_options', uiConfig);
