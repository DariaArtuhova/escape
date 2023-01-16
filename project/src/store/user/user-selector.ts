import {Store} from '../../types/store';
import {AuthorizationStatus} from '../../const';

export const getAuthorizationStatus = (state: Store): AuthorizationStatus => state.user.authorizationStatus;
