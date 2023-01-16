import {createAction} from '@reduxjs/toolkit';
import { BookingType, BookingTypes, QuestsType, QuestType} from '../../types/booking-type';

export const changeLevel = createAction<{
  any:string;
}>('any/change');

export const changeType = createAction<{
  all:string;
}>('all/change');

export const loadQuests = createAction<QuestsType>('data/loadQuests');

export const loadLocation = createAction<BookingTypes>('data/loadLocation');

export const getCurrentQuest = createAction<QuestType>('quest/getCurrentQuest');

export const getCurrentQuestBooking = createAction<BookingType>('quest/getCurrentQuestBooking');

export const changeFilterType = createAction<string>('quest/changeFilterType');

export const loadMyBooking = createAction<BookingType[]>('quests/loadMyBooking');

export const changeFilterLevel = createAction<string>('quest/changeFilterLevel');

export const reviewsLoading = createAction<boolean>('data/reviewsLoading');


