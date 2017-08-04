import React, { Component } from 'react';
import { Text, TouchableOpacity, View, ScrollView, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import ModalBox from 'react-native-modalbox';

import styles from '../ModalStyle';

const screen = Dimensions.get('window');

export default class LeftModal extends Component {
    render() {
        return (
          <View style={styles.modalContent}>
            <Text>This is the Left Modal</Text>
          </View>
        );
    }
}
