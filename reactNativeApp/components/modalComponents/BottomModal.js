import React, { Component } from 'react';
import { Text, TouchableOpacity, View, ScrollView, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import ModalBox from 'react-native-modalbox';

import styles from '../ModalStyle';

const screen = Dimensions.get('window');

export default class BottomModal extends Component {
    renderList() {
        const list = [];

        for (let i = 0; i < 50; i++) {
            list.push(<Text key={i}>Elem {i}</Text>);
        }

        return list;
    }
    render() {
        return (
          <View style={styles.bottomModal}>
            <Text>Basic modal</Text>
            <Text>Basic modal</Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              decelerationRate={'fast'}
            >
              <View style={{ width: screen.width * 0.95, paddingLeft: 10 }}>
                {this.renderList()}
              </View>
            </ScrollView>
          </View>
        );
    }
}
