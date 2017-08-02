import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class UserRegister extends React.Component {
    static navigationOptions = {
        title: 'UserRegister',
    };
    render() {
        return (
        <View style={styles.container}>
          <Text style={styles.textBig}>Register</Text>
          <TextInput
            style={{height: 40, textAlign: 'center'}}
            placeholder="Enter your username"
            onChangeText={(text) => this.setState({username: text})}
          />
          <TextInput
            secureTextEntry={true}
            style={{height: 40, textAlign: 'center'}}
            placeholder="Enter a password"
            onChangeText={(text) => this.setState({password: text})}
          />
          <TouchableOpacity style={[styles.button, styles.buttonRed]} onPress={ () => {console.log('register');}}>
            <Text style={styles.buttonLabel}>Register</Text>
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
