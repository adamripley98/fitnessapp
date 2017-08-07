import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, View, ScrollView, Dimensions, Image, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import ModalBox from 'react-native-modalbox';

import styles from '../ModalStyle';
import menuStyles from '../MenuStyle';

const screen = Dimensions.get('window');
const xIcon = require('../../assets/icons/xIcon.png');

const window = Dimensions.get('window');
const uri1 = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';
const uri = 'http://www.pngpix.com/wp-content/uploads/2016/10/PNGPIX-COM-Duck-PNG-Transparent-Image-1-500x587.png';
const profPic = '../assets/jchen.png';

export default class LeftModal extends Component {
    state = {
        visibleModal: null,
    };

    onMenuItemSelected = (item) => {
        console.log(item);
        this.setState({
            isOpen: false,
            selectedItem: item,
        });
    };
    xButton = () => (
      <View style={styles.leftXButtonPosition}>
        <TouchableOpacity onPress={() => this.props.menuLeftXPressed()}>
          <View>
            <Image
              source={xIcon}
              style={{ width: 20, height: 20 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
    render() {
        return (
          <View style={{ width: '100%', height: '100%' }}>
            <ScrollView scrollsToTop={false} style={menuStyles.menu}>
              <View style={menuStyles.avatarContainer}>
                <Image
                  style={menuStyles.avatar}
                  source={{ uri }}
                />
                <Text style={menuStyles.name}>Jeffrey Chen</Text>
              </View>

              <Text
                onPress={() => this.onMenuItemSelected('About')}
                style={menuStyles.item}
              >
              About
              </Text>
              <Text
                onPress={() => this.onMenuItemSelected('Payment')}
                style={menuStyles.item}
              >
              Payment
              </Text>
            </ScrollView>
            {this.xButton()}
          </View>
        );
    }
}

LeftModal.propTypes = {
    menuLeftXPressed: PropTypes.func.isRequired,
};
