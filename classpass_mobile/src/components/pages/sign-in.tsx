import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextInput } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

import Paragraph from '../paragraph';
import { getErrorMessages } from '../../utils/utils';
import { registerFirebaseToken, signIn } from '../../api';
import { HIDE_LOADER, SHOW_ALERT, SHOW_LOADER, UPDATE_USER_DATA } from '../../redux/action-types';
import styles from '../../utils/styles';
import type { NavigationProps } from '../../../custom-types';

export default function SignIn({ navigation }: NavigationProps) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const firebaseToken = useSelector((state: ReduxState) => state.firebaseToken);
  const loading = useSelector((state: ReduxState) => state.loading);

  function resetForm() {
    setPhone('');
    setPassword('');
  }

  useFocusEffect(
    React.useCallback(() => () => {
      resetForm();
    }, []),
  );

  async function submitForm() {
    dispatch({
      type: SHOW_LOADER,
    });

    const response = await signIn({ phone, password });
    if (!response.success) {
      dispatch({
        type: SHOW_ALERT,
        payload: {
          text: getErrorMessages(response),
        } as AlertPayload,
      });
    } else {
      const payload = {
        bookings: response.data?.bookings,
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
        value={phone}
        onChangeText={(value) => setPhone(value)}
        onSubmitEditing={() => submitForm()}
        placeholder="phone"
        editable={!loading}
        selectTextOnFocus={!loading}
      />
      <TextInput
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        onSubmitEditing={() => submitForm()}
        placeholder="password"
        editable={!loading}
        selectTextOnFocus={!loading}
      />
      <Button mode="contained-tonal" onPress={() => submitForm()}>Submit</Button>
      <Paragraph>If you do not have account, please sign up</Paragraph>
      <Button mode="contained-tonal" onPress={() => navigation.navigate('sign-up')}>Sign up</Button>
    </>
  );
}
