import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { GiftedChat, Actions, Bubble } from 'react-native-gifted-chat';
import firebase from 'firebase';

import CustomActions from './CustomActions';
import CustomView from './CustomView';

export default class Example extends React.Component {
    static navigationOptions = {
        title: 'Messenger',
        header: null,
    };

    constructor(props) {
        console.log('l');

        super(props);
        const { navigate } = this.props.navigation;
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                navigate('Log');
            }
        });
        this.params = this.props.navigation.state.params;
        this.state = {
            messages: [],
            loadEarlier: false,
            typingText: null,
            isLoadingEarlier: false,
            currentThread: this.params.currentThread,
            readyToStart: false,
        };
        this._isMounted = false;
        this.onSend = this.onSend.bind(this);
        this.onReceive = this.onReceive.bind(this);
        this.renderCustomActions = this.renderCustomActions.bind(this);
        this.renderBubble = this.renderBubble.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.onLoadEarlier = this.onLoadEarlier.bind(this);

        this._isAlright = null;
    }

    componentWillMount() {
        const { navigate } = this.props.navigation;
        this._isMounted = true;
        const ref = firebase.database().ref(`threads/${this.state.currentThread}/messages`);
        ref.on('value', (snapshot) => {
            console.log('snapshotinmessage', snapshot.val());
            this.setState(() => ({
                messages: Object.values(snapshot.val()).reverse(),
            }));
        });
        const reff = firebase.database().ref(`threads/${this.state.currentThread}`);
        reff.on('value', (snapshot) => {
            console.log('tf is snapshotval here', snapshot.val().readyToStart);
            if (snapshot.val().readyToStart === true) {
                // console.log('uzers', snapshot.val().users);
                navigate('Timer', { users: snapshot.val().users });
            }
        });
        console.log('messenger thread', this.state.currentThread);
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    name: user.displayName,
                    userId: user.uid,
                });
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onLoadEarlier() {
        this.setState(previousState => ({
            isLoadingEarlier: true,
        }));

        setTimeout(() => {
            if (this._isMounted === true) {
                this.setState(previousState => ({
                    messages: GiftedChat.prepend(previousState.messages, require('./data/old_messages.js')),
                    loadEarlier: false,
                    isLoadingEarlier: false,
                }));
            }
        }, 1000); // simulating network
    }

    onSend(messages = []) {
        const { navigate } = this.props.navigation;
        const messageToSend = messages[0].text;
        const messageObjToSend = {
            _id: Math.random(),
            text: messageToSend,
            createdAt: new Date(),
            user: {
                _id: this.state.userId,
                name: this.state.name,
            },
        };
        firebase.database().ref(`threads/${this.state.currentThread}/messages`).push(messageObjToSend);
        if (messageToSend === 'START') {
            console.log('yeeee');
            this.setState({ readyToStart: true });
            firebase.database().ref(`threads/${this.state.currentThread}`).update({
                readyToStart: true,
            });
        }
    }

    onReceive(text) {
        console.log('what is text', text);
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, {
                _id: Math.random(),
                text,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    // avatar: 'https://facebook.github.io/react/img/logo_og.png',
                },
            }),
        }));
    }

    renderCustomActions(props) {
        if (Platform.OS === 'ios') {
            return (
              <CustomActions
                {...props}
              />
            );
        }
        const options = {
            'Action 1': (props) => {
                alert('option 1');
            },
            'Action 2': (props) => {
                alert('option 2');
            },
            Cancel: () => {},
        };
        return (
          <Actions
            {...props}
            options={options}
          />
        );
    }

    renderBubble(props) {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
                left: {
                    backgroundColor: '#f0f0f0',
                },
            }}
          />
        );
    }

    renderCustomView(props) {
        return (
          <CustomView
            {...props}
          />
        );
    }

    renderFooter(props) {
        if (this.state.typingText) {
            return (
              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>
                  {this.state.typingText}
                </Text>
              </View>
            );
        }
        return null;
    }

    render() {
        return (
          <View style={{ backgroundColor: '#FFE0B2', flex: 1 }}>
            <GiftedChat
              messages={this.state.messages || []}
              onSend={this.onSend}
              loadEarlier={this.state.loadEarlier}
              onLoadEarlier={this.onLoadEarlier}
              isLoadingEarlier={this.state.isLoadingEarlier}

              user={{
                  _id: this.state.userId,
              }}
              renderBubble={this.renderBubble}
              renderCustomView={this.renderCustomView}
              renderFooter={this.renderFooter}
            />
          </View>
        );
    }
}

const styles = StyleSheet.create({
    footerContainer: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    footerText: {
        fontSize: 14,
        color: '#aaa',
    },
});
