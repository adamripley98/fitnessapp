import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import firebase from 'firebase';
import $ from 'jquery';
import { GiftedChat, Actions, Bubble } from 'react-native-gifted-chat';

import CustomActions from './CustomActions';
import CustomView from './CustomView';

export default class Messenger extends React.Component {
    static navigationOptions = {
        title: 'Messenger',
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            loadEarlier: true,
            typingText: null,
            isLoadingEarlier: false,
            currentThread: this.props.navigation.state.params.currentThread,
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

    nameGenerator() {
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        const lettersArr = letters.split('');
    }

    componentWillMount() {
        this._isMounted = true;
        const ref = firebase.database().ref(`threads/${this.state.currentThread}/messages`);
        ref.on('value', (snapshot) => {
            console.log('snapshot', snapshot.val());
            this.setState(() => ({
                messages: this.state.messages.slice(0).push(snapshot.val()),
            }));
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
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));

    // for demo purpose
        this.answerDemo(messages);
    }

    answerDemo(messages) {
        if (messages.length > 0) {
            if ((messages[0].image || messages[0].location) || !this._isAlright) {
                this.setState(previousState => ({
                    typingText: 'React Native is typing',
                }));
            }
        }

        setTimeout(() => {
            if (this._isMounted === true) {
                if (messages.length > 0) {
                    if (messages[0].image) {
                        this.onReceive('Nice picture!');
                    } else if (messages[0].location) {
                        this.onReceive('My favorite place');
                    } else if (!this._isAlright) {
                        this._isAlright = true;
                        this.onReceive('Alright');
                    }
                }
            }

            this.setState(previousState => ({
                typingText: null,
            }));
        }, 1000);
    }

    onReceive(text) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, {
                _id: Math.round(Math.random() * 1000000),
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
        const { navigate } = this.props.navigation;
        console.log('messages', this.state.messages);
        // return (
        //   <GiftedChat
        //     messages={this.state.messages}
        //     onSend={this.onSend}
        //     loadEarlier={this.state.loadEarlier}
        //     onLoadEarlier={this.onLoadEarlier}
        //     isLoadingEarlier={this.state.isLoadingEarlier}
        //
        //     user={{
        //         _id: 1, // sent messages should have same user._id
        //     }}
        //
        //     renderActions={this.renderCustomActions}
        //     renderBubble={this.renderBubble}
        //     renderCustomView={this.renderCustomView}
        //     renderFooter={this.renderFooter}
        //   />
        // );
        return (
          <Text>{this.state.currentThread}</Text>
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