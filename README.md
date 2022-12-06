## Installation

```bash
yarn add react-native-voip-push-kit
cd ios && pod install
```

The iOS version should be >= 8.0 since we are using [PushKit][1].

#### Enable VoIP Push Notification and Get VoIP Certificate

Make sure you enabled the folowing in `Xcode` -> `Signing & Capabilities`:

* `Background Modes` -> `Voice over IP` enabled
* `+Capability` -> `Push Notifications`

#### AppDelegate.m Modification

```objective-c
...

#import <PushKit/PushKit.h>                    /* <------ add this line */
#import "RNVoipPushKit.h"                     /* <------ add this line */

...

/* Add PushKit delegate method */

// --- Handle updated push credentials
- (void)pushRegistry:(PKPushRegistry *)registry didUpdatePushCredentials:(PKPushCredentials *)credentials forType:(PKPushType)type {
  // Register VoIP push token (a property of PKPushCredentials) with server
  [RNVoipPushKit didUpdatePushCredentials:credentials forType:(NSString *)type];
}

- (void)pushRegistry:(PKPushRegistry *)registry didInvalidatePushTokenForType:(PKPushType)type
{
  // --- The system calls this method when a previously provided push token is no longer valid for use. No action is necessary on your part to reregister the push type. Instead, use this method to notify your server not to send push notifications using the matching push token.
}

// --- Handle incoming pushes
- (void)pushRegistry:(PKPushRegistry *)registry didReceiveIncomingPushWithPayload:(PKPushPayload *)payload forType:(PKPushType)type withCompletionHandler:(void (^)(void))completion {
  
  // --- Retrieve information from your voip push payload
  NSString *uuid = payload.dictionaryPayload[@"uuid"];
  NSString *callerName = payload.dictionaryPayload[@"callerName"];
  NSString *handle = payload.dictionaryPayload[@"rid"];
  NSDictionary *extra = payload.dictionaryPayload;

  // --- Process the received push
  [RNVoipPushKit didReceiveIncomingPushWithPayload:payload forType:(NSString *)type];

  // --- You should make sure to report to callkit BEFORE execute `completion()`
  [RNCallKeep reportNewIncomingCall:uuid
                             handle:handle
                         handleType:@"generic"
                           hasVideo:true
                localizedCallerName:callerName
                    supportsHolding:YES
                       supportsDTMF:YES
                   supportsGrouping:YES
                 supportsUngrouping:YES
                        fromPushKit:YES
                            payload:extra
              withCompletionHandler:nil];
  
  // --- You don't need to call it if you stored `completion()` and will call it on the js side.
  completion();
}
...

@end
```

#### JS Code

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