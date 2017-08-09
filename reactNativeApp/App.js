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

import { firebaseApp } from '../firebase';

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
            <LogScreen />
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
}, { initialRouteName: 'Log' });

export default myApp;
