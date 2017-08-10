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
        title: 'Welcome',
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
    }

    componentWillMount() {
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
            userId: this.state.userId,
            body: this.state.currentMessage,
        };
        if (this.state.currentMessage) {
            firebase.database().ref(`threads/${this.state.threadId}/messages`).push(messageToSend);
            this.setState({ currentMessage: null });
        }
    }

    createThread = () => {
        const firstMessage = {
            userId: 'TRIM_BOT',
            body: 'This is the start of your conversation with your trainer',
        };
        const threadsRef = firebase.database().ref('threads/');
        threadsRef.once('value').then((snapshot) => {
            const threads = snapshot.val();
            if (true) {
                const newThreadKey = threadsRef.push({
                    users: [this.state.userId],
                }).key;
                firebase.database().ref(`threads/${newThreadKey}/messages`).push(firstMessage);
                this.setState({ threadId: newThreadKey });
            }
        });
    }

    displayMessages = () => {
        const ref = firebase.database().ref(`threads/${this.state.threadId}/messages`);
        const messages = [];
        ref.on('value', (snapshot) => {
            for (const key in snapshot.val()) {
                if (snapshot.val()[key].userId === this.state.userId) {
                    messages.push(snapshot.val()[key].body);
                }
            }
        });
        return (
          <List>
            {
              messages.map(item => (
                <Text>{item}</Text>
              ))
            }
          </List>
        );
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
            {this.displayMessages()}
            <TextInput
              placeholder={'Send a message'}
              onChangeText={message => this.setState({ currentMessage: message })}
              value={this.state.currentMessage}
            />
            <TouchableOpacity onPress={() => this.createThread()}>
              <Text style={[styles.button, styles.greenButton]}>Create Thread</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.sendMessage()}>
              <Text style={[styles.button, styles.greenButton]}>Send Message</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.displayMessages()}>
              <Text style={[styles.button, styles.greenButton]}>Log Message</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.signOut()}>
              <Text style={[styles.button, styles.greenButton, { backgroundColor: 'red' }]}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        );
    }
  }

module.exports = MessagesScreen;
