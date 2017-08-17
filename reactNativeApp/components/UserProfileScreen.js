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
} from 'react-native';
import React from 'react';
import firebase from 'firebase';

const { width, height } = Dimensions.get('window');
const background = require('./logos/bkg.jpg');
const editProfPic = require('./logos/editprof.png');
const editProfile = require('./logos/editProfile.png');
const locationPic = require('./logos/location.png');
const backIcon2 = require('./logos/backIcon2.png');

export default class UserProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            name: '',
        };
        const { navigate } = this.props.navigation;
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                navigate('Log');
            }
        });
    }

    componentDidMount() {
      // firebase.auth().signOut();
        const { navigate } = this.props.navigation;
        firebase.auth().onAuthStateChanged((user) => {
            const userRef = firebase.database().ref(`/users/${user.uid}`);
            userRef.on('value', (snapshot) => {
                if (snapshot.val()) {
                    this.setState({
                        emailVerified: user.emailVerified,
                        name: snapshot.val().fullName,
                        profPic: snapshot.val().photoURL,
                        userId: user.uid,
                        age: snapshot.val().age,
                        bio: snapshot.val().bio,
                    });
                }
            });
        });
    }

    editProf = (navigate) => {
        console.log('EDITING USER PROFILE');
        navigate('EditUserProfile');
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
              <TouchableOpacity
                onPress={() => navigate('HomeV3', { currentModalState: true })}
                style={{ height: 25, width: 25 }}
              >
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
              <TouchableOpacity
                onPress={() => this.editProf(navigate)}
                style={{ height: 25, width: 25, position: 'absolute', top: 20, right: 6 }}
              >
                <Image
                  source={editProfile}
                  style={{
                      height: 25,
                      width: 25,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View style={styles.markWrap}>
                <Image source={{ uri: this.state.profPic }} style={styles.mark} resizeMode="contain" />
              </View>
              <View style={styles.markBio}>
                <Text style={styles.centering}>{this.state.name}</Text>
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
                      borderColor: 'black',
                      padding: 10,
                      margin: 1,
                      marginTop: 10,
                      marginBottom: 10,
                      width: width - 40,
                  }}
                  >
                    <Text style={{ marginBottom: 5, fontSize: 15, fontStyle: 'italic', fontWeight: 'bold' }}>About Me</Text>
                    <Text>{this.state.bio}</Text>
                  </View>
                </View>
              </View>
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
        width,
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
