import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextInput } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

import { getErrorMessages } from '../../utils/utils';
import { completeSignUp, registerFirebaseToken } from '../../api';
import styles from '../../utils/styles';
import { HIDE_LOADER, SHOW_ALERT, SHOW_LOADER, UPDATE_USER_DATA } from '../../redux/action-types';
import { setUserToken } from '../../secure-store-manager';
import type { SignUpProps } from '../../../custom-types';

export default function CompleteSignUp({ route, navigation }: SignUpProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const firebaseToken = useSelector((state: ReduxState) => state.firebaseToken);
  const loading = useSelector((state: ReduxState) => state.loading);

  useFocusEffect(
    React.useCallback(() => () => {
      setFirstName('');
      setLastName('');
      setEmail('');
      setConfirmEmail('');
      setPassword('');
      setConfirmPassword('');
    }, []),
  );

  async function submitForm() {
    dispatch({
      type: SHOW_LOADER,
    });

    const response = await completeSignUp({
      phone: route.params.phone,
      firstName,
      lastName,
      email,
      confirmEmail,
      password,
      confirmPassword,
    });

    if (!response.success) {
      dispatch({
        type: SHOW_ALERT,
        payload: {
          text: getErrorMessages(response),
        } as AlertPayload,
      });
    } else {
      dispatch({
        type: SHOW_ALERT,
        payload: {
          text: 'Sign up completed',
        } as AlertPayload,
      });

      await setUserToken(response.data?.token as string);

      const payload = {
        bookings: [],
        userInfo: response.data?.userInfo,
      } as UpdateUserDataPayload;

      dispatch({
        type: UPDATE_USER_DATA,
        payload,
      });
      await registerFirebaseToken(firebaseToken);
      navigation.navigate('bookings');
    }

    dispatch({
      type: HIDE_LOADER,
    });
  }

  return (
    <>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={(value) => setFirstName(value)}
        onSubmitEditing={() => submitForm()}
        placeholder="first name"
        editable={!loading}
        selectTextOnFocus={!loading}
      />
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={(value) => setLastName(value)}
        onSubmitEditing={() => submitForm()}
        placeholder="last name"
        editable={!loading}
        selectTextOnFocus={!loading}
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(value) => setEmail(value)}
        onSubmitEditing={() => submitForm()}
        placeholder="email"
        editable={!loading}
        selectTextOnFocus={!loading}
      />
      <TextInput
        style={styles.input}
        value={confirmEmail}
        onChangeText={(value) => setConfirmEmail(value)}
        onSubmitEditing={() => submitForm()}
        placeholder="confirm email"
        editable={!loading}
        selectTextOnFocus={!loading}
      />
      <TextInput
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={(value) => setPassword(value)}
        onSubmitEditing={() => submitForm()}
        placeholder="password"
        editable={!loading}
        selectTextOnFocus={!loading}
      />
      <TextInput
        secureTextEntry
        style={styles.input}
        value={confirmPassword}
        onChangeText={(value) => setConfirmPassword(value)}
        onSubmitEditing={() => submitForm()}
        placeholder="confirm password"
        editable={!loading}
        selectTextOnFocus={!loading}
      />
      <Button mode="contained-tonal" onPress={() => submitForm()}>Submit</Button>
    </>
  );
}
