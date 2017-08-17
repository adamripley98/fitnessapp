import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, ScrollView, Dimensions, Image } from 'react-native';
import Modal from 'react-native-modal';
import ModalBox from 'react-native-modalbox';

import styless from '../ModalStyle';

const editProfPic = require('../logos/editprof.png');

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
    backButtonIcon: {
        width: 80,
        height: 80,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        marginBottom: 20,
    },
});
export default class BottomModal extends Component {

    sortByDistance = (nearby) => {
        nearby.sort((a, b) => {
            if (a.miles < b.miles) {
                return -1;
            }
            return 1;
        });
        return nearby;
    }

    renderProf = prof => (
      <TouchableOpacity key={Math.random()}>
        <View style={styles.container}>
          <Image
            source={{ uri: prof.photoURL }}
            style={styles.backButtonIcon}
            resizeMode="contain"
          />
          <Text>{prof.fullName}</Text>
          <Text>Rating: 5/5</Text>
          <Text>{prof.miles} miles away</Text>
          <Text>ID: {prof.uid}</Text>
        </View>
      </TouchableOpacity>
    )

    renderList() {
        const list = [];
        const nearby = [...this.props.nearby];
        const nearbySorted = this.sortByDistance(nearby);
        nearbySorted.forEach((prof) => {
            list.push(this.renderProf(prof));
        });
        return list;
    }

    render() {
        return (
          <View style={[styless.bottomModal, { zIndex: 1 }]}>
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
