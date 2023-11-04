import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-native-paper';

import Paragraph from '../paragraph';
import { formatDate } from '../../utils/utils';
import type { NavigationProps } from '../../../custom-types';
import styles from '../../utils/styles';

export default function BookingsTab({ navigation }: NavigationProps) {
  const { userInfo, bookings }: UserData = useSelector((state: ReduxState) => state.userData);

  return (
    <>
      {userInfo && bookings?.length === 0 && (
        <Paragraph>You do not have any bookings</Paragraph>
      )}
      {userInfo && bookings?.map((booking: UserBooking, index) => (
        <Paragraph key={`booking-${index.toString()}`}>
          {booking.sportObject.name},
          booked {formatDate(booking.bookingTime)}
          {booking.visitTime && `, visited ${formatDate(booking.visitTime)}`}
        </Paragraph>
      ))}
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
