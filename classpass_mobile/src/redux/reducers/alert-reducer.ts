import { PayloadAction } from '@reduxjs/toolkit';

import { SHOW_ALERT, HIDE_ALERT } from '../action-types';

const initialState: AlertData = {
  visible: false,
  text: '',
};

export default (
  state: AlertData = initialState,
  action: PayloadAction<AlertPayload>,
): AlertData => {
  switch (action.type) {
    case SHOW_ALERT: {
      const { text } = action.payload;

      return {
        visible: true,
        text,
      };
    }

    case HIDE_ALERT: {
      return initialState;
    }

    default:
      return state;
  }
};
