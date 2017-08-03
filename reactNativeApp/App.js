import React from 'react';
import { StyleSheet, Text, View, Button, AppRegistry, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';

// import Map from './components/Map';
// import Basic from './components/Basic';
// import Modals from './components/Modal';
import RegisterScreen from './components/RegisterScreen';
import LogScreen from './components/LogScreen';
import ProtectedView from './components/ProtectedView';

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
          <TouchableOpacity onPress={() => navigate('Register')}>
            <Text>Go to register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('Log')}>
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
    Log: {
        screen: LogScreen,
    },
    Register: {
        screen: RegisterScreen,
    },
    Protected: {
        screen: ProtectedView,
    },
}, { initialRouteName: 'App' });

export default myApp;
