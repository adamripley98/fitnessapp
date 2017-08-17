import React from 'react';
import { StyleSheet, View, AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import RegisterScreen from './components/RegisterScreen';
import LogScreen from './components/LogScreen';
import UserProfileScreen from './components/UserProfileScreen';
import EditUserProfileScreen from './components/EditUserProfileScreen';
import Messenger from './components/Messenger';
import MessengerV2 from './components/MessengerV2';
import MessagesScreen from './components/MessagesScreen';
import MessagesScreenV2 from './components/MessagesScreenV2';
import PaymentScreen from './components/PaymentScreen';
import RateTrainerScreen from './components/RateTrainerScreen';
import TimerScreen from './components/TimerScreen';
import TrainerProfileScreen from './components/TrainerProfileScreen';
import TrainerProfileScreenV2 from './components/TrainerProfileScreenV2';
import TrainerEditProfileScreen from './components/TrainerEditProfileScreen';
import TrainerCertificationScreen from './components/TrainerCertificationScreen';
import MapScreen from './components/MapScreen';
import PaymentSettingsScreen from './components/PaymentSettingsScreen';
// JEFFREY'S THING
// import { StyleSheet, Text, View } from 'react-native';
import HomeV2 from './components/HomeV2';
import HomeV3 from './components/HomeV3';

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
            <HomeV3 />
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
    MessagesV2: {
        screen: MessagesScreenV2,
    },
    Payment: {
        screen: PaymentScreen,
    },
    Rating: {
        screen: RateTrainerScreen,
    },
    HomeV2: {
        screen: HomeV2,
    },
    HomeV3: {
        screen: HomeV3,
    },
    Timer: {
        screen: TimerScreen,
    },
    TrainerProfile: {
        screen: TrainerProfileScreen,
    },
    TrainerProfileV2: {
        screen: TrainerProfileScreenV2,
    },
    TrainerEditProfile: {
        screen: TrainerEditProfileScreen,
    },
    TrainerCertification: {
        screen: TrainerCertificationScreen,
    },
    Map: {
        screen: MapScreen,
    },
    PaymentSettings: {
        screen: PaymentSettingsScreen,
    },
    Messenger: {
        screen: Messenger,
    },
    MessengerV2: {
        screen: MessengerV2,
    },
    MessagesScreen: {
        screen: MessagesScreen,
    },
    MessagesScreenV2: {
        screen: MessagesScreenV2,
    },
}, { initialRouteName: 'HomeV3' });

export default myApp;
