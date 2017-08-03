import {
  AsyncStorage,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Text,
} from 'react-native';
import React from 'react';

const t = require('tcomb-form-native');

const Form = t.form.Form

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

class LogScreen extends React.Component {

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
    _handleAdd = (navigate) => {
        const value = this.refs.form.getValue();
        // If the form is valid...
        if (value) {
            const data = {
                username: value.email,
                password: value.password,
            };
          // Serialize and post the data
            const json = JSON.stringify(data);
            fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: json,
            })
            .then(response => response.json())
            .then((res) => {
                console.log('this is res', res);
                if (res.error) {
                    alert(res.error);
                } else {
                    console.log('res.token', res.token);
                    AsyncStorage.setItem('jwt', res.token);
                  // Redirect to home screen
                    // this.props.navigator.pop();
                    navigate('Protected');
                }
            })
            .catch((err) => {
                console.log('error logging in', err);
                // alert('There was an error logging in.');
            })
            .done();
        } else {
            // Form validation error
            alert('Please fix the errors listed and try again.');
        }
    }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <Form
          ref='form'
          options={options}
          type={User}
          value={this.state.value}
          onChange={this._onChange}
        />
        <TouchableHighlight onPress={() => this._handleAdd(navigate)}>
          <Text style={[styles.button, styles.greenButton]}>Log In</Text>
        </TouchableHighlight>
      </ScrollView>
    )
  }
};

var styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    flexDirection: 'column'
  },
  button: {
    borderRadius: 4,
    padding: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff'
  },
  greenButton: {
    backgroundColor: '#4CD964'
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

module.exports = LogScreen;
