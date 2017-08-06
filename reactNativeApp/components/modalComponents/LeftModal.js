import React, { Component } from 'react';
import { Text, TouchableOpacity, View, ScrollView, Dimensions, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';
import ModalBox from 'react-native-modalbox';

import style from '../ModalStyle';

const window = Dimensions.get('window');
const uri1 = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';
const uri = 'http://www.pngpix.com/wp-content/uploads/2016/10/PNGPIX-COM-Duck-PNG-Transparent-Image-1-500x587.png';
const profPic = '../assets/jchen.png'; const screen = Dimensions.get('window');

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#ff5c41',
        padding: 20,
    },
    avatarContainer: {
        marginBottom: 20,
        marginTop: 20,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        flex: 1,
    },
    name: {
        position: 'absolute',
        left: 70,
        top: 20,
    },
    item: {
        fontSize: 14,
        fontWeight: '300',
        paddingTop: 5,
    },
});

export default function LeftModal({ onItemSelected }) {
    return (
      <View style={style.leftModalContent}>
        <ScrollView scrollsToTop={false} style={styles.menu}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={{ uri }}
            />
            <Text style={styles.name}>Jeffrey Chen</Text>
          </View>

          <Text
            onPress={() => onItemSelected('About')}
            style={styles.item}
          >
            About
          </Text>

          <Text
            onPress={() => onItemSelected('Contacts')}
            style={styles.item}
          >
            Contacts
          </Text>
        </ScrollView>
      </View>
    );
}
