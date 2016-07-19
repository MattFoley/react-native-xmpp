package ae.teletronics.react_native_xmpp;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.logging.Logger;

import ae.teletronics.react_native_xmpp.service.RNXMPPCommunicationBridge;
import ae.teletronics.react_native_xmpp.service.XmppServiceSmackImpl;

/**
 * Created by Kristian Frølund on 7/19/16.
 * Copyright (c) 2016. Teletronics. All rights reserved
 */
public class RNXMPPModule extends ReactContextBaseJavaModule implements ae.teletronics.react_native_xmpp.service.XmppService {

    public static final String MODULE_NAME = "RNXMPP";
    Logger logger = Logger.getLogger(RNXMPPModule.class.getName());
    XmppServiceSmackImpl xmppService;

    public RNXMPPModule(ReactApplicationContext reactContext) {
        super(reactContext);
        xmppService = new XmppServiceSmackImpl(new RNXMPPCommunicationBridge(reactContext));
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @Override
    @ReactMethod
    public void connect(String jid, String password, String authMethod){
        this.xmppService.connect(jid, password, authMethod);
    }

    @Override
    @ReactMethod
    public void message(String text, String to){
        this.xmppService.message(text, to);
    }

    @Override
    @ReactMethod
    public void presence(String to, String type) {
        this.xmppService.presence(to, type);
    }

    @Override
    @ReactMethod
    public void removeRoster(String to) {
        this.xmppService.removeRoster(to);
    }

    @Override
    @ReactMethod
    public void disconnect() {
        this.xmppService.disconnect();
    }

    @Override
    @ReactMethod
    public void fetchRoster() {
        this.xmppService.fetchRoster();
    }

    @Override
    @ReactMethod
    public void sendStanza(String stanza) {
        this.xmppService.sendStanza(stanza);
    }

    @Override
    @ReactMethod
    public void joinRoom(String roomId, String nickName) {
        this.xmppService.joinRoom(roomId, nickName);
    }

    @Override
    public void sendRoomMessage(String message){
        this.xmppService.sendRoomMessage(message);
    }

}
