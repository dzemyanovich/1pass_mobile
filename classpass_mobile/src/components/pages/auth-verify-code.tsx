import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextInput } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

import { getErrorMessages } from '../../utils/utils';
import { authVerifyCode } from '../../api';
import styles from '../../utils/styles';
import { HIDE_LOADER, SHOW_ALERT, SHOW_LOADER } from '../../redux/action-types';
import type { VerifyCodeProps } from '../../../custom-types';

export default function AuthVerifyCode({ route, navigation }: VerifyCodeProps) {
  const [code, setCode] = useState('');
  const { phone } = route.params;
  const dispatch = useDispatch();
  const loading = useSelector((state: ReduxState) => state.loading);

  useFocusEffect(
    React.useCallback(() => () => {
      setCode('');
    }, []),
  );

  async function submitForm() {
    dispatch({
      type: SHOW_LOADER,
    });
    const response = await authVerifyCode({ phone, code });
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
          text: 'Code verified, please proceed with completion of registration',
        } as AlertPayload,
      });

      navigation.navigate('complete-sign-up', { phone });
    }
    dispatch({
      type: HIDE_LOADER,
    });
  }

  return (
    <>
      <TextInput
        style={styles.input}
        value={code}
        onChangeText={(value) => setCode(value)}
        onSubmitEditing={() => submitForm()}
        placeholder="code"
        editable={!loading}
        selectTextOnFocus={!loading}
      />
      <Button mode="contained-tonal" onPress={() => submitForm()}>Submit</Button>
    </>
  );
}
