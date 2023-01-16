import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import {AppDispatch, Store} from '../types/store';
import {getCurrentQuest, getCurrentQuestBooking, loadMyBooking, loadQuests} from '../store/quest/quest-action';
import {
  AuthData, BookingQuest,
  BookingType,
  QuestsType,
  QuestType, UserData
} from '../types/booking-type';
import {ApiRoute, AuthorizationStatus} from '../const';
import {requireAuthorization, setError, setUserEmail} from '../store/user/user-action';
import {dropToken, saveToken} from './token';
import {store} from '../store';

export const clearErrorAction = createAsyncThunk(
  'offer/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      2000,
    );
  },
);

export const fetchMyBooking = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: Store;
  extra: AxiosInstance;
}> (
  'data/loadQuests',
  async (_arg, {dispatch, extra: api}) => {

    const {data} = await api.get<BookingType[]>(ApiRoute.MyBooking);

    dispatch(loadMyBooking(data));
  }
);

export const fetchQuestsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: Store;
  extra: AxiosInstance;
}> (
  'data/loadQuests',
  async (_arg, {dispatch, extra: api}) => {

    const {data} = await api.get<QuestsType>(ApiRoute.Quests);

    dispatch(loadQuests(data));
  }
);

export const fetchCurrentQuestAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: Store;
  extra: AxiosInstance;
}> (
  'data/getCurrentQuest',
  async (questId, {dispatch, extra: api}) => {

    const {data} = await api.get<QuestType>(`${ApiRoute.Quests}/${questId}`);

    dispatch(getCurrentQuest(data));
  }
);

export const fetchCurrentQuestBooking = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: Store;
  extra: AxiosInstance;
}> (
  'data/getCurrentQuest',
  async (questId, {dispatch, extra: api}) => {

    const {data} = await api.get<BookingType>(`${ApiRoute.Quests}/${questId}${ApiRoute.Booking}`);

    dispatch(getCurrentQuestBooking(data));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: Store;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(ApiRoute.Login);
      dispatch(setUserEmail(data.email));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: Store;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(ApiRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUserEmail(email));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: Store;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

export const sendNewBooking = createAsyncThunk<void, BookingQuest, {
  dispatch: AppDispatch;
  state: Store;
  extra: AxiosInstance;
}>(
  'data/sendBooking',
  async ({date, time, questId, locationId, peopleCount, phone, withChildren, contactPerson}, {dispatch, extra: api}) => {

    await api.post<BookingType>(`${ApiRoute.Quests}/${questId}${ApiRoute.Booking}`, {date, time, questId, locationId, peopleCount, phone, withChildren, contactPerson});
    dispatch(fetchMyBooking());
  }
);

export const deleteMyBooking = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: Store;
  extra: AxiosInstance;
}> (
  'data/loadQuests',
  async (reservationId, {dispatch, extra: api}) => {

    await api.delete<BookingType[]>(`${ApiRoute.MyBooking}/${reservationId}`);

    dispatch(fetchMyBooking());
  }
);


