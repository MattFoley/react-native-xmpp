import React from 'react';
import {View, Text, ScrollView, TextInput, ListView, Dimensions}  from 'react-native';
import styles from './styles';
import Button from 'react-native-button';
import ActivityIndicator from './ActivityIndicator';
import xmpp from '../stores/XmppStore';

export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username:"tjtest3",
      password:"password"
    };
  }
  render(){
    return (
      <View style={[styles.container,{alignItems:'center'}]}>
        {xmpp.loginError && <Text style={{color:'red'}}>{xmpp.loginError}</Text>}
        <Text style={styles.categoryLabel}>Please enter login credentials</Text>
        <View style={styles.row}>
          <TextInput style={styles.rowInput}
                     autoCorrect={false}
                     autoCapitalize="none"
                     autoFocus={true}
                     placeholder="Username"
                     value={this.state.username}
                     onChangeText={(username)=>this.setState({
                       username: username,
                     })}
          />
        </View>
        <View style={styles.row}>
          <TextInput style={styles.rowInput}
                     autoCorrect={false}
                     autoCapitalize="none"
                     placeholder="Password"
                     value={this.state.password}
                     onChangeText={(password)=>this.setState({
                       password: password,
                     })}
          />
        </View>
        <View style={styles.lastRow}>
          <TextInput style={styles.rowInput}
                     autoCorrect={false}
                     autoCapitalize="none"
                     placeholder="Server IP"
                     value={this.state.ip}
                     onChangeText={(ip)=>this.setState({
                       ip:ip
                     })}
          />
        </View>
        <View style={styles.button}><Button onPress={()=>xmpp.login(this.state.username, this.state.password, this.state.ip)}>Login</Button></View>
        <ActivityIndicator active={xmpp.loading}/>

      </View>
    )
  }
}
