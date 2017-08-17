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

const { width, height } = Dimensions.get('window');

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
        borderRadius: 10,
        padding: 10,
        textAlign: 'center',
        alignItems: 'center',
        color: 'black',
        backgroundColor: 'transparent',
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
        borderColor: '#FF5722',
        margin: 20,
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
    textBox: {
        borderWidth: 2,
        height: 150,
        margin: 20,
        backgroundColor: 'white',
        opacity: 0.5,
    },
    summary: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        fontSize: 20,
        margin: 20,
        marginTop: 90,
        marginBottom: 30,
        padding: 10,
        borderColor: '#FF5722',
        alignContent: 'center',
    },
});

class TrainerFinishedScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            stars: 0,
            feedback: null,
            user: 'test user',
            trainer: 'test trainer',
        };
    }

    componentDidMount() {
        const { navigate } = this.props.navigation;
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                navigate('Log');
            } else {
                const sessionRef = firebase.database().ref('/users/' + user.uid + '/trainingSessions/' + this.props.navigation.state.params.sessionKey);
                sessionRef.on('value', (snapshot) => {
                    console.log('what is snapshot inside rate', snapshot.val());
                    console.log("TR9", snapshot.val().session.trainer);
                    if (snapshot.val()) {
                        this.setState({
                            name: user.displayName,
                            userId: user.uid,
                            user: snapshot.val().session.user,
                            trainer: snapshot.val().session.trainer,
                            paidYet: snapshot.val().session.paidYet,
                            sessionLength: snapshot.val().session.sessionLength,
                            sessionKey: snapshot.val().session.sessionKey,
                            price: this.calculatePrice(snapshot.val().session.sessionLength),
                        });
                    }
                    console.log('what is stateinside rate', this.state);
                });
            }
        });
    }

    // arbitrarily based only off time. $12 an hour.
    calculatePrice = (len) => {
        const dollars = Math.round((len / 300) * 100) / 100;
        return dollars;
    }

    submit = (navigate) => {
        navigate('HomeV3');
    }

    renderInfo = () => {
        const dollars = Math.round((this.state.sessionLength / 300) * 100) / 100;
        const min = Math.round(this.state.sessionLength / 60);
        console.log('$', dollars);
        return (<Text style={styles.summary}>{this.state.name.split(' ')[0]}, Good Work!
          Your {min} minute long session earned you ${this.state.price}!
        </Text>);
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
          <View style={styles.container}>
              <View style={styles.markBio}>
                {this.renderInfo()}
              </View>
              <TouchableOpacity onPress={() => this.submit(navigate)}>
                <Text style={styles.button}>Finish</Text>
              </TouchableOpacity>
          </View>
        );
    }
  }

module.exports = TrainerFinishedScreen;
