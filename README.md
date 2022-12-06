```javascript

  //For Push Kit
  VoipPushKit.requestPermissions();  // --- optional, you can use another library to request permissions
      
  //Ios PushKit device token Listner
  VoipPushKit.getPushKitDeviceToken((res) => {
    if(res.platform === 'ios'){
      setPushkitToken(res.deviceToken)
    }
  });
       
  //On Remote Push notification Recived in Forground
  VoipPushKit.RemotePushKitNotificationReceived((notification)=>{
    log(notification);
  });

```