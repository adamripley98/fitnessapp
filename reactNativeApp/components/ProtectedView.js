import {
  ActivityIndicator,
  AsyncStorage,
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 80,
        flex: 1,
        flexDirection: 'column',
    },
    button: {
        borderRadius: 4,
        padding: 20,
        textAlign: 'center',
        marginBottom: 20,
        color: '#fff',
    },
    greenButton: {
        backgroundColor: '#4CD964',
    },
    blueButton: {
        backgroundColor: '#34AADC',
    },
    centering: {
        flex: 1,
        paddingTop: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

class ProtectedView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showIndicator: false,
            secret: null,
        };
    }

    componentWillMount() {
        this.setState({
            showIndicator: true,
        }, this._fetchData);
    }

    _fetchData = () => {
        AsyncStorage.getItem('jwt', (err, token) => {
            console.log('what is my token', token);
            fetch('http://localhost:3000/protected', {
                headers: {
                    Accept: 'application/json',
                    authorization: `JWT ${token}`,
                },
            })
            .then(response => response.json())
            .then((json) => {
                console.log('what is json', json);
                this.setState({
                    secret: json.secret,
                    showIndicator: false,
                });
            })
            .catch((e) => {
                console.log('There was an error fetching the secret info.', e);
                alert('There was an error fetching the secret info.');
            })
            .done();
        });
    }

    _renderIndicator = () => (
      <ActivityIndicator
        animating
        style={[styles.centering]}
        size="large"
      />
    )

    _renderSecret = () => (
      <Text>
        The secret code is {this.state.secret}
      </Text>
    )

    render() {
        return (
          <View style={styles.container}>
            {
              this.state.showIndicator
              ? this._renderIndicator()
              :
              <Text style={styles.centering}>
                {this.state.secret ? this._renderSecret() : <Text>You are not authorized!</Text>}
              </Text>
            }
          </View>
        );
    }
  }

module.exports = ProtectedView;
