import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';

class Welcome extends React.Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
          <View style={styles.container}>
            <TouchableOpacity onPress={ () =>  navigate('Login') }>
              <Text>Go to register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => {this.onLoginClick();} }>
              <Text>Go to login</Text>
            </TouchableOpacity>
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


export default Welcome;
