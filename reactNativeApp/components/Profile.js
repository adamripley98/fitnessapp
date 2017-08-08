import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';

const screen = Dimensions.get('window');

export default class Profile extends Component {
    render() {
        return (
          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text>Profile</Text>
          </View>
        );
    }
}
