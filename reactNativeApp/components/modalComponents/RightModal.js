import React, { Component } from 'react';
import { Text, TouchableOpacity, View, ScrollView, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import ModalBox from 'react-native-modalbox';

import styles from '../ModalStyle';

const screen = Dimensions.get('window');

export default class RightModal extends Component {
    render() {
        return (
          <View style={styles.modalContent}>
            <Text>This is the Right Modal</Text>
          </View>
        );
    }
}
