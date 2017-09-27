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
const background = require('../assets/icons/bkg.jpg');
const backIcon = require('../assets/icons/back.png');
const backIcon2 = require('../assets/icons/backIcon2.png');

export default class TrainerProfileScreenV2 extends React.Component {
    static navigationOptions = {
        title: 'Trainer',
        header: null,
    };
    constructor(props) {
        super(props);
        const { state } = this.props.navigation;
        this.state = {
            age: state.params.prof.age,
            bio: state.params.prof.bio,
            profPic: state.params.prof.photoURL,
            trainerName: state.params.prof.fullName,
            trainerID: state.params.prof.uniqueId,
        };
    }

    componentDidMount() {
      // firebase.auth().signOut();
        const { state } = this.props.navigation;
        const { navigate } = this.props.navigation;
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                navigate('Log');
            } else {
                console.log('useris', user);
                console.log('what is state', this.state);
                const userRef = firebase.database().ref(`/users/${user.uid}`);
                console.log('WHAT IS USER I INSIDE PROFILE', user.uid);
                userRef.on('value', (snapshot) => {
                    console.log('snapshot inside user', snapshot);
                    if (snapshot !== null) {
                        this.setState({
                            userName: user.displayName,
                            userID: user.uid,
                        });
                    }
                    console.log('what is state inside trainerprof', this.state);
                });
            }
        });
    }

    createThread = (navigate) => {
        console.log('creating');
        const threadsRef = firebase.database().ref('threads/');
        const firstMessage = {
            _id: Math.random(),
            text: 'You guys are connected! Let your partner know where in the gym you are. When you locate each other, type "START" to start your session',
            createdAt: new Date(),
            user: {
                _id: 'trim_bot',
                name: 'TRIM BOT',
            },
        };
        // firebase.database().ref('/users/' + this.state.userId).update({
        //     fullName: this.state.name,
        //     age: this.state.age,
        //     bio: this.state.bio,
        //     photoURL: this.state.profPic,
        // });
        console.log('wnag');
        threadsRef.once('value').then((snapshot) => {
            const threads = snapshot.val();
            const newThreadKey = threadsRef.push({
                users: [
                    {
                        id: this.state.userID,
                        name: this.state.userName,
                    },
                    {
                        id: this.state.trainerID,
                        name: this.state.trainerName,
                    },
                ],
                createdAt: new Date(),
            }).key;
            firebase.database().ref(`/users/${this.state.trainerID}`).update({
                clientConnected: newThreadKey,
            });
            firebase.database().ref(`threads/${newThreadKey}/messages`).push(firstMessage);
            firebase.database().ref(`/threads/${newThreadKey}`).update({
                readyToStart: false,
            });
            this.setState({ threadId: newThreadKey });
            console.log('NEW THREAD CREATED', this.state.threadId);
            navigate('MessengerV2', { currentThread: this.state.threadId });
        });
    }

    test = () => {
        console.log('TEST');
    }

    render() {
        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;
        return (
          <View style={styles.container}>
            <Image
              source={background}
              style={styles.content}
              resizeMode="cover"
            >
              <View style={styles.headerIconView}>
                <TouchableOpacity onPress={() => navigate('HomeV3', { currentModalState: true })} style={[styles.headerBackButtonView, { height: 25, width: 25 }]}>
                  <Image
                    source={backIcon2}
                    style={{
                        position: 'absolute',
                        left: 8,
                        height: 25,
                        width: 25,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.markWrap}>
                <Image source={{ uri: this.state.profPic }} style={styles.mark} resizeMode="contain" />
              </View>
              <View style={styles.markBio}>
                <Text style={styles.centering}>{this.state.trainerName.split(' ')[0]}</Text>
              </View>
              <View style={[styles.markBio, { flexDirection: 'row' }]}>
                <Text>Status: </Text>
                <View style={styles.ledGreen} />
                <Text> (Online)</Text>
              </View>
              <View style={styles.pdrofile}>
                <View style={styles.markWrap}>
                  <Text style={styles.age}> Age: {this.state.age || '?'} </Text>
                  <View style={{
                      backgroundColor: 'transparent',
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      borderColor: 'black',
                      padding: 10,
                      margin: 1,
                      marginTop: 10,
                      marginBottom: 10,
                      width: width - 10,
                  }}
                  >
                    <Text>{this.state.bio}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={() => this.createThread(navigate)}>
                <Text style={[styles.button, styles.greenButton, { backgroundColor: 'orange' }]}>Train</Text>
              </TouchableOpacity>
            </Image>
          </View>
        );
    }
}

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
        shadowColor: 'rgba(0, 0, 0, 0.2)',
    },
});
