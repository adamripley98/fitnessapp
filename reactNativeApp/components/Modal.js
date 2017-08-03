import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

import styles from './ModalStyle';

export default class Modals extends Component {
    state = {
        visibleModal: null,
    };

    renderButton = (text, onPress) => (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <Text>{text}</Text>
        </View>
      </TouchableOpacity>
  );

    renderLeftModalContent = () => (
      <View style={styles.modalContent}>
        <Text>This is the left side</Text>
        {this.renderButton('Close', () => this.setState({ visibleModal: null }))}
      </View>
  );

    renderRightModalContent = () => (
      <View style={styles.modalContent}>
        <Text>This is the right side</Text>
        {this.renderButton('Close', () => this.setState({ visibleModal: null }))}
      </View>
  );

    render() {
        return (
          <View style={styles.container}>
            <Text>HELLO</Text>
            {this.renderButton('This should make the left side modal appear', () => this.setState({ visibleModal: 'left' }))}
            {this.renderButton('This should make the right side modal appear', () => this.setState({ visibleModal: 'right' }))}
            <Modal
              isVisible={this.state.visibleModal === 'left'}
              style={styles.leftModal}
              animationIn={'slideInLeft'}
              animationOut={'slideOutLeft'}
            >
              {this.renderLeftModalContent()}
            </Modal>
            <Modal
              isVisible={this.state.visibleModal === 'right'}
              style={styles.rightModal}
              animationIn={'slideInRight'}
              animationOut={'slideOutRight'}
            >
              {this.renderRightModalContent()}
            </Modal>
          </View>
        );
    }
}
