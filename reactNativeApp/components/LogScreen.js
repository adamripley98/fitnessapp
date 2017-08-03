import {
  AsyncStorage,
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

const User = t.struct({
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

class LogScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
        header: null,
    };
    constructor(props) {
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

    _onChange = (value) => {
        this.setState({
            value,
        });
    }

    login(navigate) {
        let noErr = true;
        firebase.auth().signInWithEmailAndPassword(this.state.value.email,
      this.state.value.password).catch((error) => {
          if (error) {
              noErr = false;
              alert(error.message);
          }
      })
      .then(() => {
          if (noErr) {
              navigate('Protected');
          }
      });
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
          <ScrollView style={styles.container}>
            <Form
              ref="form"
              options={options}
              type={User}
              value={this.state.value}
              onChange={this._onChange}
            />
            <TouchableHighlight onPress={() => this.login(navigate)}>
              <Text style={[styles.button, styles.greenButton]}>Log In</Text>
            </TouchableHighlight>
          </ScrollView>
        );
    }
  }

module.exports = LogScreen;
