import { PayloadAction } from '@reduxjs/toolkit';

import {
  SET_USER_DATA,
  RESET_USER_DATA,
  ADD_BOOKING,
  UPDATE_USER_DATA,
  CANCEL_BOOKING,
  CONFIRM_VISIT,
} from '../action-types';

const initialState: UserData = {
  sportObjects: [],
  bookings: null,
  userInfo: null,
};

export default (
  state: UserData = initialState,
  action: PayloadAction<UserData | UserBooking | UpdateUserDataPayload | CancelBookingPayload | ConfirmVisitPayload>,
): UserData => {
  switch (action.type) {
    case SET_USER_DATA: {
      return action.payload as UserData;
    }

    case UPDATE_USER_DATA: {
      const { sportObjects } = state;
      const { bookings, userInfo } = action.payload as UpdateUserDataPayload;

      return {
        sportObjects,
        bookings,
        userInfo,
      };
    }

    case RESET_USER_DATA: {
      const { sportObjects } = state;

      return {
        sportObjects,
        bookings: null,
        userInfo: null,
      };
    }

    case ADD_BOOKING: {
      const bookings = [
        action.payload as UserBooking,
        ...state.bookings as UserBooking[],
      ];

      return {
        ...state,
        bookings,
      };
    }

    case CANCEL_BOOKING: {
      const { bookingId } = action.payload as CancelBookingPayload;
      const bookings = state.bookings?.filter((booking) => booking.id !== bookingId) as UserBooking[];

      return {
        ...state,
        bookings,
      };
    }

    case CONFIRM_VISIT: {
      const { bookingId, visitTime } = action.payload as ConfirmVisitPayload;

      const bookings = state.bookings?.map((booking: UserBooking) => (booking.id.toString() === bookingId
        ? {
          ...booking,
          visitTime,
        }
        : booking));

      return {
        ...state,
        bookings: bookings as UserBooking[],
      };
    }

    default:
      return state;
  }
};
