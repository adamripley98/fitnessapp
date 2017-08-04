import {
  ActivityIndicator,
  AsyncStorage,
  TouchableHighlight,
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import firebase from 'firebase';
import { firebaseApp } from '../../firebase';

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 80,
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
    blueButton: {
        backgroundColor: '#34AADC',
    },
    centering: {
        flex: 1,
        paddingTop: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

class ProtectedView extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            name: '',
        };
    }
    componentDidMount() {
        const { navigate } = this.props.navigation;
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                navigate('Log');
            } else {
                this.setState({ name: user.displayName });
                console.log('this is user', user);
            }
        });
    }

    logout = (navigate) => {
        firebase.auth().signOut().then(() => {
        // Sign-out successful.
            // navigate('Log');
        }).catch((error) => {
        // An error happened.
            alert(error.message);
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
          <View style={styles.container}>
            {
              <Text style={styles.centering}>hey there {this.state.name} :P</Text>
            }
            <TouchableHighlight onPress={() => this.logout(navigate)}>
              <Text style={[styles.button, styles.greenButton]}>Log out</Text>
            </TouchableHighlight>
          </View>
        );
    }
  }

module.exports = ProtectedView;
