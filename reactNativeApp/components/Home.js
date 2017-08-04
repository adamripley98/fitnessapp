import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import ModalBox from 'react-native-modalbox';

import LeftModal from './modalComponents/LeftModal';
import RightModal from './modalComponents/RightModal';
import BottomModal from './modalComponents/BottomModal';
import Map from './Map';
import styles from './ModalStyle';

export default class Home extends Component {
    state = {
        visibleModal: null,
        bottomModalIsOpen: false,
    };
    renderLeftModalContent = () => (
      <View style={styles.modalContent}>
        <Text>This is the left side</Text>
        {this.renderButton('Close', () => this.setState({ visibleModal: null }))}
        <LeftModal />
      </View>
    );
    renderRightModalContent = () => (
      <View style={styles.modalContent}>
        <Text>This is the right side</Text>
        {this.renderButton('Close', () => this.setState({ visibleModal: null }))}
        <RightModal />
      </View>
    );
    renderBottomModalContent = () => (
      <View style={styles.bottomModal}>
        <Text>Basic modal on Home</Text>
        <BottomModal />
      </View>
    );
    leftModalFrame = () => (
      <Modal
        style={styles.leftModal}
        isVisible={this.state.visibleModal === 'left'}
        animationIn={'slideInLeft'}
        animationOut={'slideOutLeft'}
      >
        {this.renderLeftModalContent()}
      </Modal>
    );
    rightModalFrame = () => (
      <Modal
        style={styles.rightModal}
        isVisible={this.state.visibleModal === 'right'}
        animationIn={'slideInRight'}
        animationOut={'slideOutRight'}
      >
        {this.renderRightModalContent()}
      </Modal>
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
        {this.renderBottomModalContent()}
      </ModalBox>
    );
    renderButton = (text, onPress) => (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <Text>{text}</Text>
        </View>
      </TouchableOpacity>
    );
    leftButton = (text, onPress) => (
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.button, { position: 'absolute', left: 10, top: 20 }]}>
          <Text>{text}</Text>
        </View>
      </TouchableOpacity>
    );
    rightButton = (text, onPress) => (
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.button, { position: 'absolute', right: 10, top: 20 }]}>
          <Text>{text}</Text>
        </View>
      </TouchableOpacity>
    );
    bottomButton = (text, onPress) => (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <Text>{text}</Text>
        </View>
      </TouchableOpacity>
    );

    render() {
        console.log(this.state.visibleModal);
        return (
          <View style={styles.container}>
            {this.leftButton('Left Modal', () => this.setState({ visibleModal: 'left' }))}
            {this.rightButton('Right Modal', () => this.setState({ visibleModal: 'right' }))}
            {this.bottomButton('Bottom ModalBox', () => this.setState({ bottomModalIsOpen: true }))}
            {this.leftModalFrame()}
            {this.rightModalFrame()}
            {this.bottomModalFrame()}
            <Map />
          </View>
        );
    }
}
