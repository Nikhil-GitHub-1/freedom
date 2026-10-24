/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
  AuthorizationStatus,
  getMessaging,
  getToken,
  onMessage,
  requestPermission,
} from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import { OfflineFirstTodoEntry } from './src/features/offline-first-todo-app';
import { NavigationWrapper } from './src/navigation/NavigationContainer';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    const messaging = getMessaging();

    async function requestUserPermission() {
      // Request Firebase permission (iOS)
      const authStatus = await requestPermission(messaging);
      const enabled =
        authStatus === AuthorizationStatus.AUTHORIZED ||
        authStatus === AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        getFCMToken();
      }
    }
    async function getFCMToken() {
      try {
        const token = await getToken(messaging);
        console.log('FCM Device Token:', token);
        // Send this token to your backend server to target this device
      } catch (error) {
        console.log('Error fetching FCM token', error);
      }
    }

    requestUserPermission();

    // Listen for foreground messages
    const unsubscribe = onMessage(messaging, async remoteMessage => {
      console.log(
        'A new FCM message arrived in foreground',
        remoteMessage?.notification?.title,
      );

      if (remoteMessage.notification?.title) {
        Alert.alert(
          remoteMessage.notification.title,
          remoteMessage.notification.body || '',
        );
      }

      // Display a heads-up notification using Notifee
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
      console.log('Notification channel created with ID:', channelId);
      try {
        const x = await notifee.displayNotification({
          title: remoteMessage.notification?.title,
          body: remoteMessage.notification?.body,
          android: {
            channelId,
            pressAction: { id: 'default' },
          },
        });

        console.log('Notification displayed:', x);
      } catch (error) {
        console.error('Error displaying notification:', error);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationWrapper />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const [activeFeature, setActiveFeature] = useState<'todo' | null>(null);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: safeAreaInsets.top,
          paddingBottom: safeAreaInsets.bottom,
          paddingLeft: safeAreaInsets.left,
          paddingRight: safeAreaInsets.right,
        },
      ]}>
      {activeFeature === 'todo' ? (
        <>
          <Pressable
            accessibilityRole="button"
            onPress={() => setActiveFeature(null)}
            style={styles.backButton}>
            <Text style={styles.link}>Back to home</Text>
          </Pressable>
          <OfflineFirstTodoEntry />
        </>
      ) : (
        <View style={styles.home}>
          <Text style={styles.title}>Home</Text>
          <Text style={styles.description}>
            Choose a feature to get started.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => setActiveFeature('todo')}
            style={({ pressed }) => [
              styles.featureCard,
              pressed && styles.featureCardPressed,
            ]}>
            <Text style={styles.featureTitle}>Offline-first todo</Text>
            <Text style={styles.link}>Open todo app</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  home: {
    padding: 24,
  },
  title: {
    color: '#111827',
    fontSize: 32,
    fontWeight: '700',
  },
  description: {
    color: '#4b5563',
    fontSize: 16,
    marginTop: 8,
  },
  featureCard: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    marginTop: 24,
    padding: 20,
    gap: 12,
  },
  featureCardPressed: {
    opacity: 0.7,
  },
  featureTitle: {
    color: '#111827',
    fontSize: 20,
    fontWeight: '600',
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  link: {
    color: '#1d4ed8',
    fontSize: 16,
  },
});

export default App;
