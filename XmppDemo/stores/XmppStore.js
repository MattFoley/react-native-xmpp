import XMPP from 'react-native-xmpp';
const DOMAIN = "192.168.23.116";
const SCHEMA = "ios";
import {observable} from 'mobx';
import autobind from 'autobind'
@autobind
class XmppStore {
    @observable logged = false;
    @observable loading = false;
    @observable loginError = null;
    @observable error = null;
    @observable conversation = [];

    constructor() {
        XMPP.on('loginError', this.onLoginError);
        XMPP.on('error', this.onError);
        XMPP.on('disconnect', this.onDisconnect);
        XMPP.on('login', this.onLogin);
        XMPP.on('message', this.onReceiveMessage);
        // default values
        this.local = 'rntestuser1';
        this.remote = 'rntestuser2';
    }

    _userForName(name){
        return name + '@' + DOMAIN + "/" + SCHEMA;
    }

    sendMessage(message){
        if (!this.remote || !this.remote.trim()){
            console.error("No remote username is defined");
        }
        if (!message || !message.trim()){
            return false;
        }
        // add to list of messages
        this.conversation.unshift({own:true, text:message.trim()});
        // empty sent message
        this.error = null;
        // send to XMPP server
        XMPP.message(message.trim(), this._userForName(this.remote))
    }

    onReceiveMessage({from, body}){
        console.log("onReceiveMessage")
        // extract username from XMPP UID
        if (!from || !body){
            return;
        }
        var name = from.match(/^([^@]*)@/)[1];
        this.conversation.unshift({own:false, text:body});
    }

    onLoginError(){
        this.loading = false;
        this.conversation.replace([]);
        this.loginError = "Cannot authenticate, please use correct local username";
    }

    onError(message){
        this.error = message;
    }

    onDisconnect(message){
        this.logged = false;
        this.loginError = message;
    }

    onLogin(){
        console.log("LOGGED!");
        this.conversation.replace([]);
        this.loading = false;
        this.loginError = null;
        this.logged = true;
    }

    login(username, password, ip){
        this.username = username;
        this.password = password;

        let remoteName = username + '@' + (ip?ip:DOMAIN) + "/" + SCHEMA;
        // try to login to test domain with the same password as username
        console.log('remoteName: ' + remoteName);
        XMPP.connect(remoteName, password);
        this.loading = true;
    }

    disconnect() {
        XMPP.disconnect();
    }

}

export default new XmppStore();
