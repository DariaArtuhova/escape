export enum AppRoute {
  Login = '/login',
  Root = '/',
  Quest = '/quest',
  Booking = '/booking',
  MyBooking = '/my-quests',
  Contacts = '/contacts',
}

export const URL_MARKER_CURRENT = '/img/svg/pin-active.svg';
export const URL_MARKER_DEFAULT = '/img/svg/pin-default.svg';

export enum FilterType {
  All= 'Все квесты',
  Adventures = 'Приключения',
  Horror = 'Ужасы',
  Mystic = 'Мистика',
  Detective = 'Детектив',
  SciFi = 'Sci-fi',
}

export const TYPES = [
  {
    id: 'all-quests',
    type: FilterType.All,
    name: 'Все квесты',
    isChecked: false
  },
  {
    id: 'adventure',
    type: FilterType.Adventures,
    name: 'Приключения',
    isChecked: false
  },
  {
    id: 'horror',
    type: FilterType.Horror,
    name: 'Ужасы',
    isChecked: false
  },
  {
    id: 'mystic',
    type: FilterType.Mystic,
    name: 'Мистика',
    isChecked: false
  },
  {
    id: 'detective',
    type: FilterType.Detective,
    name: 'Детектив',
    isChecked: false
  },
  {
    id: 'sci-fi',
    type: FilterType.SciFi,
    name: 'Sci-fi',
    isChecked: false
  },
];

export enum FilterLevel {
  All = 'Любой',
  Easy = 'Легкий',
  Medium = 'Средний',
  Hard = 'Сложный'
}

export const LEVELS = [
  {
    type: FilterLevel.All,
    name: 'Любой',
  },
  {
    type: FilterLevel.Easy,
    name: 'Легкий',
  },
  {
    type: FilterLevel.Medium,
    name: 'Средний',
  },
  {
    type: FilterLevel.Hard,
    name: 'Сложный',
  }
];
export enum ApiRoute {
  Quests = '/escape-room/quest',
  Login = '/escape-room/login',
  Logout = '/escape-room/logout',
  Booking = '/booking',
  MyBooking = '/escape-room/reservation',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const ContactsLocation: [{
  address: string;
  coords: number[];
}] =
  [{
    address: ' Набережная реки Карповка, д 5П',
    coords: [59.970659, 30.317234]
  }];

export const PEOPLE_COUNT_DEFAULT = 0;
export const LOCATION_COUNT_ID = 0;

