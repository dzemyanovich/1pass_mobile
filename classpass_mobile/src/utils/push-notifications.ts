import firebase from '@react-native-firebase/app';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

import { Android, iOS } from './utils';
import firebaseCreds from './firebase-creds';

const androidChannelId = 'default';
let createdChannelId: string;

async function initPushNotifications() {
  if (iOS()) {
    await notifee.requestPermission();
  }

  if (Android()) {
    createdChannelId = await notifee.createChannel({
      id: androidChannelId,
      name: 'Default Channel',
    });
  }
}

export async function sendLocalNotification(title: string, body: string): Promise<void> {
  await notifee.displayNotification({
    title,
    body,
    android: {
      channelId: createdChannelId,
      pressAction: {
        id: androidChannelId,
      },
    },
  });
}

export async function initFirebase(onFirebaseMessage: FirebaseMessageFunc): Promise<string> {
  if (!firebase.apps.length) {
    await firebase.initializeApp(firebaseCreds);
  }

  if (Android()) {
    await messaging().registerDeviceForRemoteMessages();
  }

  const firebaseToken = await messaging().getToken();
  console.log('### Firebase Token', firebaseToken);

  messaging().onMessage(onFirebaseMessage);
  messaging().setBackgroundMessageHandler(async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
    console.log('### Message handled in the background!', remoteMessage);
  });

  await initPushNotifications();

  return firebaseToken;
}
