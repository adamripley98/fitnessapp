import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import MapStyle from './mapStyle.json';

const currentLocation = require('../assets/icons/currentLocationFYTOrange.png');

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRegion: {
                latitude: null,
                longitude: null,
                latitudeDelta: null,
                longitudeDelta: null,
            },
        };
    }
    getCurrentCoords() {
        navigator.geolocation.getCurrentPosition(
            (success) => {
                console.log(success);
                this.setState({
                    currentRegion: {
                        latitude: success.coords.latitude,
                        longitude: success.coords.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    },
                });
            },
            (error) => {
            },
            {},
        );
    }
    componentDidMount() {
        this.getCurrentCoords();
    }
    render() {
        if (this.state.currentRegion.latitude && this.state.currentRegion.longitude) {
            return (
              <View style={styles.container}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                      latitude: this.state.currentRegion.latitude,
                      longitude: this.state.currentRegion.longitude,
                      latitudeDelta: this.state.currentRegion.latitudeDelta,
                      longitudeDelta: this.state.currentRegion.longitudeDelta,
                  }}
                  region={this.state.currentRegion}
                  showsUserLocation
                  provider={PROVIDER_GOOGLE}
                  customMapStyle={MapStyle}
                />
                <TouchableOpacity
                  onPress={this.getCurrentCoords.bind(this)}
                  style={styles.currentLocation}
                >
                  <Image
                    source={currentLocation}
                    style={{ width: 32, height: 32 }}
                  />
                </TouchableOpacity>
              </View>
            );
        }
        return (
          <View style={styles.container}>
            <Text>BOI</Text>
          </View>
        );
    }
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    map: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    currentLocation: {
        position: 'absolute',
        bottom: 100,
        right: 25,
    },
});
