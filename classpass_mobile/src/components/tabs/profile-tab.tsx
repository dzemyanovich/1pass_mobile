import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-native-paper';

import Paragraph from '../paragraph';
import Title from '../title';
import { clearUserToken } from '../../secure-store-manager';
import { HIDE_LOADER, RESET_USER_DATA, SHOW_LOADER } from '../../redux/action-types';
import { signOut as signOutCall } from '../../api';
import styles from '../../utils/styles';
import type { NavigationProps } from '../../../custom-types';

export default function ProfileTab({ navigation }: NavigationProps) {
  const { userInfo } = useSelector((state: ReduxState) => state.userData);
  const firebaseToken = useSelector((state: ReduxState) => state.firebaseToken);
  const dispatch = useDispatch();

  async function signOut() {
    dispatch({
      type: SHOW_LOADER,
    });
    await signOutCall(firebaseToken);
    await clearUserToken();
    dispatch({
      type: RESET_USER_DATA,
    });
    navigation.navigate('profile');
    dispatch({
      type: HIDE_LOADER,
    });
  }

  return (
    <>
      {userInfo && (
        <>
          <Title>First Name</Title>
          <Paragraph>{userInfo.firstName}</Paragraph>
          <Title>Last Name</Title>
          <Paragraph>{userInfo.lastName}</Paragraph>
          <Title>Email</Title>
          <Paragraph>{userInfo.email}</Paragraph>
          <Title>Phone</Title>
          <Paragraph>{userInfo.phone}</Paragraph>
          <Button mode="contained-tonal" onPress={() => signOut()}>Sign out</Button>
        </>
      )}
      {!userInfo && (
        <>
          <Paragraph>In order to view profile info, please sign in or sign up</Paragraph>
          <Button style={styles.signInButton} mode="contained-tonal" onPress={() => navigation.navigate('sign-in')}>
            Sign In
          </Button>
          <Button mode="contained-tonal" onPress={() => navigation.navigate('sign-up')}>Sign Up</Button>
        </>
      )}
    </>
  );
}
