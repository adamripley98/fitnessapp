import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import ModalBox from 'react-native-modalbox';
import Orientation from 'react-native-orientation';

import BottomModal from './modalComponents/BottomModal';
import Menu from './Menu';
import Map from './MapScreen';
import UserProfileScreen from './UserProfileScreen';
import Payment from './Payment';

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

export default class HomeV2 extends Component {
    static navigationOptions = {
        title: 'Home',
        header: null,
    };
    constructor(props) {
        super(props);

        const { navigate } = this.props.navigation;

        this.toggle = this.toggle.bind(this);

        this.state = {
            isOpen: false,
            selectedItem: 'Map',
            bottomModalIsOpen: false,
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }

    onMenuItemSelected = item =>
    this.setState({
        isOpen: false,
        selectedItem: item,
    });

    onMenuXPressed = () => {
        this.setState({
            isOpen: false,
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
    mainPageRender = () => {
        switch (this.state.selectedItem) {
            case 'Map':
                return (<Map />);
            case 'UserProfileScreen':
                return (<UserProfileScreen />);
            case 'Payment':
                return (<Payment />);
            default:
                return (<Map />);
        }
    }

    render() {
        const menu = (<Menu
          onItemSelected={this.onMenuItemSelected}
          xPressed={this.onMenuXPressed}
        />);

        return (
          <View style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width }}>
            <SideMenu
              menu={menu}
              isOpen={this.state.isOpen}
              onChange={isOpen => this.updateMenuState(isOpen)}
              openMenuOffset={Dimensions.get('window').width}
            >
              <View style={styles.container}>
                {this.mainPageRender()}
              </View>
              {this.menuButton()}
              {this.bottomButton()}
              {this.bottomModalFrame()}
            </SideMenu>
          </View>
        );
    }
}
