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
import Stars from 'react-native-stars';

const { width, height } = Dimensions.get('window');
const emp = require('./logos/empStar.png');
const full = require('./logos/fullStar.png');
const half = require('./logos/halfStar.png');

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
        borderColor: '#FF8A65',
        borderRadius: 4,
        height: 150,
        margin: 20,
        backgroundColor: 'transparent',
        // opacity: 0.5,
    },
    summary: {
        padding: 10,
        backgroundColor: 'transparent',
        fontSize: 20,
        alignContent: 'center',
    },
    btn: {
        borderWidth: 2,
        borderRadius: 4,
        borderColor: '#FF8A65',
        width: 120,
    },
    but: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    summ: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderTopWidth: 2,
        borderColor: '#FF8A65',
        width: 300,
        marginBottom: 20,
        marginTop: 20,
    },
});

class RateTrainerScreen extends React.Component {
    static navigationOptions = {
        title: 'Welome',
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
                            user: snapshot.val().session.user || 'ooo ooo',
                            trainer: snapshot.val().session.trainer,
                            paidYet: snapshot.val().session.paidYet,
                            sessionLength: snapshot.val().session.sessionLength,
                            sessionKey: snapshot.val().session.sessionKey,
                            price: this.calculatePrice(snapshot.val().session.sessionLength),
                        });
                    }
                    console.log('what is state inside rate', this.state);
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
        if (this.state.stars === 0) {
            alert('Enter a star rating');
        } else if (this.state.feedback === null) {
            alert('Enter some feedback');
        } else {
            console.log('star rating:', this.state.stars);
            console.log('feedback', this.state.feedback);

            // TODO: send trainer feedback email
            const sessionRef = firebase.database().ref('/users/' + this.state.userId + '/trainingSessions/' + this.state.sessionKey + '/session');
            const sessionRef2 = firebase.database().ref('/users/' + this.state.trainer.id + '/trainingSessions/' + this.state.sessionKey + '/session');
            sessionRef.update({
                paidYet: true,
                stars: this.state.stars,
                feedback: this.state.feedback,
                price: this.state.price,
            });
            sessionRef2.update({
                paidYet: true,
                stars: this.state.stars,
                feedback: this.state.feedback,
                price: this.state.price,
            });
            this.setState({ stars: 0 });
            this.setState({ feedback: null });
            navigate('HomeV3');
        }
    }

    renderInfo = () => {
        console.log('TRAINER9', this.state);
        const dollars = Math.round((this.state.sessionLength / 300) * 100) / 100;
        const min = Math.round(this.state.sessionLength / 60);
        console.log('$', dollars);
        return (<View style={styles.summ}><Text style={styles.summary}>{this.state.name.split(' ')[0]}, thank you for training!
          Your {min} minute long session will be ${this.state.price}.
          Please give {this.state.trainer.name || 'dood'} a rating and some feedback!
        </Text></View>);
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
          <View style={styles.container}>
              <View style={styles.markBio}>
                {this.renderInfo()}
              </View>
              <View style={{ alignItems: 'center' }}>
                <Stars
                  half={true}
                  rating={0}
                  update={val => this.setState({ stars: val })}
                  spacing={7}
                  starSize={50}
                  count={5}
                  fullStar={full}
                  emptyStar={emp}
                  halfStar={half}
                />
              </View>
              <View style={styles.textBox}>
                <TextInput
                  placeholder={`Give ${this.state.trainer.name} some feedback`}
                  onChangeText={feedback => this.setState({ feedback })}
                  multiline={true}
                  numberOfLines={10}
                />
              </View>
              <View style={styles.but}>
                <TouchableOpacity style={styles.btn} onPress={() => this.submit(navigate)}>
                  <Text style={styles.button}>Submit Rating</Text>
                </TouchableOpacity>
              </View>
          </View>
        );
    }
  }

module.exports = RateTrainerScreen;
