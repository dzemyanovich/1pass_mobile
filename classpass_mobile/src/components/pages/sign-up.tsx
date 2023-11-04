import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextInput } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

import Paragraph from '../paragraph';
import { getErrorMessages } from '../../utils/utils';
import { authSendCode } from '../../api';
import styles from '../../utils/styles';
import { HIDE_LOADER, SHOW_ALERT, SHOW_LOADER } from '../../redux/action-types';
import type { NavigationProps } from '../../../custom-types';

export default function SignUp({ navigation }: NavigationProps) {
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector((state: ReduxState) => state.loading);

  useFocusEffect(
    React.useCallback(() => () => {
      setPhone('');
    }, []),
  );

  async function submitForm() {
    dispatch({
      type: SHOW_LOADER,
    });

    const response = await authSendCode({ phone });
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
          text: 'Code sent, please check your phone',
        } as AlertPayload,
      });

      navigation.navigate('auth-verify-code', { phone });
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
        onChangeText={setPhone}
        onSubmitEditing={() => submitForm()}
        placeholder="phone"
        editable={!loading}
        selectTextOnFocus={!loading}
      />
      <Button mode="contained-tonal" onPress={() => submitForm()}>Submit</Button>
      <Paragraph>If you already have account, please sign in</Paragraph>
      <Button mode="contained-tonal" onPress={() => navigation.navigate('sign-in')}>Sign in</Button>
    </>
  );
}
