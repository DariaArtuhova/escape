import {AuthorizationStatus} from '../../const';
import {BookingQuest} from '../../types/booking-type';
import {createReducer} from '@reduxjs/toolkit';
import {requireAuthorization, sendBooking, setUserEmail} from './user-action';

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  userEmail: string | null;
  booking: BookingQuest | null;
}

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: null,
  booking: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserEmail, (state, action) => {
      state.userEmail = action.payload;
    })
    .addCase(sendBooking, (state, action) => {
      state.booking = action.payload;
    });
});
