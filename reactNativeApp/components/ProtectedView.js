import {
  ActivityIndicator,
  AsyncStorage,
  TouchableHighlight,
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import firebase from 'firebase';

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
    // constructor(props) {
    //     super(props);
    //     // this.state = {
    //     //     showIndicator: false,
    //     // };
    // }

    // componentWillMount() {
    //     // this.setState({
    //     //     showIndicator: true,
    //     // });
    // }

    // _fetchData = () => {
    //     AsyncStorage.getItem('jwt', (err, token) => {
    //         console.log('what is my token', token);
    //         fetch('http://localhost:3000/protected', {
    //             headers: {
    //                 Accept: 'application/json',
    //                 authorization: `JWT ${token}`,
    //             },
    //         })
    //         .then(response => response.json())
    //         .then((json) => {
    //             console.log('what is json', json);
    //             this.setState({
    //                 secret: json.secret,
    //                 showIndicator: false,
    //             });
    //         })
    //         .catch((e) => {
    //             console.log('There was an error fetching the secret info.', e);
    //             alert('There was an error fetching the secret info.');
    //         })
    //         .done();
    //     });
    // }

    // _renderIndicator = () => (
    //   <ActivityIndicator
    //     animating
    //     style={[styles.centering]}
    //     size="large"
    //   />
    // )

    // _renderSecret = () => (
    //   <Text>
    //     The secret code is {this.state.secret}
    //   </Text>
    // )
    logout(navigate) {
        firebase.auth().signOut().then(() => {
        // Sign-out successful.
            navigate('Log');
        }).catch((error) => {
        // An error happened.
            alert(error.message);
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
              // User is signed in.
                navigate('Log');
            }
        });
        return (
          <View style={styles.container}>
            {
              <Text style={styles.centering}>hey there sexi :P</Text>
            }
            <TouchableHighlight onPress={() => this.logout(navigate)}>
              <Text style={[styles.button, styles.greenButton]}>Log out</Text>
            </TouchableHighlight>
          </View>
        );
    }
  }

module.exports = ProtectedView;
