declare module 'react-native-voip-push-kit' {
  export default class VoipPushKit {
    static getPushKitDeviceToken(handler: any);

    static RemotePushKitNotificationReceived(handler: any);

    static removeEventListener(type: 'notification' | 'register', handler: any);

    static requestPermissions();
  }
}
