import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import Drawer from 'react-native-drawer';
import firebase from 'firebase';

import BottomModal from './modalComponents/BottomModal';
import Menu from './Menu';
import Map from './MapScreen';

const hamburgerIcon = require('../assets/icons/hamburgerIcon.png');

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
        };
    }

    componentDidMount() {
        const { navigate } = this.props.navigation;
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                navigate('Log');
            } else {
                this.setState({
                    emailVerified: user.emailVerified,
                    name: user.displayName,
                    profPic: user.photoURL,
                    userId: user.uid,
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
        console.log('this is item', item);
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
        <TouchableOpacity
          style={{ width: '100%', display: 'flex', alignItems: 'center' }}
          onPress={() => this.setState({ bottomModalIsOpen: true })}
        >
          <View style={styles.bottomButton}>
            <Text style={{ fontSize: 30 }}>Gyms</Text>
          </View>
        </TouchableOpacity>
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

    render() {
        const { navigate } = this.props.navigation;

        const menu = (<Menu
          onItemSelected={this.onMenuItemSelected}
          xPressed={this.onMenuXPressed}
          name={this.state.name}
          profPic={this.state.profPic}
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
              <Map />
              {this.bottomButton()}
              {this.bottomModalFrame()}
            </View>
            {this.menuButton()}
          </Drawer>
        );
    }
}
