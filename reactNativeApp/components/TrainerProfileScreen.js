import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
} from 'react-native';
import React from 'react';
import firebase from 'firebase';

const { width, height } = Dimensions.get('window');
const background = require('./logos/bkg.jpg');
const editProfPic = require('./logos/editprof.png');

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
});

class TrainerProfileScreen extends React.Component {
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
      // firebase.auth().signOut();
        const { navigate } = this.props.navigation;
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                navigate('Log');
            } else {
                console.log('user is', user);
                console.log('what is state', this.state);
                const userRef = firebase.database().ref('/users/' + user.uid);
                console.log('WHAT IS USER ID INSIDE PROFILE', user.uid);
                userRef.on('value', (snapshot) => {
                    console.log('snapshot inside user', snapshot);
                    if (snapshot !== null) {
                        if (!snapshot.val().isTrainer) {
                            navigate('TrainerProfile');
                        }
                        this.setState({
                            emailVerified: user.emailVerified,
                            name: user.displayName,
                            profPic: user.photoURL,
                            userId: user.uid,
                            age: snapshot.val().age,
                            bio: snapshot.val().bio,
                            isCertified: snapshot.val().isCertified,
                        });
                    }
                    console.log('what is state inside trainer prof', this.state);
                });
            }
        });
    }

    verifyEmail = () => {
        firebase.auth().currentUser.sendEmailVerification().then(() => {
            console.log('verification email sent');
            alert('Verification email sent!');
        }).catch((error) => {
            alert('Error sending verification email');
            console.log('error sending verification email', error);
        });
    }

    logout = () => {
        firebase.auth().signOut().then(() => {
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
            alert(error.message);
        });
    }

    editProf = (navigate) => {
        navigate('TrainerEditProfile');
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
          <View style={styles.container}>
            <Image
              source={background}
              style={[styles.cont, styles.bg]}
              resizeMode="cover"
            >
            {this.state.emailVerified === false ?
              <TouchableOpacity onPress={() => this.verifyEmail()}>
                <Text style={styles.banner}> Click here to verify your email!</Text>
              </TouchableOpacity> :
              <View />}
              <View style={styles.markBio}>
                <Text style={styles.centering}>Trainer Welcome, {this.state.name.split(' ')[0] || 'dood'}!</Text>
              </View>
              <View style={styles.pdrofile}>
                <View style={styles.markWrap}>
                  <Image source={{ uri: this.state.profPic }} style={styles.mark} resizeMode="contain" />
                </View>
                <View style={styles.markBio}>
                  <TouchableOpacity onPress={() => this.editProf(navigate)}>
                    <Image style={styles.icon} source={editProfPic} resizeMode="contain" />
                  </TouchableOpacity>
                </View>
                <View style={styles.markWrap}>
                  <Text style={styles.name}> {this.state.name}, {this.state.age || '?'} </Text>
                  <View style={styles.bio}>
                    <Text> {this.state.bio || `Hi! My name is ${this.state.name.split(' ')[0]}, and I'm looking to get more fit!`} </Text>
                  </View>
                </View>
              </View>
            </Image>
            <TouchableOpacity onPress={() => this.logout()}>
              <Text style={[styles.button, styles.greenButton]}>Log out</Text>
            </TouchableOpacity>
          </View>
        );
    }
  }

module.exports = TrainerProfileScreen;
