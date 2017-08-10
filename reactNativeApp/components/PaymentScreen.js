import {
  ActivityIndicator,
  AsyncStorage,
  TouchableOpacity,
  Component,
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Platform,
  NativeModules,
} from 'react-native';
import React from 'react';
import firebase from 'firebase';
import Expo from 'expo';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    banner: {
        width,
        height: 30,
        margin: 7,
        paddingTop: 10,
        backgroundColor: '#656964',
    },
    container: {
        marginTop: 40,
        padding: 10,
        flex: 1,
        flexDirection: 'column',
    },
    background: {
        width,
        height,
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    markWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderWidth: 5,
        borderRadius: 10,
    },
    mark: {
        width: 140,
        height: 140,
        // flex: 1,
        borderWidth: 4,
        borderRadius: 70,
    },
});

class PaymentScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            userId: '',
        };
    }

    componentWillMount() {
        const { navigate } = this.props.navigation;
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                navigate('Log');
            } else {
                this.setState({
                    name: user.displayName,
                    userId: user.uid,
                });
            }
        });
    }


    pay = () => {
        console.log('will do stripe stuff here')
    }

    render() {
        let authFunction;

        if (Platform.OS === 'android') {
            authFunction = async () => {
                this.setState({ waiting: true });
                try {
                    const result = await NativeModules.ExponentFingerprint.authenticateAsync();
                    if (result.success) {
                        alert('Authenticated!');
                    } else {
                        alert('Failed to authenticate');
                    }
                } finally {
                    this.setState({ waiting: false });
                }
            };
        } else if (Platform.OS === 'ios') {
            authFunction = async () => {
                const result = await NativeModules.ExponentFingerprint.authenticateAsync(
                  'Confirm payment',
                );
                if (result.success) {
                    this.pay()
                } else {
                    console.log('payment cancelled');
                }
            };
        }
        return (
          <View style={styles.container}>
            <Text style={styles.centering}>Time to pay your trainer, {this.state.name.split(' ')[0] || 'dood'}!</Text>
            <TouchableOpacity onPress={() => authFunction()}>
              <Text style={[styles.button, styles.greenButton]}>Make payment</Text>
            </TouchableOpacity>
          </View>
        );
    }
  }

module.exports = PaymentScreen;
