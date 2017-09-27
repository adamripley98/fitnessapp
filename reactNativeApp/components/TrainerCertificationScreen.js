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
import { SegmentedControls } from 'react-native-radio-buttons';

const { width, height } = Dimensions.get('window');
const background = require('../assets/icons/bkg.jpg');
const editProfPic = require('../assets/icons/editprof.png');

const options = [
    'Yes',
    'No',
];

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
});

class TrainerCertificationScreen extends React.Component {
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
      // firebase.auth().signOut();
        const { navigate } = this.props.navigation;
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                navigate('Log');
            } else {
                const userRef = firebase.database().ref('/users/' + user.uid);
                userRef.on('value', (snapshot) => {
                    console.log('snapshot inside user', snapshot);
                    if (snapshot !== null) {
                        if (!snapshot.val().isTrainer) {
                            navigate('HomeV3');
                        }
                        this.setState({
                            name: user.displayName,
                            userId: user.uid,
                            isCertified: snapshot.val().isCertified,
                        });
                    }
                });
            }
        });
    }

    setSelectedOption = (selectedOption) => {
        this.setState({
            selectedOption,
        });
    }

    getCertified = (navigate) => {
        // TODO: actual certification, update in firebase, navigate back to trainer profile
        if (this.state.selectedOption === 'Yes') {
            firebase.database().ref('/users/' + this.state.userId).update({
                isCertified: true,
            });
            console.log('You have been certified! Congrats!');
        }
        navigate('HomeV3');
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
                <Text style={styles.centering}>do u even lift, {this.state.name.split(' ')[0] || 'dood'}?</Text>
              </View>
              <SegmentedControls
                tint={'#f80046'}
                selectedTint={'white'}
                backTint={'#1e2126'}
                options={options}
                allowFontScaling={false} // default: true
                onSelection={this.setSelectedOption.bind(this)}
                selectedOption={this.state.selectedOption}
                optionStyle={{ fontFamily: 'AvenirNext-Medium' }}
                optionContainerStyle={{ flex: 1 }}
              />
            </Image>
            <TouchableOpacity onPress={() => this.getCertified(navigate)}>
              <Text style={[styles.button, styles.greenButton]}>Get certified</Text>
            </TouchableOpacity>
          </View>
        );
    }
  }

module.exports = TrainerCertificationScreen;
