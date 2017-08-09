import {
  ActivityIndicator,
  AsyncStorage,
  TouchableOpacity,
  Component,
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
const background = require('./logos/bkg.jpg');
const editProfPic = require('./logos/editprof.png');
const locationPic = require('./logos/location.png');
const emp = require('./logos/emptystar.png');
const full = require('./logos/starrating.png');

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
        // marginBottom: 10,
        color: '#fff',
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
        height: 150,
        margin: 20,
        // padding: 100,
        // width: width - 30,
        backgroundColor: 'white',
        opacity: 0.5,
    },
});

class RateTrainerScreen extends React.Component {
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

    componentWillMount() {
        const { navigate } = this.props.navigation;
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                navigate('Log');
            } else {
                const userRef = firebase.database().ref('/users/' + user.uid);
                userRef.on('value', (snapshot) => {
                    this.setState({
                        name: user.displayName,
                        profPic: user.photoURL,
                        userId: user.uid,
                        trainer: 'Brian',
                        stars: 0,
                        feedback: null,
                    });
                });
            }
        });
    }

    submit = (navigate) => {
        if (this.state.stars === 0) {
            alert('Enter a star rating');
        } else if (this.state.feedback === null) {
            alert('Enter some feedback');
        } else {
            console.log('star rating:', this.state.stars);
            console.log('feedback', this.state.feedback);
            this.setState({ stars: 0 });
            this.setState({ feedback: null });
            // TODO: update firebase trainer profile with given rating and feedback.
            // TODO: send trainer feedback email
            navigate('UserProfile');
        }
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
                <Text style={styles.centering}>{this.state.name.split(' ')[0] || 'dood'}, give your trainer {this.state.trainer} a rating and some feedback!</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Stars
                  half={false}
                  rating={0}
                  update={val => this.setState({ stars: val })}
                  spacing={7}
                  starSize={50}
                  count={5}
                  fullStar={full}
                  emptyStar={emp}
                />
              </View>
              <View style={styles.textBox}>
                <TextInput
                  placeholder={`Give ${this.state.trainer} some feedback`}
                  onChangeText={feedback => this.setState({ feedback })}
                  multiline={true}
                  numberOfLines={10}
                />
              </View>
              <TouchableOpacity onPress={() => this.submit(navigate)}>
                <Text style={styles.button}>Submit Rating</Text>
              </TouchableOpacity>
            </Image>
          </View>
        );
    }
  }

module.exports = RateTrainerScreen;
