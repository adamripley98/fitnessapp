import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Component,
} from 'react-native';
import firebase from 'firebase';
import { firebaseApp } from '../../firebase';

const background = require('./logos/bkg.jpg');
const personIcon = require('./logos/signup_person.png');
const lockIcon = require('./logos/signup_lock.png');
const emailIcon = require('./logos/signup_email.png');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bg: {
        paddingTop: 30,
        width: null,
        height: null,
    },
    headerContainer: {
        flex: 1,
    },
    inputsContainer: {
        flex: 3,
        marginTop: 50,
    },
    footerContainer: {
        flex: 1,
    },
    headerIconView: {
        marginLeft: 10,
        backgroundColor: 'transparent',
    },
    headerBackButtonView: {
        width: 25,
        height: 25,
    },
    backButtonIcon: {
        width: 25,
        height: 25,
    },
    headerTitleView: {
        backgroundColor: 'transparent',
        marginTop: 25,
        marginLeft: 25,
    },
    titleViewText: {
        fontSize: 40,
        color: '#fff',
    },
    inputs: {
        paddingVertical: 20,
    },
    inputContainer: {
        borderWidth: 1,
        borderBottomColor: '#CCC',
        borderColor: 'transparent',
        flexDirection: 'row',
        height: 75,
    },
    iconContainer: {
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputIcon: {
        width: 30,
        height: 30,
    },
    input: {
        flex: 1,
        fontSize: 20,
    },
    signup: {
        backgroundColor: '#f47142',
        paddingVertical: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    signin: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    greyFont: {
        color: '#D8D8D8',
    },
    whiteFont: {
        color: '#FFF',
    },
});

export default class RegisterScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        };
    }
    componentWillUnmount() {
        this.setState = {
            name: '',
            email: '',
            password: null,
            confirmPassword: '',
        };
    }

    login(navigate) {
        navigate('Log');
    }

    register(navigate) {
        let noErr = true;
        if (this.state.password === this.state.confirmPassword) {
            firebase.auth().createUserWithEmailAndPassword(this.state.email,
          this.state.password).catch((error) => {
              noErr = false;
              alert(error.message);
              console.log('Error registering with firebase', error.code, error.message);
          })
          .then(() => {
              if (noErr) {
                  const curUser = firebase.auth().currentUser;
                  curUser.updateProfile({
                      displayName: this.state.name,
                      photoURL: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
                  }).then(() => {
                    // update successful
                      console.log('curUser', curUser);
                      firebase.database().ref('/users/' + curUser.uid).set({
                          fullName: this.state.name,
                          age: '99',
                          bio: `Hi! My name is ${this.state.name.split(' ')[0]}, and I'm looking to get more fit!`,
                      });
                      return 'done';
                  }).then(() => {
                      navigate('Log');
                  }).catch((e) => {
                      alert('error');
                      console.log('err', e);
                  });
              }
          });
        } else {
            alert('Passwords must match');
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
          <View style={styles.container}>
            <Image
              source={background}
              style={[styles.container, styles.bg]}
              resizeMode="cover"
            >
              <View style={styles.headerContainer}>

                <View style={styles.headerTitleView}>
                  <Text style={styles.titleViewText}>Sign Up</Text>
                </View>

              </View>

              <View style={styles.inputsContainer}>

                <View style={styles.inputContainer}>
                  <View style={styles.iconContainer}>
                    <Image
                      source={personIcon}
                      style={styles.inputIcon}
                      resizeMode="contain"
                    />
                  </View>
                  <TextInput
                    style={[styles.input, styles.whiteFont]}
                    placeholder="Name"
                    placeholderTextColor="#FFF"
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={name => this.setState({ name })}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.iconContainer}>
                    <Image
                      source={emailIcon}
                      style={styles.inputIcon}
                      resizeMode="contain"
                    />
                  </View>
                  <TextInput
                    style={[styles.input, styles.whiteFont]}
                    placeholder="Email"
                    placeholderTextColor="#FFF"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={email => this.setState({ email })}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.iconContainer}>
                    <Image
                      source={lockIcon}
                      style={styles.inputIcon}
                      resizeMode="contain"
                    />
                  </View>
                  <TextInput
                    secureTextEntry={true}
                    style={[styles.input, styles.whiteFont]}
                    placeholder="Password"
                    placeholderTextColor="#FFF"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={psw => this.setState({ password: psw })}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.iconContainer}>
                    <Image
                      source={lockIcon}
                      style={styles.inputIcon}
                      resizeMode="contain"
                    />
                  </View>
                  <TextInput
                    secureTextEntry={true}
                    style={[styles.input, styles.whiteFont]}
                    placeholder="Confirm Password"
                    placeholderTextColor="#FFF"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={psw => this.setState({ confirmPassword: psw })}
                  />
                </View>

              </View>

              <View style={styles.footerContainer}>

                <TouchableOpacity
                  onPress={() => this.register(navigate)}
                >
                  <View style={styles.signup}>
                    <Text style={styles.whiteFont}>Join</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.login(navigate)}
                >
                  <View style={styles.signin}>
                    <Text style={styles.greyFont}>Already have an account?
                      <Text style={styles.whiteFont}> Sign In</Text>
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Image>
          </View>
        );
    }
  }
