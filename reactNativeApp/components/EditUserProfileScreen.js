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
  TextInput,
} from 'react-native';
import React from 'react';
import firebase from 'firebase';
import { firebaseApp } from '../../firebase';

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
        width: null,
        height: null,
        flex: 1,
    },
});

class ProtectedView extends React.Component {
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
    componentDidMount() {
        const { navigate } = this.props.navigation;
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                navigate('Log');
            } else {
                console.log('user is', user);
                this.setState({
                    emailVerified: user.emailVerified,
                    name: user.displayName,
                    profPic: user.photoURL || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
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

    changeProfPic = () => {
        console.log('profile pic changed!');
        firebase.auth().currentUser.updateProfile({
            photoURL: brian,
        }).then(() => {
          // update successful
            this.setState({ profPic: brian });
        }).catch((e) => {
            alert('error');
            console.log('err', e);
        });
    }

    saveChanges = (navigate) => {
        // TODO: actually save changes in firebase database;
        firebase.auth().currentUser.updateProfile({
            displayName: this.state.tempName || this.state.name,
        }).then(() => {
          // update successful
            this.setState({
                name: this.state.tempName || this.state.name || 'Unspecified name',
                age: this.state.tempAge || this.state.age || '99',
                bio: this.state.tempBio || this.state.bio || `Hi! My name is ${this.state.name.split(' ')[0]}, and I'm looking to get more fit!`,
            });
            navigate('UserProfile');
        }).catch((e) => {
            alert('error');
            console.log('err', e);
        });
    }

    render() {
        const { navigate } = this.props.navigation;
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
            <TouchableHighlight onPress={() => this.saveChanges(navigate)}>
              <Text style={[styles.button, styles.greenButton]}>Save changes</Text>
            </TouchableHighlight>
          </View>
        );
    }
  }

module.exports = ProtectedView;
