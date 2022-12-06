declare module 'react-native-voip-push-kit' {
  export default class VoipPushKit {
    static getPushKitDeviceToken(handler: () => void) {}

    static RemotePushKitNotificationReceived(handler: () => void) {}

    static removeEventListener(
      type: 'notification' | 'register',
      handler: () => void
    ) {}

    static requestPermissions() {}
  }
}
