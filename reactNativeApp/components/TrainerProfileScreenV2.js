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
    content: {
        flex: 1,
        paddingTop: 20,
        width: null,
        height: null,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
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
        backgroundColor: 'transparent',
        fontSize: 35,
        marginTop: 10,
        alignContent: 'center',
    },
    markWrap: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    markBio: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginTop: 3,
    },
    mark: {
        width: 160,
        height: 160,
        borderWidth: 2,
        borderRadius: 79,
        backgroundColor: '#FFAB91',
    },
    name: {
        fontSize: 20,
        marginTop: 0,
        backgroundColor: 'transparent',
    },
    age: {
        fontSize: 15,
        marginTop: 0,
        backgroundColor: 'transparent',
    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 150,
    },
    bio: {
        marginTop: 10,
        backgroundColor: 'transparent',
        borderTopWidth: 2,
        borderColor: '#424242',
        padding: 5,
        margin: 1,
        width: width - 3,
    },
    location: {
        fontSize: 15,
    },
    profile: {
        paddingTop: 30,
        backgroundColor: '#FFAB91',
    },
    ledBox: {
        height: 30,
        width: '25%',
        margin: 10,
        flex: 1,
        alignItems: 'center',
    },
    ledGreen: {
        margin: 0,
        width: 10,
        height: 10,
        backgroundColor: '#ABFF00',
        borderRadius: 80,
        // boxShadow: rgba(0, 0, 0, 0.2) 0 -1 7 1, inset #006 0 -1 9, '#3F8CFF' 0 2 14,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
    },
});

class TrainerProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Trainer',
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            trainerName: '',
        };
    }

    componentWillMount() {
      // firebase.auth().signOut();
        const { navigate } = this.props.navigation;
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                navigate('Log');
            } else {
                console.log('user is', user);
                console.log('what is state', this.state);
                const userRef = firebase.database().ref(`/users/${user.uid}`);
                console.log('WHAT IS USER ID INSIDE PROFILE', user.uid);
                userRef.on('value', (snapshot) => {
                    console.log('snapshot inside user', snapshot);
                    if (snapshot !== null) {
                        if (!snapshot.val().isTrainer) {
                            navigate('UserProfile');
                        }
                        this.setState({
                            userID: user.uid,
                            userName: user.displayName,
                            trainerID: 'fillerTrainerID',
                            trainerName: 'Trainer Boi',
                        });
                        // BELOW SHOULD BE FOR THE TRAINER
                        // this.setState({
                        //     emailVerified: user.emailVerified,
                        //     name: user.displayName,
                        //     profPic: user.photoURL,
                        //     userId: user.uid,
                        //     age: snapshot.val().age,
                        //     bio: snapshot.val().bio,
                        //     isCertified: snapshot.val().isCertified,
                        // });
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

    getCertified = (navigate) => {
        console.log('getting certified');
        navigate('TrainerCertification');
    }

    createThread = (navigate) => {
        const threadsRef = firebase.database().ref('threads/');
        const firstMessage = {
            _id: Math.round(Math.random() * 1000000),
            text: 'This is the first message!',
            createdAt: new Date(),
            user: {
                _id: 'trim_bot',
                name: 'TRIM BOT',
            },
        };
        threadsRef.once('value').then((snapshot) => {
            const threads = snapshot.val();
            console.log(threads);
            // const newThreadKey = threadsRef.push({
            //     users: [
            //         {
            //             id: this.state.userID,
            //             name: this.state.userName,
            //         },
            //         {
            //             id: this.state.trainerID,
            //             name: this.state.trainerName,
            //         },
            //     ],
            //     createdAt: new Date(),
            // }).key;
            // firebase.database().ref(`threads/${newThreadKey}/messages`).push(firstMessage);
            // this.setState({ threadId: newThreadKey });
            // console.log('NEW THREAD CREATED', this.state.threadId);
            // navigate('MessengerV2', { currentThread: this.state.threadId });
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
          <View style={styles.container}>
            <Image
              source={background}
              style={styles.content}
              resizeMode="cover"
            >
              <View style={styles.markWrap}>
                <Image source={{ uri: this.state.profPic }} style={styles.mark} resizeMode="contain" />
              </View>
              <View style={styles.markBio}>
                <Text style={styles.centering}>{this.state.trainerName}</Text>
              </View>
              <View style={[styles.markBio, { flexDirection: 'row' }]}>
                <Text>Status: </Text>
                <View style={styles.ledGreen} />
                <Text> (Online)</Text>
              </View>
              <View style={styles.pdrofile}>
                <View style={styles.markWrap}>
                  <Text style={styles.age}> Age: {this.state.age || '?'} </Text>
                  <View style={styles.bio}>
                    <Text> {this.state.bio || `My name is ${this.state.trainerName.split(' ')[0]}, and I'm here to help you get more fit!`} </Text>
                  </View>
                  <View style={{
                      backgroundColor: 'transparent',
                      borderWidth: 1,
                      borderColor: 'black',
                      padding: 5,
                      margin: 1,
                      width: width - 3,
                  }}
                  >
                    <Text>This is where I will tell you a bit about myself because this is the about me</Text>
                  </View>
                  <View style={{
                      backgroundColor: 'transparent',
                      borderWidth: 1,
                      borderColor: 'black',
                      padding: 5,
                      margin: 1,
                      width: width - 3,
                  }}
                  >
                    <Text>This is where I will tell you a bit about my favorite exercises because this is the favorite exercises part</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={() => this.createThread(navigate)}>
                <Text style={[styles.button, styles.greenButton, { backgroundColor: 'blue' }]}>Train</Text>
              </TouchableOpacity>
            </Image>
          </View>
        );
    }
  }

module.exports = TrainerProfileScreen;
