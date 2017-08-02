import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class Login extends React.Component {
    static navigationOptions = {
        title: 'Login',
    };
    render() {
        return (
          <View style={styles.container}>
        <Text style={styles.textBig}>Login</Text>

        <TextInput
          style={{height: 40, textAlign: 'center'}}
          placeholder="Username"
          // onChangeText={(text) => this.setState({username: text})}
        />
        <TextInput
          secureTextEntry={true}
          style={{height: 40, textAlign: 'center'}}
          placeholder="Password"
          // onChangeText={(text) => this.setState({password: text})}
        />
        <TouchableOpacity onPress={ () => {console.log('login');} } style={[styles.button, styles.buttonGreen]}>
          <Text style={styles.buttonLabel}>Tap to Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {console.log('register');} }>
          <Text style={styles.buttonLabel}>Tap to Register</Text>
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
