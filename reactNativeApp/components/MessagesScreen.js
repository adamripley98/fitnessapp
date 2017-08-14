import {
  ActivityIndicator,
  AsyncStorage,
  TouchableOpacity,
  Component,
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import React from 'react';
import firebase from 'firebase';

const { width, height } = Dimensions.get('window');
const background = require('./logos/bkg.jpg');

const styles = StyleSheet.create({
    banner: {
        width,
        height: 30,
        margin: 7,
        paddingTop: 10,
        backgroundColor: '#656964',
    },
    container: {
        marginTop: 40,
        padding: 10,
        flex: 1,
        flexDirection: 'column',
    },
    background: {
        width,
        height,
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    markWrap: {
        flex: 1,
        paddingVertical: 10,
        borderWidth: 5,
        borderRadius: 10,
    },
    mark: {
        width: 140,
        height: 140,
        // flex: 1,
        borderWidth: 4,
        borderRadius: 70,
    },
});

class MessagesScreen extends React.Component {
    static navigationOptions = {
        title: 'Messages Screen',
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            userId: null,
            threadId: null,
            currentMessage: null,
        };
        const { navigate } = this.props.navigation;
    }

    componentDidMount() {
        const { navigate } = this.props.navigation;
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                navigate('Log');
            } else {
                firebase.database().ref('messages/').on('value', (snapshot) => {
                    const currentMessages = snapshot.val();
                    if (currentMessages !== null) {
                        this.setState({
                            name: user.displayName,
                            userId: user.uid,
                            messages: currentMessages,
                        });
                    } else {
                        this.setState({
                            name: user.displayName,
                            userId: user.uid,
                        });
                    }
                });
            }
        });
    }


    sendMessage = () => {
        const messageToSend = {
            _id: Math.round(Math.random() * 1000000),
            text: this.state.currentMessage,
            createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
            user: {
                _id: this.state.userId,
                name: this.state.name,
            },
        };
        console.log(messageToSend);
        if (this.state.currentMessage) {
            firebase.database().ref(`threads/${this.state.threadId}/messages`).push(messageToSend);
            this.setState({ currentMessage: null });
        }
    }

    // const firstMessage = {
    //     _id: Math.round(Math.random() * 1000000),
    //     text: 'This is the first message.',
    //     createdAt: new Date(),
    //     user: {
    //         _id: 'TRIM_BOT',
    //         name: 'TRIM Bot',
    //     },
    // };
    // THIS ONE GOES INSIDE createThread()
    createThread = () => {
        const threadsRef = firebase.database().ref('threads/');
        threadsRef.once('value').then((snapshot) => {
            const threads = snapshot.val();
            if (true) {
                const newThreadKey = threadsRef.push({
                    users: [this.state.userId],
                }).key;
                // firebase.database().ref(`threads/${newThreadKey}/messages`).push(firstMessage);
                this.setState({ threadId: newThreadKey });
                console.log(this.state.threadId);
            }
        });
    }

    navigateToThread = (navigate) => {
        console.log('Screen ID', this.state.threadId);
        navigate('Messenger', { currentThread: this.state.threadId });
    }

    displayMessages = () => {
        const ref = firebase.database().ref(`threads/${this.state.threadId}/messages`);
        ref.on('value', (snapshot) => {
            console.log(snapshot.val());
            for (const key in snapshot.val()) {
                if (snapshot.val()[key].userId === this.state.userId) {
                    messages.push(snapshot.val()[key].text);
                }
            }
        });
        // return (
        //   <List>
        //     {
        //       messages.map(item => (
        //         <Text>{item}</Text>
        //       ))
        //     }
        //   </List>
        // );
    }

    signOut = () => {
        firebase.auth().signOut().then(() => {
            console.log('Signed out');
        }, (error) => {
            console.log('Sign out failed', error);
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
          <View style={styles.container}>
            <Text style={styles.centering}>Here are your messages, {this.state.name.split(' ')[0] || 'dood'}!</Text>
            <TextInput
              placeholder={'Send a message'}
              onChangeText={message => this.setState({ currentMessage: message })}
              value={this.state.currentMessage}
            />
            <TouchableOpacity onPress={() => this.createThread(navigate)}>
              <Text style={[styles.button, styles.greenButton]}>Create Thread</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.sendMessage()}>
              <Text style={[styles.button, styles.greenButton]}>Send Message</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.displayMessages()}>
              <Text style={[styles.button, styles.greenButton]}>Log Message</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.navigateToThread(navigate)}>
              <Text style={[styles.button, styles.greenButton, { backgroundColor: 'blue' }]}>Navigate To Thread</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.signOut()}>
              <Text style={[styles.button, styles.greenButton, { backgroundColor: 'red' }]}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        );
    }
  }

module.exports = MessagesScreen;
