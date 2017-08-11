import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import RegisterScreen from './components/RegisterScreen';
import LogScreen from './components/LogScreen';
import UserProfileScreen from './components/UserProfileScreen';
import EditUserProfileScreen from './components/EditUserProfileScreen';
import MessagesScreen from './components/MessagesScreen';
import PaymentScreen from './components/PaymentScreen';
import RateTrainerScreen from './components/RateTrainerScreen';
import TimerScreen from './components/TimerScreen';
import TrainerProfileScreen from './components/TrainerProfileScreen';
import TrainerEditProfileScreen from './components/TrainerEditProfileScreen';
import TrainerCertificationScreen from './components/TrainerCertificationScreen';

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
    Rating: {
        screen: RateTrainerScreen,
    },
    Timer: {
        screen: TimerScreen,
    },
    TrainerProfile: {
        screen: TrainerProfileScreen,
    },
    TrainerEditProfile: {
        screen: TrainerEditProfileScreen,
    },
    TrainerCertification: {
        screen: TrainerCertificationScreen,
    },
}, { initialRouteName: 'Log' });

export default myApp;
