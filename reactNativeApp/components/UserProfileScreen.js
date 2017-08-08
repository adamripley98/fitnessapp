import {
  ActivityIndicator,
  AsyncStorage,
  TouchableHighlight,
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

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 10,
        flex: 1,
        flexDirection: 'column',
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
        flex: 1,
        paddingTop: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    markWrap: {
        flex: 1,
        paddingVertical: 10,
        borderWidth: 5,
        borderRadius: 10,
    },
    mark: {
        width: 140,
        height: 140,
        // flex: 1,
        borderWidth: 4,
        borderRadius: 70,
    },
});

class UserProfileScreen extends React.Component {
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
                console.log('user is', user);
                console.log('what is state', this.state);
                const userRef = firebase.database().ref('/users/' + user.uid);
                console.log('WHAT IS USER ID INSIDE PROFILE', user.uid);
                userRef.on('value', (snapshot) => {
                    console.log('snapshot inside user', snapshot);
                    this.setState({
                        emailVerified: user.emailVerified,
                        name: user.displayName,
                        profPic: user.photoURL,
                        userId: user.uid,
                        age: snapshot.val().age,
                        bio: snapshot.val().bio,
                    });
                    console.log('what is state', this.state);
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

    logout = () => {
        firebase.auth().signOut().then(() => {
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
            alert(error.message);
        });
    }

    editProf = (navigate) => {
        navigate('EditUserProfile');
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
          <View style={styles.container}>
            {this.state.emailVerified === false ?
              <TouchableOpacity onPress={() => this.verifyEmail()}>
                <Text> Click here to verify your email!</Text>
              </TouchableOpacity> :
              <View />}
            <Text style={styles.centering}>Welcome, {this.state.name.split(' ')[0] || 'dood'}!</Text>
            <View style={styles.markWrap}>
              <Image source={{ uri: this.state.profPic }} style={styles.mark} resizeMode="contain" />
            </View>
            <Text> {this.state.name} </Text>
            <Text> Age: {this.state.age || '?'} </Text>
            <Text> Short bio: {this.state.bio || `Hi! My name is ${this.state.name.split(' ')[0]}, and I'm looking to get more fit!`} </Text>
            <TouchableOpacity onPress={() => this.editProf(navigate)}>
              <Text> Edit profile</Text>
            </TouchableOpacity>
            <TouchableHighlight onPress={() => this.logout()}>
              <Text style={[styles.button, styles.greenButton]}>Log out</Text>
            </TouchableHighlight>
          </View>
        );
    }
  }

module.exports = UserProfileScreen;
