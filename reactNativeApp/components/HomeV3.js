import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import Drawer from 'react-native-drawer';
import firebase from 'firebase';

import BottomModal from './modalComponents/BottomModal';
import Menu from './Menu';
import Map from './MapScreen';

const hamburgerIcon = require('../assets/icons/hamburgerIcon.png');

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        top: 20,
        left: 10,
        padding: 0,
    },
    caption: {
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    bottomModalButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '10%',
        bottom: 0,
    },
    bottomModal: {
        backgroundColor: 'white',
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        height: '100%',
        width: '100%',
    },
    bottomButton: {
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 10 },
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 0,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        width: '98%',
        height: '100%',
    },
    banner: {
        justifyContent: 'center',
        alignItems: 'center',
        width,
        height: 30,
        textAlign: 'center',
        paddingTop: 20,
        // marginTop: 50,
        paddingBottom: 30,
        backgroundColor: '#f44336',
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: 'black',
        shadowOffset: { height: 3, width: 3 },
    },
});

export default class HomeV3 extends Component {
    static navigationOptions = {
        title: 'Home',
        header: null,
    };
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            isOpen: false,
            selectedItem: 'Map',
            bottomModalIsOpen: false,
            nearby: [],
        };
    }

    componentDidMount() {
        const { navigate } = this.props.navigation;
        this.calcDistance(37.7749, 122.4194, 45, -122.406417);
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                navigate('Log');
            } else {
                const userRef = firebase.database().ref(`/users/${user.uid}`);
                userRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        console.log('what is snapVALLLL', snapshot.val());
                        this.setState({
                            emailVerified: user.emailVerified,
                            name: user.displayName,
                            profPic: user.photoURL,
                            userId: user.uid,
                            isTrainer: snapshot.val().isTrainer,
                            isCertified: snapshot.val().isCertified,
                            userLat: snapshot.val().latitude,
                            userLong: snapshot.val().longitude,
                        });
                    }
                });

            }
        });
    }

    onMenuItemSelected = (item) => {
        const { navigate } = this.props.navigation;
        this.setState({
            isOpen: false,
            selectedItem: item,
        });
        navigate(item);
    }

    onMenuXPressed = () => {
        this.setState({
            isOpen: false,
        });
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    verifyEmail = () => {
        firebase.auth().currentUser.sendEmailVerification().then(() => {
            console.log('verification email sent');
            alert('Verification email sent!');
        }).catch((error) => {
            alert('Error sending verification email');
            console.log('error sending verification email', error);
        });
    }

    getCertified = (navigate) => {
        console.log('getting certified');
        navigate('TrainerCertification');
    }

    calcDistance = (lat1, lon1, lat2, lon2) => {
        const radlat1 = Math.PI * lat1 / 180;
        const radlat2 = Math.PI * lat2 / 180;
        const theta = lon1 - lon2;
        const radtheta = Math.PI * theta / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        console.log('You are', dist.toFixed(2), 'miles apart!');
        return dist.toFixed(2);
    }

    certBanner = (navigate) => {
      if (this.state.isTrainer === false) {
          console.log('not a trainer');
      } else {
          if (this.state.isCertified === true) {
            console.log('cert?', this.state.isCertified);
            console.log('already certified');
          } else {
              return (<TouchableOpacity onPress={() => this.getCertified(navigate)}>
                <Text style={styles.banner}> Get certified before training clients!</Text>
              </TouchableOpacity>)
          }
      }
    }
    menuButton = () => (
      <TouchableOpacity
        onPress={this.toggle}
        style={styles.button}
      >
        <Image
          source={hamburgerIcon}
          style={{ width: 32, height: 32 }}
        />
      </TouchableOpacity>
    )
    bottomButton = () => (
      <View style={styles.bottomModalButton}>
        <TouchableHighlight
          style={{ width: '100%', display: 'flex', alignItems: 'center' }}
          onPress={() => this.setState({ bottomModalIsOpen: true })}
        >
          <View style={styles.bottomButton}>
            <Text style={{ fontSize: 30 }}>Gyms</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
    bottomModalFrame = () => (
      <ModalBox
        style={styles.bottomModal}
        swipeToClose
        isOpen={this.state.bottomModalIsOpen}
        onClosed={() => this.setState({ bottomModalIsOpen: false })}
        swipeThreshold={175}
        swipeArea={100}
      >
        <View style={styles.bottomModal}>
          <Text>Basic modal on Home</Text>
          <BottomModal />
        </View>
      </ModalBox>
    );

    findTrainers = () => {
        firebase.database().ref('/users/').once('value').then((snapshot) => {
            const users = snapshot.val();
            const nearby = [];
            for (let key in users) {
                let user = users[key];
                // calculates mile distance of trainers or users
                if (user.isTrainer !== this.state.isTrainer) {
                    const distance = this.calcDistance(this.state.userLat, this.state.userLong,
                      user.latitude, user.longitude);
                    if (distance <= 5) {
                        console.log(user.fullName, 'is only', distance, 'miles away!');
                        nearby.push(user);
                    }
                }
            }
            this.setState({ nearby });
            console.log('nearby are', this.state.nearby);
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        const menu = (<Menu
          onItemSelected={this.onMenuItemSelected}
          xPressed={this.onMenuXPressed}
          name={this.state.name}
          profPic={this.state.profPic}
          isTrainer={this.state.isTrainer}
        />);

        return (
          <Drawer
            open={this.state.isOpen}
            type="overlay"
            content={menu}
            tapToClose
            openDrawerOffset={0.2} // 20% gap on the right side of drawer
            panCloseMask={0.2}
            closedDrawerOffset={-3}
            tweenHandler={ratio => ({
                main: { opacity: (2 - ratio) / 2 },
            })}
          >
            <View style={styles.container}>
              {this.state.emailVerified === false ?
                <TouchableOpacity onPress={() => this.verifyEmail()}>
                  <Text style={styles.banner}> Click here to verify your email!</Text>
                </TouchableOpacity> :
                <View />}
              {this.certBanner(navigate)}
              <TouchableOpacity onPress={() => this.findTrainers()}>
                <Text style={styles.banner}>Find Partner</Text>
              </TouchableOpacity>
              <Map />
              {this.bottomButton()}
              {this.bottomModalFrame()}
            </View>
            {this.menuButton()}
          </Drawer>
        );
    }
}