import {Store} from '../../types/store';

export const getCurrentQuest = (state: Store) => state.quest.quest;

export const getAllQuests = (state: Store) => state.quest.quests;

export const getCurrentQuestBooking = (state: Store) => state.quest.booking;

export const loadMyBooking = (state: Store) => state.quest.myBooking;

export const getActiveType = (state: Store) => state.quest.all;

export const getActiveLevel = (state: Store) => state.quest.any;


