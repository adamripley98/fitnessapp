import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, ScrollView, Dimensions, Image } from 'react-native';
import Modal from 'react-native-modal';
import ModalBox from 'react-native-modalbox';
import { List, ListItem } from 'react-native-elements';

import styless from '../ModalStyle';

const editProfPic = require('../../assets/icons/editprof.png');

// const screen = Dimensions.get('window');
const { width, height } = Dimensions.get('window');

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
        width,
    },
    titleView: {
        paddingTop: 5,
        paddingLeft: 40,
    },
    subtitleView: {
        paddingTop: 2,
        paddingLeft: 40,
    },
    ratingImage: {
        height: 19.21,
        width: 100,
    },
    ratingText: {
        paddingLeft: 10,
        color: 'grey',
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
      <TouchableOpacity
        key={Math.random()}
        onPress={() => this.props.navigate('TrainerProfileV2', { prof })}
      >
        <View style={styles.container}>
          <Image
            source={{ uri: prof.photoURL }}
            style={styles.backButtonIcon}
            resizeMode="contain"
          />
          <Text>{prof.fullName}</Text>
          <Text>Rating: {((Math.random() * 2) + 3).toFixed(1)}/5.0</Text>
          <Text>{prof.miles} miles away</Text>
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

    renderProfV2 = prof => (
      <ListItem
        roundAvatar
        key={prof.id}
        title={prof.fullName}
        subtitle={`${prof.miles} miles away`}
        avatar={{ uri: prof.photoURL }}
      />
  )

    renderListV2 = () => {
        const list = [];
        const nearby = [...this.props.nearby];
        const nearbySorted = this.sortByDistance(nearby);
        const trainerItems = nearbySorted.map(prof =>
          (<ListItem
            onPress={() => this.props.navigate('TrainerProfileV2', { prof })}
            avatar={{ uri: prof.photoURL }}
            roundAvatar
            avatarStyle={{ width: 60, height: 60 }}
            avatarContainerStyle={{ width: 60, height: 60, borderRadius: 80 }}
            avatarOverlayContainerStyle={{ width: 60, height: 60, borderRadius: 80 }}
            style={{ width, padding: 10, borderBottomWidth: 1, borderColor: 'orange' }}
            key={Math.random()}
            title={
              <View style={styles.titleView}>
                <Text>{prof.fullName}</Text>
              </View>
            }
            subtitle={
              <View style={[styles.subtitleView, { paddingBottom: 5 }]}>
                <Text style={styles.ratingText}>Distance: {prof.miles} miles away</Text>
                <Text style={styles.ratingText}>Rating: {((Math.random() * 2) + 3).toFixed(1)}/5.0</Text>
              </View>
            }
          />),
        );
        return trainerItems;
    }

    // ORIGINAL RETURN
    // <View style={styless.bottomModal}>
    //   <ScrollView
    //     showsVerticalScrollIndicator={false}
    //     decelerationRate={'fast'}
    //   >
    //     <View style={{ justifyContent: 'center' }}>
    //       {this.renderList()}
    //     </View>
    //   </ScrollView>
    // </View>
    render() {
        return (
          <View style={{ width, height }}>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'orange',
                marginTop: 10,
                padding: 10,
            }}
            >
              <Text style={{ fontSize: 25 }}>Trainers Nearby</Text>
            </View>
            <List>
              {this.renderListV2()}
            </List>
          </View>
        );
    }
}
