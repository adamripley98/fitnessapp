import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login';
import Map from './components/Map';
import Basic from './components/Basic';
import Home from './components/Home';
import ModalBox from './components/ModalBox';

export default class App extends React.Component {
    render() {
        return (
          <View style={styles.container}>
            <Home />
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
