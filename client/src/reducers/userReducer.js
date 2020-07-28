import {
  GET_USER,
  UPDATE_USER_DATA,
  DELETE_GALLERY_IMAGE,
  ADD_GALLERY_IMAGE,
  UPDATE_GALLERY_IMAGE,
  UPDATE_USER_AVATAR,
  SET_PROGRESS_PERCENT
} from '../actions/types';

const initialState = {
  name: '',
  email: '',
  favouriteNumber: 0,
  colour: '',
  avatar: '',
  gallery: [],
  progressPercent: 0
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER:
    case DELETE_GALLERY_IMAGE:
    case UPDATE_USER_DATA:
    case UPDATE_USER_AVATAR:
    case ADD_GALLERY_IMAGE:
    case UPDATE_GALLERY_IMAGE:
      return ({
        ...state,
        ...action.payload
      });
    case SET_PROGRESS_PERCENT:
      return ({
        ...state,
        progressPercent: action.payload
      });
    default:
      return state;
  }
}