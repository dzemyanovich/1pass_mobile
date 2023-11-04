import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { Animated } from 'react-native';
import { BottomNavigation, PaperProvider } from 'react-native-paper';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { ColorValue } from 'react-native';
import type { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

import store from './src/redux/store';
import MapTab from './src/components/tabs/map-tab';
import BookingsTab from './src/components/tabs/bookings-tab';
import ProfileTab from './src/components/tabs/profile-tab';
import SportObject from './src/components/pages/sport-object';
import Alert from './src/components/alert';
import SignIn from './src/components/pages/sign-in';
import SignUp from './src/components/pages/sign-up';
import { iOS } from './src/utils/utils';
import AuthVerifyCode from './src/components/pages/auth-verify-code';
import CompleteSignUp from './src/components/pages/complete-sign-up';
import { initFirebase, sendLocalNotification } from './src/utils/push-notifications';
import { CONFIRM_VISIT, SET_FIREBASE_TOKEN, SHOW_ALERT } from './src/redux/action-types';
import Loader from './src/components/loader';
import PageWrapper from './src/components/page-wrapper';
import type { NavigationProps, RootStackParamList, SignUpProps, SportObjectProps, VerifyCodeProps } from './custom-types';

// supress warn WARN Sending `onAnimatedValueUpdate` with no listeners registered
const av = new Animated.Value(0);
av.addListener(() => { });

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

function MapIcon({ color, size }: { color: number | ColorValue | undefined, size: number | undefined }) {
  return (
    <MaterialCommunityIcons name="map" color={color} size={size} />
  );
}

function BookingsIcon({ color, size }: { color: number | ColorValue | undefined, size: number | undefined }) {
  return (
    <MaterialCommunityIcons name="book-edit-outline" color={color} size={size} />
  );
}

function ProfileIcon({ color, size }: { color: number | ColorValue | undefined, size: number | undefined }) {
  return (
    <MaterialCommunityIcons name="account" color={color} size={size} />
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { title } = descriptors[route.key].options;
            return title;
          }}
        />
      )}
    >
      <Tab.Screen
        name="map"
        component={MapTab}
        options={{
          title: 'Map',
          tabBarIcon: MapIcon,
        }}
      />
      <Tab.Screen
        name="bookings"
        component={BookingsTabPage}
        options={{
          title: 'Bookings',
          tabBarIcon: BookingsIcon,
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileTabPage}
        options={{
          title: 'Profile',
          tabBarIcon: ProfileIcon,
        }}
      />
    </Tab.Navigator>
  );
}

function SportObjectPage(props: SportObjectProps) {
  return (
    <PageWrapper alignCenter={false}>
      <SportObject {...props} />
    </PageWrapper>
  );
}

function SignInPage(props: NavigationProps) {
  return (
    <PageWrapper>
      <SignIn {...props} />
    </PageWrapper>
  );
}

function SignUpPage(props: NavigationProps) {
  return (
    <PageWrapper>
      <SignUp {...props} />
    </PageWrapper>
  );
}

function VerifyCodePage(props: VerifyCodeProps) {
  return (
    <PageWrapper>
      <AuthVerifyCode {...props} />
    </PageWrapper>
  );
}

function CompleteSignUpPage(props: SignUpProps) {
  return (
    <PageWrapper>
      <CompleteSignUp {...props} />
    </PageWrapper>
  );
}

function BookingsTabPage(props: NavigationProps) {
  return (
    <PageWrapper isNavigationTab={true} alignCenter={false}>
      <BookingsTab {...props} />
    </PageWrapper>
  );
}

function ProfileTabPage(props: NavigationProps) {
  return (
    <PageWrapper isNavigationTab={true} alignCenter={false}>
      <ProfileTab {...props} />
    </PageWrapper>
  );
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function onFirebaseMessage(remoteMessage: FirebaseMessagingTypes.RemoteMessage) {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      if (remoteMessage.notification) {
        const title = remoteMessage.notification?.title as string;
        const body = remoteMessage.notification?.body as string;

        await sendLocalNotification(title, body);

        dispatch({
          type: SHOW_ALERT,
          payload: {
            text: body,
          } as AlertPayload,
        });
      }

      dispatch({
        type: CONFIRM_VISIT,
        payload: remoteMessage.data as ConfirmVisitPayload,
      });
    };

    (async () => {
      const firebaseToken = await initFirebase(onFirebaseMessage);
      dispatch({
        type: SET_FIREBASE_TOKEN,
        payload: firebaseToken,
      });
    })();
  });

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="home-tabs"
          component={HomeTabs}
          options={() => ({
            title: 'Map',
          })}
        />
        <Stack.Screen
          name="sport-object"
          component={SportObjectPage}
          options={() => ({
            headerShown: iOS(),
            title: '',
          })}
        />
        <Stack.Screen
          name="sign-in"
          component={SignInPage}
          options={() => ({
            headerShown: iOS(),
            title: '',
          })}
        />
        <Stack.Screen
          name="sign-up"
          component={SignUpPage}
          options={() => ({
            headerShown: iOS(),
            title: '',
          })}
        />
        <Stack.Screen
          name="auth-verify-code"
          component={VerifyCodePage}
          options={() => ({
            headerShown: iOS(),
            title: '',
          })}
        />
        <Stack.Screen
          name="complete-sign-up"
          component={CompleteSignUpPage}
          options={() => ({
            headerShown: iOS(),
            title: '',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Loader />
        <Alert />
        <App />
      </PaperProvider>
    </Provider>
  );
};
