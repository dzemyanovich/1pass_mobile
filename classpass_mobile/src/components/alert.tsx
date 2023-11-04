import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Portal, Snackbar } from 'react-native-paper';

import { HIDE_ALERT } from '../redux/action-types';

export default function Alert() {
  const { visible, text } = useSelector((state: ReduxState) => state.alert);
  const dispatch = useDispatch();

  function hideDialog() {
    dispatch({
      type: HIDE_ALERT,
    });
  }

  return (
    <Portal>
      <Snackbar
        visible={visible}
        onDismiss={() => hideDialog()}
        duration={5000}
        action={{
          label: 'Ok',
        }}
        >
        {text}
      </Snackbar>
    </Portal>
  );
}
