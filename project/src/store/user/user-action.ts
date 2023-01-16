import {createAction} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../../const';
import {BookingQuest} from '../../types/booking-type';

export const sendBooking = createAction<BookingQuest>('data/sendBooking');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setUserEmail = createAction<string | null>('user/setEmail');

export const setError = createAction<string | null>('offer/setError');
