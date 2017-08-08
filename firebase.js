
import * as firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyCrLkkPpgWhL_j1cnUhDnkcwos5U9strUE',
    authDomain: 'fitnessapp-8041a.firebaseapp.com',
    databaseURL: 'https://fitnessapp-8041a.firebaseio.com',
    projectId: 'fitnessapp-8041a',
    storageBucket: 'fitnessapp-8041a.appspot.com',
    messagingSenderId: '520076419823',
};

const firebaseApp = firebase.initializeApp(config);
const database = firebase.database();

// export default firebaseApp;
module.exports = {
    firebaseApp,
    database,
};
