import { PayloadAction } from '@reduxjs/toolkit';

import { SHOW_LOADER, HIDE_LOADER } from '../action-types';

const initialState: boolean = true;

export default (
  state: boolean = initialState,
  action: PayloadAction<void>,
): boolean => {
  switch (action.type) {
    case SHOW_LOADER: {
      return true;
    }

    case HIDE_LOADER: {
      return false;
    }

    default:
      return state;
  }
};
