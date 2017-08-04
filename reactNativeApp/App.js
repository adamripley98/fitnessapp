import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login';
import Map from './components/Map';
import Basic from './components/Basic';
import Modals from './components/Modal';
import ModalBox from './components/ModalBox';

export default class App extends React.Component {
    render() {
        return (
          <View style={styles.container}>
            <ModalBox />
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
