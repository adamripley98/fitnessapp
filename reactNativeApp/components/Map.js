import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import MapStyle from './mapStyle.json';

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRegion: {
                latitude: null,
                longitude: null,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
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
                      latitudeDelta: 0.02,
                      longitudeDelta: 0.02,
                  }}
                  showsUserLocation
                  provider={PROVIDER_GOOGLE}
                  customMapStyle={MapStyle}
                />
              </View>
            );
        }
        return (
          <View style={styles.container}>
            <Text>No</Text>
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
    },
    map: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
});
