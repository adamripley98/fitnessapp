import React from 'react';
import { StyleSheet, Text, View, Button, AppRegistry, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/LoginScreen';
import TrainerRegisterScreen from './components/TrainerRegisterScreen';
import UserRegisterScreen from './components/UserRegisterScreen';


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
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
          <View style={styles.container}>
            <TouchableOpacity onPress={() => navigate('UserRegister')}>
              <Text>Go to register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('Login')}>
              <Text>Go to login</Text>
            </TouchableOpacity>
          </View>
        );
    }
}

const myApp = StackNavigator({
    App: {
        screen: App,
    },
    Welcome: {
        screen: WelcomeScreen,
    },
    Login: {
        screen: LoginScreen,
    },
    TrainerRegister: {
        screen: TrainerRegisterScreen,
    },
    UserRegister: {
        screen: UserRegisterScreen,
    },
}, { initialRouteName: 'App' });

AppRegistry.registerComponent('myApp', () => myApp);

export default myApp;
