import {
  Component,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Text,
} from 'react-native';
import React from 'react';
import firebase from 'firebase';
import { firebaseApp } from '../../firebase';

const t = require('tcomb-form-native');

const Form = t.form.Form;

const newUser = t.struct({
    email: t.String,
    password: t.String,
});

const options = {
    fields: {
        email: {
            autoCapitalize: 'none',
            autoCorrect: false,
        },
        password: {
            autoCapitalize: 'none',
            password: true,
            autoCorrect: false,
        },
    },
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        flexDirection: 'column',
    },
    button: {
        borderRadius: 4,
        padding: 20,
        textAlign: 'center',
        marginBottom: 20,
        color: '#fff',
    },
    greenButton: {
        backgroundColor: '#4CD964',
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

class Register extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
        header: null,
    };
    constructor(props) {
        // super(props);
        super(props);
        this.state = {
            value: {
                email: '',
                password: '',
            },
        };
    }
    componentWillUnmount() {
        this.setState = {
            value: {
                email: '',
                password: null,
            },
        };
    }

    register(navigate) {
        let noErr = true;
        firebase.auth().createUserWithEmailAndPassword(this.state.value.email,
        this.state.value.password).catch((error) => {
            noErr = false;
            alert(error.message);
            console.log('Error registering with firebase', error.code, error.message);
        })
        .then(() => {
          if (noErr) {
            navigate('Log');
          }
        });
    }

    _onChange = (value) => {
        this.setState({
            value,
        });
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
          <ScrollView style={styles.container}>
            <Form
              ref="form"
              type={newUser}
              options={options}
              value={this.state.value}
              onChange={this._onChange}
            />
            <TouchableHighlight onPress={() => this.register(navigate)}>
              <Text style={[styles.button, styles.greenButton]}>Create account</Text>
            </TouchableHighlight>
          </ScrollView>
        );
    }
}

module.exports = Register;
