export type QuestType = {
  id: number;
  title: string;
  previewImg: string;
  level: string;
  type: string;
  peopleMinMax: [number, number];
  description?: string;
  coverImg?: string;
  location: LocationCoordinates;
};

export type LocationCoordinates =
  [{
    id?: number;
    address: string;
    coords: number[];
  }]
export type time = {
  today: [{
    time: string;
    isAvailable: boolean;
  }];
  tomorrow: [{
    time: string;
    isAvailable: boolean;
  }];
}
export type BookingType = {
  id: number;
  date: string;
  time: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  locations: LocationCoordinates;
  quest: QuestType;
  slots: time;
}

export type BookingQuest = {
  date: string;
  time: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  questId: number;
  locationId: number;
}

export type UserData = {
  email: string;
  token: string;
}

export type AuthData = {
  login: string;
  password: string;
  user: boolean;
};

export type BookingTypes = BookingType[];

export type QuestsType = QuestType[];
