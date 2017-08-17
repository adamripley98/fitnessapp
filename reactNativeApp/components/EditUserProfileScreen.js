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
import Exponent from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width, height } = Dimensions.get('window');

const background = require('./logos/bkg.jpg');
const backIcon2 = require('./logos/backIcon2.png');

export default class EditUserProfileScreen extends React.Component {
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
    componentDidMount() {
        const { navigate } = this.props.navigation;
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                navigate('Log');
            } else {
                console.log('user isss', user);
                const userRef = firebase.database().ref(`/users/${user.uid}`);
                console.log('WHAT IS USER ID INSIDE EDIT', user.uid);
                userRef.on('value', (snapshot) => {
                    console.log('snapshot inside edit', snapshot);
                    this.setState({
                        age: snapshot.val().age,
                        bio: snapshot.val().bio,
                        userId: user.uid,
                        emailVerified: user.emailVerified,
                        name: snapshot.val().fullName,
                        profPic: snapshot.val().photoURL,
                    });
                    console.log('what is state', this.state);
                });
            }
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
            firebase.database().ref(`/users/${this.state.userId}`).update({
                fullName: this.state.name,
                age: this.state.age,
                bio: this.state.bio,
                photoURL: this.state.profPic,
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
            <Image
              source={background}
              style={[styles.cont, styles.bg]}
              resizeMode="cover"
            >
              <KeyboardAwareScrollView>
                <TouchableOpacity
                  onPress={() => navigate('UserProfile')}
                  style={{
                      height: 25,
                      width: 25,
                  }}
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
                <View style={styles.public}>
                  <View style={styles.markWrap}>
                    <Image source={{ uri: this.state.profPic }} style={styles.mark} resizeMode="contain" />
                  </View>
                  <TouchableOpacity style={styles.changePic} onPress={() => this.changeProfPic()}>
                    <Text>Change Profile Photo</Text>
                  </TouchableOpacity>
                  <View style={styles.input}>
                    <Text style={{ marginLeft: 10, fontSize: 16 }}>Name</Text>
                    <View style={styles.textBoxSmall}>
                      <TextInput
                        defaultValue={this.state.name}
                        placeholder={'Full Name'}
                        onChangeText={usr => this.setState({ tempName: usr })}
                        style={{ fontSize: 15 }}
                      />
                    </View>
                    <Text style={{ marginLeft: 10, fontSize: 16 }}>Age</Text>
                    <View style={styles.textBoxSmall}>
                      <TextInput
                        defaultValue={this.state.age}
                        placeholder={'Age'}
                        onChangeText={age => this.setState({ tempAge: age })}
                        style={{ fontSize: 15 }}
                      />
                    </View>
                    <Text style={{ marginLeft: 10, fontSize: 16 }}>About Me</Text>
                    <View style={styles.textBox}>
                      <TextInput
                        defaultValue={this.state.bio}
                        placeholder={`${this.state.name.split(' ')[0] || 'User'}, please a bit about yourself and your fitness goals.`}
                        onChangeText={bio => this.setState({ bio })}
                        multiline
                        numberOfLines={10}
                        style={{ fontSize: 15 }}
                      />
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => this.saveChanges(navigate)}
                  style={{ marginLeft: 10, marginRight: 10, borderRadius: 3, borderWidth: 1, borderColor: '#4CD964' }}
                >
                  <Text style={[styles.button, styles.greenButton, { borderRadius: 3, borderWidth: 0 }]}>Save Changes</Text>
                </TouchableOpacity>
              </KeyboardAwareScrollView>
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
        marginBottom: 20,
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
        borderRadius: 4,
        padding: 20,
        textAlign: 'center',
        color: '#fff',
    },
    greenButton: {
        backgroundColor: '#4CD964',
    },
    blueButton: {
        backgroundColor: '#34AADC',
    },
    bg: {
        paddingTop: 20,
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
        backgroundColor: 'transparent',
        marginTop: 10,
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
        opacity: 0.5,
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
    changePic: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginTop: -95,
        paddingTop: 10,
        paddingBottom: 10,
    },
    cent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    public: {
        backgroundColor: 'transparent',
        borderColor: '#424242',
    },
    private: {
        backgroundColor: 'transparent',
        marginLeft: 30,
        borderBottomWidth: 2,
        borderColor: '#424242',
    },
    input: {
        marginTop: 70,
    },
    textBox: {
        borderWidth: 1,
        borderRadius: 3,
        height: 200,
        margin: 10,
        marginTop: 0,
        backgroundColor: 'white',
        opacity: 0.5,
        padding: 2,
        paddingLeft: 5,
    },
    textBoxSmall: {
        borderWidth: 1,
        borderRadius: 3,
        height: 30,
        margin: 10,
        marginTop: 0,
        backgroundColor: 'white',
        opacity: 0.5,
        justifyContent: 'center',
        padding: 2,
        paddingLeft: 5,
    },
});
