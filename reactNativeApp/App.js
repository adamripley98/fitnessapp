import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeV2 from './components/HomeV2';

export default class App extends React.Component {
    render() {
        return (
          <View style={styles.container}>
            <HomeV2 />
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
