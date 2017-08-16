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

export default class MessagesScreenV2 extends React.Component {
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
            threads: [],
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
        console.log('THE MESSAGE BEING SENT', messageToSend);
        if (this.state.currentMessage) {
            firebase.database().ref(`threads/${this.state.threadId}/messages`).push(messageToSend);
            this.setState({ currentMessage: null });
        }
    }

    displayMessages = () => (
      <List>
        {this.state.threads.map(item => (
          <ListItem
            title={}
          />
        ))}
      </List>
    )

    createThread = () => {
        const threadsRef = firebase.database().ref('threads/');
        const firstMessage = {
            _id: Math.round(Math.random() * 1000000),
            text: 'This is the first message!',
            createdAt: new Date(),
            user: {
                _id: 'trim_bot',
                name: 'TRIM BOT',
            },
        };
        threadsRef.once('value').then((snapshot) => {
            const threads = snapshot.val();
            const newThreadKey = threadsRef.push({
                users: [
                    this.state.userId,
                    this.state.name,
                ],
                createdAt: new Date(),
            }).key;
            firebase.database().ref(`threads/${newThreadKey}/messages`).push(firstMessage);
            this.setState({ threadId: newThreadKey });
            console.log('NEW THREAD CREATED', this.state.threadId);
        });
    }

    createArtificialThread = () => {
        const fakeTrainerID = 'fake_trainer_id';
        const fakeTrainerName = 'Chad MuscleMan';
        const threadsRef = firebase.database().ref('threads/');
        const firstMessage = {
            _id: Math.round(Math.random() * 1000000),
            text: 'This is the first message!',
            createdAt: new Date(),
            user: {
                _id: 'trim_bot',
                name: 'TRIM BOT',
            },
        };
        threadsRef.once('value').then((snapshot) => {
            const threads = snapshot.val();
            const newThreadKey = threadsRef.push({
                users: [
                    this.state.userId,
                    this.state.name,
                    fakeTrainerID,
                    fakeTrainerName,
                ],
                createdAt: new Date(),
            }).key;
            firebase.database().ref(`threads/${newThreadKey}/messages`).push(firstMessage);
            this.setState({ threadId: newThreadKey });
            console.log('NEW THREAD CREATED', this.state.threadId);
        });
    }

    logThreads = () => {
        const threadsRef = firebase.database().ref('threads/');
        threadsRef.once('value').then((snapshot) => {
            const threads = snapshot.val();
            // const newThreadKey = threadsRef.push({
            //     users: [this.state.userId],
            // }).key;
            // firebase.database().ref(`threads/${newThreadKey}/messages`).push(firstMessage);
            // this.setState({ threadId: newThreadKey });
            console.log('THREADS:', threads);
        });
    }

    logSortedThreads = () => {
        const fakeTrainerID = 'fake_trainer_id';
        const fakeTrainerName = 'Chad MuscleMan';
        const threadsRef = firebase.database().ref('threads/');
        threadsRef.once('value').then((snapshot) => {
            const threads = Object.values(snapshot.val());
            const filteredThreads = threads.filter(thread => thread.users.indexOf(fakeTrainerID) !== -1);
            this.setState({ threads: filteredThreads });
            console.log('FILTERED THREADS:', this.state.threads);
        });
    }

    navigateToThread = (navigate) => {
        navigate('MessengerV2', { currentThread: this.state.threadId });
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
            <TouchableOpacity onPress={() => this.createThread(navigate)}>
              <Text style={[styles.button, styles.greenButton]}>Create Thread</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.createArtificialThread()}>
              <Text style={[styles.button, styles.greenButton]}>Create Artificial Thread</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.logThreads()}>
              <Text style={[styles.button, styles.greenButton]}>Log Threads</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.logSortedThreads()}>
              <Text style={[styles.button, styles.greenButton]}>Log Sorted Threads</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.navigateToThread(navigate)}>
              <Text style={[styles.button, styles.greenButton, { backgroundColor: 'blue' }]}>Navigate To Thread</Text>
            </TouchableOpacity>
          </View>
        );
    }
}
