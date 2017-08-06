import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import Modal from 'react-native-modal';
import ModalBox from 'react-native-modalbox';
import LinearGradient from 'react-native-linear-gradient';

import LeftModal from './modalComponents/LeftModal';
import RightModal from './modalComponents/RightModal';
import BottomModal from './modalComponents/BottomModal';
import Map from './Map';
import styles from './ModalStyle';

const hamburgerIcon = require('../assets/icons/hamburgerIcon.png');
const settingsIcon = require('../assets/icons/settingsIcon.png');
const xIcon = require('../assets/icons/xIcon.png');

export default class Home extends Component {
    state = {
        visibleModal: null,
        bottomModalIsOpen: false,
    };

    onMenuItemSelected = (item) => {
        console.log(item);
        this.setState({
            isOpen: false,
            selectedItem: item,
        });
    };

    // LEFT
    leftButton = () => (
      <View style={styles.leftModalButton}>
        <TouchableOpacity onPress={() => this.setState({ visibleModal: 'left' })} >
          <Image
            source={hamburgerIcon}
            style={{ width: 36, height: 36 }}
          />
        </TouchableOpacity>
      </View>
    );
    leftModalFrame = () => (
      <Modal
        style={styles.leftModal}
        isVisible={this.state.visibleModal === 'left'}
        animationIn={'slideInLeft'}
        animationOut={'slideOutLeft'}
      >
        <View style={styles.modalContent}>
          <LeftModal onItemSelected={this.onMenuItemSelected} />
          {this.xButton()}
        </View>
      </Modal>
    );

    // RIGHT
    rightButton = () => (
      <View style={styles.rightModalButton}>
        <TouchableOpacity onPress={() => this.setState({ visibleModal: 'right' })}>
          <Image
            source={hamburgerIcon}
            style={{ width: 36, height: 36 }}
          />
        </TouchableOpacity>
      </View>
    );
    rightModalFrame = () => (
      <Modal
        style={styles.rightModal}
        isVisible={this.state.visibleModal === 'right'}
        animationIn={'slideInRight'}
        animationOut={'slideOutRight'}
      >
        <View style={styles.modalContent}>
          <Text>This is the right side</Text>
          {this.renderButton('Close', () => this.setState({ visibleModal: null }))}
          <RightModal />
        </View>
      </Modal>
    );


    // BOTTOM
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

    // GENERAL BUTTONS
    renderButton = (text, onPress) => (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <Text>{text}</Text>
        </View>
      </TouchableOpacity>
    );
    xButton = () => (
      <View style={styles.leftXButtonPosition}>
        <TouchableOpacity onPress={() => this.setState({ visibleModal: null })}>
          <View>
            <Image
              source={xIcon}
              style={{ width: 20, height: 20 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    )

    render() {
        console.log(this.state.visibleModal);
        return (
          <View style={styles.container}>
            <Map />
            {this.leftButton()}
            {this.rightButton()}
            {this.bottomButton()}
            {this.leftModalFrame()}
            {this.rightModalFrame()}
            {this.bottomModalFrame()}
          </View>
        );
    }
}
