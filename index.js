/**
 * @format
 */

import { Alert, AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { getMessaging } from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

// Handle background messages
getMessaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  Alert.alert(
    remoteMessage.notification?.title || 'Background Message',
    remoteMessage.notification?.body || '',
  );

  // Optionally display a notification via Notifee if payload doesn't automatically trigger one
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await notifee.displayNotification({
    title: remoteMessage.notification?.title,
    body: remoteMessage.notification?.body,
    android: { channelId },
  });
});

AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => require('@react-native-firebase/messaging').firebase.messaging().setBackgroundMessageHandler);
