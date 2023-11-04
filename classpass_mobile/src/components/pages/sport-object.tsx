import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-native-paper';
import { Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Paragraph from '../paragraph';
import Title from '../title';
import { getErrorMessages, isToday } from '../../utils/utils';
import { cancelBooking, createBooking } from '../../api';
import { getUserToken } from '../../secure-store-manager';
import { ADD_BOOKING, CANCEL_BOOKING, HIDE_LOADER, SHOW_ALERT, SHOW_LOADER } from '../../redux/action-types';
import styles from '../../utils/styles';
import type { SportObjectProps } from '../../../custom-types';
import { NO_PHOTO } from '../../../app.json';

export default function SportObject({ route, navigation }: SportObjectProps) {
  const dispatch = useDispatch();
  const { userInfo, bookings }: UserData = useSelector((state: ReduxState) => state.userData);
  const { sportObjectId, name, address, images } = route.params;
  const booking = bookings?.find((item: UserBooking) =>
    item.sportObject.id === sportObjectId && isToday(item.bookingTime));
  const loading = useSelector((state: ReduxState) => state.loading);

  async function book() {
    if (loading) {
      return;
    }

    dispatch({
      type: SHOW_LOADER,
    });

    const token = await getUserToken() as string;
    const response = await createBooking({
      token,
      sportObjectId,
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
          text: 'Booking made',
        } as AlertPayload,
      });

      dispatch({
        type: ADD_BOOKING,
        payload: response.data as UserBooking,
      });
    }

    dispatch({
      type: HIDE_LOADER,
    });
  }

  async function cancel() {
    if (loading) {
      return;
    }

    dispatch({
      type: SHOW_LOADER,
    });

    const token = await getUserToken() as string;
    const response = await cancelBooking({
      token,
      bookingId: booking?.id as number,
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
          text: 'Booking cancelled',
        } as AlertPayload,
      });

      const payload = {
        bookingId: booking?.id as number,
      } as CancelBookingPayload;

      dispatch({
        type: CANCEL_BOOKING,
        payload,
      });
    }

    dispatch({
      type: HIDE_LOADER,
    });
  }

  const imageStyles = {
    width: 300,
    height: 400,
    marginRight: 20,
  };

  return (
    <>
      <Title>{name}</Title>
      <ScrollView horizontal>
        {!images.length && (
          <Image
            source={{ uri: NO_PHOTO }}
            style={imageStyles}
          />
        )}
        {images.map((image: string, index: number) => (
          <Image
            key={`image-${index.toString()}`}
            source={{ uri: image }}
            style={imageStyles}
          />
        ))}
      </ScrollView>
      <Title>Address</Title>
      <Paragraph>{address}</Paragraph>
      {userInfo && (
        <>
          {booking && booking.visitTime && <Title>Already visited</Title>}
          {booking && !booking.visitTime && (
            <Button mode="contained-tonal" onPress={() => cancel()}>Cancel booking</Button>
          )}
          {!booking && <Button mode="contained-tonal" onPress={() => book()}>Book</Button>}
        </>
      )}
      {!userInfo && (
        <>
          <Paragraph>In order to make bookings, please sign in or sign up</Paragraph>
          <Button style={styles.signInButton} mode="contained-tonal" onPress={() => navigation.navigate('sign-in')}>
            Sign In
          </Button>
          <Button mode="contained-tonal" onPress={() => navigation.navigate('sign-up')}>Sign Up</Button>
        </>
      )}
    </>
  );
}
