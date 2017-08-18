import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import Drawer from 'react-native-drawer';
import firebase from 'firebase';
import Modal from 'react-native-modal';

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
    button2: {
        backgroundColor: 'lightblue',
        padding: 12,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
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
        backgroundColor: '#FFAB91',
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
        // this.params = this.props.navigation.state.params;
        // const modalOpen = !!this.params.currentModalState;
        this.toggle = this.toggle.bind(this);

        this.state = {
            isOpen: false,
            selectedItem: 'Map',
            bottomModalIsOpen: false,
            nearby: [],
            visibleModal: null,
            animating: true,
        };
        const { navigate } = this.props.navigation;
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                navigate('Log');
            }
        });
    }

    componentDidMount() {
        const { navigate } = this.props.navigation;
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const userRef = firebase.database().ref(`/users/${user.uid}`);
                this.findPartners();
                userRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        console.log('SNAPSHOTVAL1', snapshot.val());
                        this.setState({
                            emailVerified: user.emailVerified,
                            name: snapshot.val().fullName,
                            profPic: snapshot.val().photoURL,
                            userId: user.uid,
                            isTrainer: snapshot.val().isTrainer,
                            isCertified: snapshot.val().isCertified,
                            userLat: snapshot.val().latitude,
                            userLong: snapshot.val().longitude,
                            isReady: snapshot.val().isReady,
                            clientConnected: snapshot.val().clientConnected,
                        });
                        if (snapshot.val().clientConnected !== false) {
                            console.log('YESYESYES!!');
                            this.setState({ visibleModal: null });
                            navigate('MessengerV2', { currentThread: snapshot.val().clientConnected });
                            userRef.update({
                                clientConnected: false,
                            });
                        }
                    }
                });
            }
        });
    }

    _renderButton = (text, onPress) => (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button2}>
          <Text>{text}</Text>
        </View>
      </TouchableOpacity>
 );

    _renderModalContent = () => (
      <View style={styles.modalContent}>
        <Text>Waiting for clients</Text>
        <ActivityIndicator
          animating={this.state.animating}
          style={[styles.centering, { height: 80 }]}
          size="large"
        />
      </View>
    );


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

    toggle() {
        this.setState({
            isOpen: true,
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

    closeMenu = () => {
        this.setState({ isOpen: false });
    }

    calcDistance = (lat1, lon1, lat2, lon2) => {
        const radlat1 = Math.PI * lat1 / 180;
        const radlat2 = Math.PI * lat2 / 180;
        const theta = lon1 - lon2;
        const radtheta = Math.PI * theta / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) *
        Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        console.log('You are', dist.toFixed(2), 'miles apart!');
        return dist.toFixed(2);
    }

    findPartners = () => {
        firebase.database().ref('/users/').once('value').then((snapshot) => {
            const users = snapshot.val();
            const nearby = [];
            for (const key in users) {
                const user = users[key];
                // calculates mile distance of trainers or users
                if (user.isTrainer !== this.state.isTrainer) {
                    const distance = this.calcDistance(this.state.userLat, this.state.userLong,
                      user.latitude, user.longitude);
                    if (distance <= 5) {
                        user.miles = distance;
                        nearby.push(user);
                    }
                }
            }
            this.setState({ nearby });
        });
    }

    certBanner = (navigate) => {
        if (this.state.isTrainer === false) {
            console.log('not a trainer');
        } else if (this.state.isCertified === true) {
            console.log('cert?', this.state.isCertified);
            console.log('already certified');
        } else {
            return (<TouchableOpacity onPress={() => this.getCertified(navigate)}>
              <Text style={styles.banner}> Get certified before training clients!</Text>
            </TouchableOpacity>);
        }
    }

    menuButton = () => (
      <TouchableOpacity
        onPress={() => {
            this.toggle();
            this.setState({ bottomModalIsOpen: false });
        }}
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
          onPress={() => {
              this.setState({ bottomModalIsOpen: true });
              this.findPartners();
          }}
        >
          <View style={styles.bottomButton}>
            <Text style={{ fontSize: 30 }}>Trainers</Text>
          </View>
        </TouchableHighlight>
      </View>
    );

    bottomTrainer = () => (
      <View style={styles.bottomModalButton}>
        <TouchableHighlight
          style={{ width: '100%', display: 'flex', alignItems: 'center' }}
          onPress={() => {
                // this.findPartners();
              console.log('this.state.clientConnected', this.state.clientConnected);
              this.setState({ visibleModal: 2 });
          }}
        >
          <View style={styles.bottomButton}>
            <Text style={{ fontSize: 30 }}>Look for Clients</Text>
          </View>
        </TouchableHighlight>
      </View>
    );

    bottomModalFrame = navigate => (
      <ModalBox
        style={styles.bottomModal}
        swipeToClose
        isOpen={this.state.bottomModalIsOpen}
        onClosed={() => this.setState({ bottomModalIsOpen: false })}
        swipeThreshold={175}
        swipeArea={100}
      >
        <View>
          <BottomModal
            style={{ width, height, backgroundColor: 'blue' }}
            nearby={this.state.nearby}
            navigate={navigate}
          />
        </View>
      </ModalBox>
    );

    render() {
        const { navigate } = this.props.navigation;
        const menu = (<Menu
          onItemSelected={this.onMenuItemSelected}
          xPressed={this.onMenuXPressed}
          name={this.state.name}
          profPic={this.state.profPic}
          isTrainer={this.state.isTrainer}
        />);
        if (this.state.userConnected) {
            console.log('yes daddy');
            alert('USER CONNECTEDDD!!!!');
        }
        return (
          <Drawer
            open={this.state.isOpen}
            type="overlay"
            content={menu}
            tapToClose
            openDrawerOffset={0.2} // 20% gap on the right side of drawer
            onClose={() => this.setState({ isOpen: false })}
            panCloseMask={0.2}
            closedDrawerOffset={-3}
            tweenHandler={ratio => ({
                main: { opacity: (2 - ratio) / 2 },
            })}
          >
            <View style={styles.container}>
              {/* BOTTOM SHOULD BE === true*/}
              {this.state.emailVerified === true ?
                <TouchableOpacity onPress={() => this.verifyEmail()}>
                  <Text style={styles.banner}> Click here to verify your email!</Text>
                </TouchableOpacity> :
                <View />}
              {this.certBanner(navigate)}
              <Modal
                isVisible={this.state.visibleModal === 2}
                animationIn={'slideInLeft'}
                animationOut={'slideOutRight'}
              >
                {this._renderModalContent()}
              </Modal>
              <Map nearby={this.state.nearby} />
              {this.state.isTrainer === false ?
                this.bottomButton() :
                this.bottomTrainer()
            }
              {this.state.isTrainer === false ?
                this.bottomModalFrame(navigate) :
                <View />
            }
              {this.menuButton()}
            </View>
          </Drawer>
        );
    }
}
