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
        this.state = {
            totalSeconds: 0,
            minutes: 0,
            seconds: 0,
            trainer: 'Brian',
        };
    }

    componentDidMount() {
      // firebase.auth().signOut();
        const { navigate } = this.props.navigation;
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                navigate('Log');
            } else {
                const userRef = firebase.database().ref('/users/' + user.uid);
                console.log('WHAT IS USER ID INSIDE EDIT', user.uid);
                userRef.on('value', (snapshot) => {
                    console.log('snapshot trainingSesh inside timer', snapshot.val().trainingSessions);
                    this.setState({
                        userId: user.uid,
                        trainingSessions: snapshot.val().trainingSessions || [],
                    });
                    console.log('trainingsesh', this.state.trainingSessions);
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
        const currentSessionKey = firebase.database().ref().child('trainingSessions').push().key;
        const latestSession = {
            trainer: this.state.trainer,
            sessionLength: this.state.totalSeconds,
            paidYet: false,
            sessionKey: currentSessionKey,
        };
        firebase.database().ref('/users/' + this.state.userId + '/trainingSessions/' + currentSessionKey).set({
            session: latestSession,
        });
        navigate('Rating', { sessionKey: currentSessionKey });
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
        return (
          <View style={styles.container}>
            <Image
              source={background}
              style={[styles.cont, styles.bg]}
              resizeMode="cover"
            >
              <View style={styles.markBio}>
                <Text style={styles.centering}>Training session with {this.state.trainer}:</Text>
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
