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

let timerVar = null;

const styles = StyleSheet.create({
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
        borderRadius: 10,
        padding: 10,
        textAlign: 'center',
        alignItems: 'center',
        color: '#fff',
        backgroundColor: 'transparent',
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
    markBio: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

class TimerScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
        header: null,
    };
    constructor(props) {
        super(props);
        const { state } = this.props.navigation;
        this.state = {
            totalSeconds: 0,
            minutes: 0,
            seconds: 0,
            trainer: state.params.users[1],
            user: state.params.users[0],
            currentSessionKey: firebase.database().ref().child('trainingSessions').push().key,
        };
        console.log('this id', this.state.trainer.id);
        // const seshRef = firebase.database().ref('/users/' + this.state.trainer.id + '/trainingSessions/' + currentSessionKey);
        // seshRef.update({
        //     sessionFinished: false,
        // });
    }

    componentDidMount() {
      // firebase.auth().signOut();
        const { navigate } = this.props.navigation;
        // const currentSessionKey = firebase.database().ref().child('trainingSessions').push().key;
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                navigate('Log');
            } else {
                const userRef = firebase.database().ref('/users/' + user.uid);
                const seshRef = firebase.database().ref('/users/' + this.state.user.id + '/trainingSessions/' + this.state.currentSessionKey);
                const seshRef2 = firebase.database().ref('/users/' + this.state.trainer.id + '/trainingSessions/' + this.state.currentSessionKey);
                console.log('WHAT IS USER ID INSIDE EDIT', user.uid);
                userRef.on('value', (snapshot) => {
                    // console.log('user11', state.params.users[1].name);
                    console.log('snapshot trainingSesh inside timer', snapshot.val().trainingSessions);
                    this.setState({
                        userId: user.uid,
                        trainingSessions: snapshot.val().trainingSessions || [],
                        isTrainer: snapshot.val().isTrainer,
                    });
                    console.log('trainingsesh', this.state.trainingSessions);
                });
                seshRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        console.log('tfmate', snapshot.val());
                        if (snapshot.val().sessionFinished === true) {
                            console.log("SESSIONFINISHED1");
                            if (this.state.isTrainer === true) {
                                console.log('trainerfinished68');

                                navigate('TrainerFinished', { sessionKey: this.state.currentSessionKey });
                            } else if (this.state.isTrainer === false) {
                              console.log('userfinished68');

                                navigate('Rating', { sessionKey: this.state.currentSessionKey });
                            } else {
                                console.log('somethingweird');
                            }
                        }
                    }
                });
                seshRef2.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        console.log('tf mate2', snapshot.val());
                        if (snapshot.val().sessionFinished === true) {
                            console.log("SESSIONFINISHED2");
                            if (this.state.isTrainer === true) {
                                console.log('trainerfinished69');
                                navigate('TrainerFinished', { sessionKey: this.state.currentSessionKey });
                            } else if (this.state.isTrainer === false) {
                                console.log('userfinished69');
                                navigate('Rating', { sessionKey: this.state.currentSessionKey });
                            } else {
                                console.log('somethingweird');
                            }
                        }
                    }
                });
                // starts timer
                this.start();
            }
        });
    }

    CountTimer = () => {
        // console.log('happening every second');
        const totalSeconds = this.state.totalSeconds + 1;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds - (minutes * 60);
        this.setState({
            totalSeconds,
            minutes,
            seconds,
        });
    }

    start = () => {
        console.log('timer started');
        timerVar = setInterval(this.CountTimer, 1000);
    }

    stop = (navigate) => {
        console.log('session stopped', this.state.minutes, this.state.seconds, this.state.totalSeconds);
        clearInterval(timerVar);
        // const currentSessionKey = firebase.database().ref().child('trainingSessions').push().key;
        const latestSession = {
            trainer: this.state.trainer,
            user: this.state.user,
            sessionLength: this.state.totalSeconds,
            paidYet: false,
            sessionKey: this.state.currentSessionKey,
        };
        firebase.database().ref('/users/' + this.state.user.id + '/trainingSessions/' + this.state.currentSessionKey).update({
            session: latestSession,
            sessionFinished: true,
        });
        firebase.database().ref('/users/' + this.state.trainer.id + '/trainingSessions/' + this.state.currentSessionKey).update({
            session: latestSession,
            sessionFinished: true,
        });
        // if (this.state.isTrainer === true) {
        //     navigate('TrainerFinished', { sessionKey: currentSessionKey });
        // } else if (this.state.isTrainer === false) {
        //     navigate('Rating', { sessionKey: currentSessionKey });
        // } else {
        //     console.log('somethingweird');
        // }
    }

    displayTime = (min, sec) => {
        let secStr = sec;
        let minStr = min;
        if (sec < 10) {
            secStr = `0${sec}`;
        }
        if (min < 10) {
            minStr = `0${min}`;
        }
        return (<Text style={styles.centering}>{minStr}:{secStr}</Text>);
    }

    render() {
        const { navigate } = this.props.navigation;
        console.log('USER', this.state.user, 'TRAINER', this.state.trainer);
        return (
          <View style={styles.container}>
            <Image
              source={background}
              style={[styles.cont, styles.bg]}
              resizeMode="cover"
            >
              <View style={styles.markBio}>
                {this.state.isTrainer ?
                  <Text style={styles.centering}>You've been training
                     {this.state.user.name} for</Text>
                : <Text style={styles.centering}>You've been training with
                   {this.state.trainer.name} for</Text>
              }
                {this.displayTime(this.state.minutes, this.state.seconds)}
              </View>
              <TouchableOpacity onPress={() => this.stop(navigate)}>
                <Text style={styles.button}>Stop Session!</Text>
              </TouchableOpacity>
            </Image>
          </View>
        );
    }
  }

module.exports = TimerScreen;
