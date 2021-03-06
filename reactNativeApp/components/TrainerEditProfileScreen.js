import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';
import firebase from 'firebase';
import Exponent from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width, height } = Dimensions.get('window');

const background = require('./logos/bkg.jpg');

const styles = StyleSheet.create({
    banner: {
        justifyContent: 'center',
        alignItems: 'center',
        width,
        height: 30,
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 30,
        backgroundColor: '#f44336',
        marginBottom: 20,
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: 'black',
        shadowOffset: { height: 3, width: 3 },
    },
    cont: {
        flex: 1,
    },
    container: {
        flex: 1,
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
    bg: {
        paddingTop: 30,
        width: null,
        height: null,
    },
    centering: {
        backgroundColor: 'transparent',
        fontSize: 35,
        marginTop: 60,
        marginBottom: 30,
        alignContent: 'center',
    },
    markWrap: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    markBio: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    mark: {
        width: 160,
        height: 160,
        borderWidth: 3,
        borderRadius: 80,
        backgroundColor: '#FFAB91',
        opacity: 0.5,
    },
    name: {
        fontSize: 20,
        marginTop: 20,
        backgroundColor: 'transparent',
    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 150,
    },
    bio: {
        backgroundColor: 'transparent',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#424242',
        height: 60,
        width: width - 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        paddingTop: 40,
        paddingBottom: 40,
    },
    location: {
        fontSize: 15,
    },
    profile: {
        paddingTop: 30,
        backgroundColor: '#FFAB91',
    },
    changePic: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginTop: -95,
        paddingTop: 10,
        paddingBottom: 10,
    },
    cent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    public: {
        borderTopWidth: 2,
        borderBottomWidth: 2,
        backgroundColor: 'transparent',
        marginLeft: 30,
        borderColor: '#424242',
    },
    private: {
        backgroundColor: 'transparent',
        marginLeft: 30,
        borderBottomWidth: 2,
        borderColor: '#424242',
    },
    input: {
        marginTop: 70,
    },
    textBox: {
        borderWidth: 2,
        height: 120,
        margin: 10,
        backgroundColor: 'white',
        opacity: 0.5,
    },
    textBoxSmall: {
        borderWidth: 2,
        height: 30,
        margin: 10,
        backgroundColor: 'white',
        opacity: 0.5,
    },
});

class TrainerEditProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            image: null,
        };
        console.log('enters constructor');
    }

    componentDidMount() {
        const { navigate } = this.props.navigation;
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                navigate('Log');
            } else {
                console.log('user isss', user);
                const userRef = firebase.database().ref('/users/' + user.uid);
                console.log('WHAT IS USER ID INSIDE EDIT', user.uid);
                userRef.on('value', (snapshot) => {
                    console.log('snapshot inside edit', snapshot);
                    this.setState({
                        age: snapshot.val().age,
                        bio: snapshot.val().bio,
                        userId: user.uid,
                        emailVerified: user.emailVerified,
                        name: snapshot.val().fullName,
                        profPic: snapshot.val().photoURL,
                    });
                    console.log('what istate', this.state);
                });
            }
        });
    }

    verifyEmail = () => {
        firebase.auth().currentUser.sendEmailVerification().then(() => {
            console.log('verification email sent');
        }).catch((error) => {
            alert('Error sending verification email');
            console.log('error sending verification email', error);
        });
    }

    changeProfPic = async () => {
        console.log('profile pic changed!');
        const result = await Exponent.ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        console.log(result);
        firebase.auth().currentUser.updateProfile({
            photoURL: result.uri,
        }).then(() => {
          // update successful
            this.setState({ profPic: result.uri });
        }).catch((e) => {
            alert('error');
            console.log('err', e);
        });
    }

    saveChanges = (navigate) => {
        firebase.auth().currentUser.updateProfile({
            displayName: this.state.tempName || this.state.name,
        }).then(() => {
          // update successful
            this.setState({
                name: this.state.tempName || this.state.name || 'Unspecified name',
                age: this.state.tempAge || this.state.age || '99',
                bio: this.state.tempBio || this.state.bio || `Hi! My name is ${this.state.name.split(' ')[0]}, and I'm looking to get more fit!`,
            });
        }).then(() => {
            firebase.database().ref('/users/' + this.state.userId).update({
                fullName: this.state.name,
                age: this.state.age,
                bio: this.state.bio,
                photoURL: this.state.profPic,
            });
        }).then(() => {
            navigate('HomeV3');
        })
        .catch((e) => {
            alert('error');
            console.log('err', e);
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        const { image } = this.state;
        console.log('email verified', this.state.emailVerified);
        return (
          <View style={styles.container}>
            <Image
              source={background}
              style={[styles.cont, styles.bg]}
              resizeMode="cover"
            >
              <KeyboardAwareScrollView>
              <View style={styles.public}>
                <Text> Trainer Public Information </Text>
                <View style={styles.markWrap}>
                  <Image source={{ uri: this.state.profPic }} style={styles.mark} resizeMode="contain" />
                </View>
                <TouchableOpacity style={styles.changePic} onPress={() => this.changeProfPic()}>
                  <Text> Change Profile Photo</Text>
                </TouchableOpacity>
                <View style={styles.input}>
                  <View style={styles.textBoxSmall}>
                    <TextInput
                      placeholder={'Enter your full name'}
                      onChangeText={usr => this.setState({ tempName: usr })}
                    />
                  </View>
                  <View style={styles.textBoxSmall}>
                    <TextInput
                      placeholder={'Enter your age'}
                      onChangeText={age => this.setState({ tempAge: age })}
                    />
                  </View>
                  <View style={styles.textBox}>
                    <TextInput
                      placeholder={`${this.state.name.split(' ')[0]}, explain your expertise.`}
                      onChangeText={bio => this.setState({ bio })}
                      multiline={true}
                      numberOfLines={10}
                    />
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={() => this.saveChanges(navigate)}>
                <Text style={[styles.button, styles.greenButton]}>Save changes</Text>
              </TouchableOpacity>
            </KeyboardAwareScrollView>
            </Image>
          </View>
        );
    }
  }

module.exports = TrainerEditProfileScreen;
