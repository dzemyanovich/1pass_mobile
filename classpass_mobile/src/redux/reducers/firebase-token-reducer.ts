import { PayloadAction } from '@reduxjs/toolkit';

import { SET_FIREBASE_TOKEN } from '../action-types';

const initialState: string | null = null;

export default (
  state: string | null = initialState,
  action: PayloadAction<string>,
): string | null => {
  switch (action.type) {
    case SET_FIREBASE_TOKEN: {
      return action.payload;
    }

    default:
      return state;
  }
};
