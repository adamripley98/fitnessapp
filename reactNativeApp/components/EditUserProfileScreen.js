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
import Exponent from 'expo';

import firebaseApp from '../../firebase';

const database = firebaseApp.database;

const ImagePicker = require('react-native-image-picker');

const { width, height } = Dimensions.get('window');

const brian = 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAxcAAAAJGNlMDkxMDJhLTUzMGEtNDhmMC04YzNhLWVmYWQ0YTc5MThiYw.jpg';

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
        width: 300,
        height: 300,
        flex: 1,
    },
});

class EditUserProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            image: null,
        };
        console.log('enters constructor');
    }

    componentWillMount() {
        const { navigate } = this.props.navigation;
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                navigate('Log');
            } else {
                console.log('user isss', user);
                const userRef = firebase.database().ref('/users/' + user.uid);
                console.log('WHAT IS USER ID INSIDE EDIT', user.uid);
                userRef.on('value', (snapshot) => {
                    console.log('snapshot inside edit', snapshot);
                    this.setState({
                        age: snapshot.val().age,
                        bio: snapshot.val().bio,
                        userId: user.uid,
                        emailVerified: user.emailVerified,
                        name: user.displayName,
                        profPic: user.photoURL || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
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

    changeProfPic = async () => {
        console.log('profile pic changed!');
        const result = await Exponent.ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        console.log(result);
        firebase.auth().currentUser.updateProfile({
            photoURL: result.uri,
        }).then(() => {
          // update successful
            this.setState({ profPic: result.uri });
        }).catch((e) => {
            alert('error');
            console.log('err', e);
        });
    }

    // _pickImage = async () => {
    //     if (!result.cancelled) {
    //         this.setState({ profPic: result.uri });
    //     }
    // }

    saveChanges = (navigate) => {
        firebase.auth().currentUser.updateProfile({
            displayName: this.state.tempName || this.state.name,
        }).then(() => {
          // update successful
            this.setState({
                name: this.state.tempName || this.state.name || 'Unspecified name',
                age: this.state.tempAge || this.state.age || '99',
                bio: this.state.tempBio || this.state.bio || `Hi! My name is ${this.state.name.split(' ')[0]}, and I'm looking to get more fit!`,
            });
        }).then(() => {
            firebase.database().ref('/users/' + this.state.userId).set({
                fullName: this.state.name,
                age: this.state.age,
                bio: this.state.bio,
            });
        }).then(() => {
            navigate('UserProfile');
        })
        .catch((e) => {
            alert('error');
            console.log('err', e);
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        const { image } = this.state;
        console.log('email verified', this.state.emailVerified);
        return (
          <View style={styles.container}>
            {this.state.emailVerified === false ?
              <TouchableOpacity onPress={() => this.verifyEmail()}>
                <Text> Click here to verify your email!</Text>
              </TouchableOpacity> :
              <View />}
            <Text style={styles.centering}>Edit your profile, {this.state.name.split(' ')[0] || 'dood'}!</Text>
            <View style={styles.markWrap}>
              <Image source={{ uri: this.state.profPic }} style={styles.mark} resizeMode="contain" />
            </View>
            <TextInput
              placeholder={this.state.name || 'Full name'}
              onChangeText={usr => this.setState({ tempName: usr })}
            />
            <TextInput
              placeholder={this.state.age || 'Age'}
              onChangeText={age => this.setState({ tempAge: age })}
            />
            <TextInput
              placeholder={this.state.bio || `Hi! My name is ${this.state.name.split(' ')[0]}, and I'm looking to get more fit!`}
              onChangeText={bio => this.setState({ bio })}
            />
            <TouchableOpacity onPress={() => this.changeProfPic()}>
              <Text> Change profile pic</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.saveChanges(navigate)}>
              <Text style={[styles.button, styles.greenButton]}>Save changes</Text>
            </TouchableOpacity>
          </View>
        );
    }
  }

module.exports = EditUserProfileScreen;

// Exponent.registerRootComponent(ImagePickerExample);
