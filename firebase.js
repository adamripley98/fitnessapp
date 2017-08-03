
import * as firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyCrLkkPpgWhL_j1cnUhDnkcwos5U9strUE',
    authDomain: 'fitnessapp-8041a.firebaseapp.com',
    databaseURL: 'https://fitnessapp-8041a.firebaseio.com',
};

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;
