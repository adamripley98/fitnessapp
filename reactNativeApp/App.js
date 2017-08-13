import React from 'react';
import { StyleSheet, Text, View, Button, AppRegistry, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';

// import Map from './components/Map';
// import Basic from './components/Basic';
// import Modals from './components/Modal';
import RegisterScreen from './components/RegisterScreen';
import LogScreen from './components/LogScreen';
import UserProfileScreen from './components/UserProfileScreen';
import EditUserProfileScreen from './components/EditUserProfileScreen';
import MessagesScreen from './components/MessagesScreen';
import PaymentScreen from './components/PaymentScreen';
import RateTrainerScreen from './components/RateTrainerScreen';
import TimerScreen from './components/TimerScreen';

import { firebaseApp } from '../firebase';

// JEFFREY'S THING
// import { StyleSheet, Text, View } from 'react-native';
import HomeV2 from './components/HomeV2';
import HomeV3 from './components/HomeV3';

//
// export default class App extends React.Component {
//     render() {
//         return (
//           <View style={styles.container}>
//             <HomeV2 />
//           </View>
//         );
//     }
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

class App extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
        header: null,
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
          <View style={styles.container}>
            <HomeV2 />
          </View>
        );
    }
}

const myApp = StackNavigator({
    App: {
        screen: App,
    },
    Log: {
        screen: LogScreen,
    },
    Register: {
        screen: RegisterScreen,
    },
    UserProfile: {
        screen: UserProfileScreen,
    },
    EditUserProfile: {
        screen: EditUserProfileScreen,
    },
    Messages: {
        screen: MessagesScreen,
    },
    Payment: {
        screen: PaymentScreen,
    },
    Rating: {
        screen: RateTrainerScreen,
    },
    Timer: {
        screen: TimerScreen,
    },
    HomeV2: {
        screen: HomeV2,
    },
    HomeV3: {
        screen: HomeV3,
    },
}, { initialRouteName: 'Log' });

export default myApp;
