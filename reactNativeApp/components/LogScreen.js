import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import firebase from 'firebase';
import { firebaseApp } from '../../firebase';

const { width, height } = Dimensions.get('window');

const background = require('./logos/bkg.jpg');
const mark = require('./logos/weight.png');
const lockIcon = require('./logos/loginlock.png');
const personIcon = require('./logos/loginperson.png');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    markWrap: {
        flex: 1,
        paddingVertical: 30,
    },
    mark: {
        width: null,
        height: null,
        flex: 1,
    },
    background: {
        width,
        height,
    },
    wrapper: {
        paddingVertical: 30,
    },
    inputWrap: {
        flexDirection: 'row',
        marginVertical: 10,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
    },
    iconWrap: {
        paddingHorizontal: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        height: 20,
        width: 20,
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#f47142',
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
    },
    forgotPasswordText: {
        color: '#D8D8D8',
        backgroundColor: 'transparent',
        textAlign: 'right',
        paddingRight: 15,
    },
    signupWrap: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    accountText: {
        color: '#D8D8D8',
    },
    signupLinkText: {
        color: '#FFF',
        marginLeft: 5,
    },
});


export default class LogScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
        header: null,
    };
    constructor(props) {
      // firebase.auth().signOut();

        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.inputs = {};
    }

    // GOES AFTER if(user)
    // const userRef = firebase.database().ref(`/users/${usr.uid}`);
    // userRef.on('value', (snapshot) => {
    //     console.log('snapshot inside log', snapshot.val());
    //     this.setState({ isTrainer: snapshot.val().isTrainer || 'idk yet' });
    //     if (snapshot.val().isTrainer === true) {
    //         navigate('TrainerProfile');
    //     } else if (snapshot.val().isTrainer === false) {
    //         navigate('UserProfile');
    //     } else {
    //         console.log('SOMETHING WEIRD IS HAPPENING');
    //     }
    // });
    // const userRef = firebase.database().ref(`/users/${usr.uid}`);
    // userRef.on('value', (snapshot) => {
    //     if (snapshot.val().isTrainer) {
    //         this.setState({
    //             isTrainer: snapshot.val().isTrainer,
    //         });
    //         navigate('HomeV3', { isTrain: this.state.isTrainer });
    //     }
    // });
    componentDidMount() {
        const { navigate } = this.props.navigation;
        firebase.auth().onAuthStateChanged((usr) => {
            if (usr) {
                navigate('HomeV3');
            }
        });
    }

    componentWillUnmount() {
        this.setState = {
            email: '',
            password: null,
        };
    }

    login(navigate) {
        let noErr = true;
        firebase.auth().signInWithEmailAndPassword(this.state.email,
      this.state.password).catch((error) => {
          if (error) {
              noErr = false;
              alert(error.message);
          }
      })
      .then(() => {
          if (noErr) {
              console.log('logging in');
              navigate('Messenger');
          }
      });
    }

    reg = (navigate) => {
        navigate('Register');
    }

    // if user forgot password, will send email reset
    forgot() {
        firebase.auth().sendPasswordResetEmail(this.state.email).then(() => {
            console.log('email sent');
        }).catch((error) => {
            alert('There was an error sending the email');
            console.log('error:', error);
        });
        console.log('forgot password!');
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
          <View style={styles.container}>
            <Image source={background} style={styles.background} resizeMode="cover">
              <View style={styles.markWrap}>
                <Image source={mark} style={styles.mark} resizeMode="contain" />
              </View>
              <View style={styles.wrapper}>
                <KeyboardAwareScrollView>
                <View style={styles.inputWrap}>
                  <View style={styles.iconWrap}>
                    <Image source={personIcon} style={styles.icon} resizeMode="contain" />
                  </View>
                  <TextInput
                    placeholder="Email Address"
                    placeholderTextColor="#FFF"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    onChangeText={usr => this.setState({ email: usr })}
                  />
                </View>
                <View style={styles.inputWrap}>
                  <View style={styles.iconWrap}>
                    <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
                  </View>
                  <TextInput
                    placeholderTextColor="#FFF"
                    placeholder="Password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    onChangeText={psw => this.setState({ password: psw })}
                    secureTextEntry
                  />
                </View>
                <TouchableOpacity activeOpacity={0.5}>
                  <View>
                    <Text
                      style={styles.forgotPasswordText}
                      onPress={() => this.forgot()}
                    >Forgot Password?</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5}>
                  <View style={styles.button}>
                    <Text
                      style={styles.buttonText}
                      onPress={() => this.login(navigate)}
                    >Sign In</Text>
                  </View>
                </TouchableOpacity>
              </KeyboardAwareScrollView>
              </View>
              <View style={styles.container}>
                <View style={styles.signupWrap}>
                  <Text style={styles.accountText}>Dont have an account?</Text>
                  <TouchableOpacity activeOpacity={0.5}>
                    <View>
                      <Text
                        style={styles.signupLinkText}
                        onPress={() => this.reg(navigate)}
                      >Sign Up</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </Image>
          </View>
        );
    }
  }
