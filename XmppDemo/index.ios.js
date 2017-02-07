import React from 'react';
import {Router, Switch, Scene} from 'react-native-mobx';
import Conversation from './components/Conversation';

import XMPP from 'react-native-xmpp';
const DOMAIN = "localhost";
const SCHEMA = "ios";
import {observable} from 'mobx';
import autobind from 'autobind'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

@autobind
class XmppDemo extends React.Component {

  @observable logged = false;
  @observable loading = false;
  @observable loginError = null;
  @observable error = null;
  @observable conversation = [];

  constructor(props) {
    super(props);
    XMPP.on('loginError', this.onLoginError);
    XMPP.on('error', this.onError);
    XMPP.on('disconnect', this.onDisconnect);
    XMPP.on('login', this.onLogin);
    XMPP.on('message', this.onReceiveMessage);
  }

  startTest() {
    let remoteName = "test@" + DOMAIN;
    // try to login to test domain with the same password as username
    console.log('remoteName: ' + remoteName);
    XMPP.connect(remoteName, "password",);
  }

  onReceiveMessage({from, body}){
    console.log("onReceiveMessage from: " + from + " body: " + body);
  }

  onLoginError(){
    console.log("On Login Error");
  }

  onError(message){
    console.log("On Error: " + message);
  }

  onDisconnect(message){
    console.log("DISCONNECT: " + message);
  }

  onLogin(){
    console.log("LOGGED IN!");
    this.conversation.replace([]);
    this.loading = false;
    this.loginError = null;
    this.logged = true;

    this.messageCount = 0;
    console.log('Client Connected');
    this.messageInterval = setInterval(() => {
      this.messageCount++;
      if (this.messageCount < 1000) {
        XMPP.message("This is rnxmpp message #" + this.messageCount, "test2@" + DOMAIN);
      } else {
        clearInterval(this.messageInterval);
      }
    }, 50);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <TouchableHighlight style={styles.instructions} onPress={this.startTest.bind(this)}>
          <Text style={styles.instructions}>
            {"Start Me"}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('XmppDemo', () => XmppDemo);
