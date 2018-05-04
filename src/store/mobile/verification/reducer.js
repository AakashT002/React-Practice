import createReducer from '../../createReducer';
import * as ActionTypes from '../../actionTypes';
import { RETURNED_BY, SHIPPED_BY } from '../../../utils/constants';
import {
  ALL_STATUS,
  ONE_DAY
} from '../../../utils/constants';

const initialState = {
  verificationResult: [],
  verificationList: [],
  requesting: false,
  isDescending: true,
  piRequesting: false,
  isScannerSelection: true,
  isDuplicate: false,
  filterRequesting: false,
  deviceType: sessionStorage.getItem('deviceType'),
  selectedStatus: ALL_STATUS,
  selectedRequestTime: ONE_DAY
};

export const verification = createReducer(initialState, {
  [ActionTypes.VERIFY_PI_REQUEST](state) {
    return { ...state, piRequesting: true };
  },
  [ActionTypes.VERIFY_PI_SUCCESS](state = initialState, action) {
    state.verificationList.forEach(verification => {
      if (
        verification.gtin + verification.srn ===
        action.response.result[0].gtin + action.response.result[0].srn
      ) {
        verification.requestSentTime =
          action.response.result[0].requestSentTime;
        state.isDuplicate = true;
        if (verification.status !== action.response.result[0].status) {
          verification.status = action.response.result[0].status;
          state.isDuplicate = true;
        }
      }
    });

    if (!state.isDuplicate) {
      let UserName;
      if (sessionStorage.getItem('fullname') === null) {
        UserName = sessionStorage.getItem('username');
        action.response.result[0]['firstName'] = UserName;
      } else {
        UserName = sessionStorage.getItem('fullname').split(' ');
        action.response.result[0]['firstName'] = UserName[0];
        action.response.result[0]['lastName'] = UserName[1];
      }
      action.response.result[0]['returnedBy'] =
        RETURNED_BY[(Math.random() * RETURNED_BY.length) | 0];
      action.response.result[0]['shippedBy'] =
        SHIPPED_BY[(Math.random() * SHIPPED_BY.length) | 0];
      if (state.selectedStatus === action.response.result[0].status ||
        state.selectedStatus === ALL_STATUS) {
        state.verificationList.unshift(action.response.result[0]);
      }
    }

    return Object.assign({}, state, {
      verificationResult: action.response.result,
      piRequesting: false,
      verificationList: state.verificationList,
      isDuplicate: false,
    });
  },
  [ActionTypes.VERIFY_PI_FAILURE](state) {
    return { ...state, piRequesting: false };
  },
  [ActionTypes.CLEAR_VERIFICATION_RESULT](state = initialState) {
    return Object.assign({}, state, {
      verificationResult: [],
    });
  },
  [ActionTypes.SORT_DATE_SUCCESS](state, action) {
    return {
      ...state,
      verificationList: action.verificationList,
      isDescending: action.isDescending,
    };
  },
  [ActionTypes.PRODUCT_DETAILS_REQUEST](state) {
    return { ...state, requesting: true };
  },
  [ActionTypes.PRODUCT_DETAILS_SUCCESS](state = initialState, action) {
    return {
      ...state,
      verificationResult: action.response.result,
      requesting: false,
    };
  },
  [ActionTypes.PRODUCT_DETAILS_FAILURE](state) {
    return { ...state, requesting: false };
  },
  [ActionTypes.UPDATE_DEVICE_TYPE](state = initialState) {
    return { ...state, deviceType: sessionStorage.getItem('deviceType') };
  },
  [ActionTypes.SEARCH_FIELD_SUCCESS](state, action) {
    return { ...state, verificationList: action.newList };
  },
  [ActionTypes.CLEAR_SEARCH_SUCCESS](state, action) {
    return { ...state, verificationList: action.verificationList };
  },
  [ActionTypes.FETCH_VERIFICATIONS_REQUEST](state) {
    return { ...state, requesting: true, filterRequesting: true };
  },
  [ActionTypes.FETCH_VERIFICATIONS_SUCCESS](state = initialState, action) {
    return {
      ...state,
      verificationList: action.response.result,
      requesting: false,
      filterRequesting: false,
    };
  },
  [ActionTypes.FETCH_VERIFICATIONS_FAILURE](state) {
    return { ...state, requesting: false, filterRequesting: false };
  },
  [ActionTypes.UPDATE_SELECTED_DETAILS](state = initialState, action) {
    return {
      ...state,
      selectedStatus: action.selectedStatus,
      selectedRequestTime: action.selectedRequestTime,
    };
  },
});

export default verification;
