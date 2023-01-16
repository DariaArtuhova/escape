import {createReducer} from '@reduxjs/toolkit';
import {
  changeFilterLevel,
  changeFilterType, changeLevel, changeType,
  getCurrentQuest,
  getCurrentQuestBooking,
  loadLocation, loadMyBooking,
  loadQuests, reviewsLoading
} from './quest-action';
import { BookingType, BookingTypes, QuestsType, QuestType} from '../../types/booking-type';

type InitialState = {
  all: string;
  any: string;
  quests: QuestsType;
  quest: QuestType | null;
  myBooking: BookingType[];
  booking: BookingType | null;
  location: BookingTypes;
  filterType: string;
  filterLevel: string;
  reviewsLoading: boolean;
}

const initialState: InitialState = {
  all: 'Все квесты',
  any: 'Любой',
  quests: [],
  quest: null,
  myBooking: [],
  booking: null,
  location: [],
  filterType: 'Все квесты',
  filterLevel: 'Любой',
  reviewsLoading: false

};

export const questReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeLevel, (state, action) => {
      const { any } = action.payload;
      state.any = any;
    })
    .addCase(changeType, (state, action) => {
      const { all } = action.payload;
      state.all = all;
    })
    .addCase(changeFilterType, (state, action) => {
      state.filterType = action.payload;
    })
    .addCase(changeFilterLevel, (state, action) => {
      state.filterLevel = action.payload;
    })
    .addCase(loadQuests, (state, action) => {
      state.quests = action.payload;
    })
    .addCase(loadLocation, (state, action) => {
      state.location = action.payload;
    })
    .addCase(getCurrentQuest, (state, action) => {
      state.quest = action.payload;
    })
    .addCase(getCurrentQuestBooking, (state, action) => {
      state.booking = action.payload;
    })
    .addCase(reviewsLoading, (state, action) => {
      state.reviewsLoading = action.payload;
    })
    .addCase(loadMyBooking, (state, action) => {
      state.myBooking = action.payload;
    });
});
