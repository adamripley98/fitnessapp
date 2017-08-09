import React from 'react';
import { Animated, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import MapStyle from './mapStyle.json';

const currentLocation = require('../assets/icons/currentLocationFYTOrange.png');

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRegion: new MapView.AnimatedRegion({
                latitude: null,
                longitude: null,
                latitudeDelta: null,
                longitudeDelta: null,
            }),
        };
    }
    componentDidMount() {
        this.getCurrentCoords();
    }
    onRegionChange(region) {
        this.setState({
            currentRegion: new MapView.AnimatedRegion({
                latitude: region.latitude,
                longitude: region.longitude,
                latitudeDelta: region.latitudeDelta,
                longitudeDelta: region.longitudeDelta,
            }),
        });
    }
    getCurrentCoords() {
        navigator.geolocation.getCurrentPosition(
            (success) => {
                this.setState({
                    currentRegion: new MapView.AnimatedRegion({
                        latitude: success.coords.latitude,
                        longitude: success.coords.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }),
                });
            },
            (error) => {
            },
            {},
        );
    }
    moveToCurrentCoords() {
        navigator.geolocation.getCurrentPosition(
            (success) => {
                this.state.currentRegion.timing({
                    duration: 700,
                    latitude: success.coords.latitude,
                    longitude: success.coords.longitude,
                    latitudeDelta: 0.007,
                    longitudeDelta: 0.007,
                }).start();
            },
            (error) => {
            },
            {},
        );
    }
    render() {
        if (this.state.currentRegion.latitude && this.state.currentRegion.longitude) {
            return (
              <View style={styles.container}>
                <MapView.Animated
                  style={styles.map}
                  initialRegion={this.state.currentRegion}
                  region={this.state.currentRegion}
                  onRegionChange={this.onRegionChange.bind(this)}
                  showsUserLocation
                  provider={PROVIDER_GOOGLE}
                  customMapStyle={MapStyle}
                />
                <TouchableOpacity
                  onPress={this.moveToCurrentCoords.bind(this)}
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
        height: '100%',
        width: '100%',
    },
    currentLocation: {
        position: 'absolute',
        bottom: 150,
        right: 15,
    },
});
