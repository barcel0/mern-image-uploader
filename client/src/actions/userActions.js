import {
  GET_USER,
  UPDATE_USER_AVATAR,
  UPDATE_USER_DATA,
  ADD_GALLERY_IMAGE,
  UPDATE_GALLERY_IMAGE,
  DELETE_GALLERY_IMAGE,
  SET_PROGRESS_PERCENT
} from './types';
import { toast } from 'react-toastify';
import axios from 'axios';

export const getUser = userId => dispatch => {
  axios
    .get(`/api/user/${userId}`)
    .then(res => {
      dispatch({
        type: GET_USER,
        payload: res.data
      });
      toast.success(`Welcome back ${res.data.name}!`);
    })
    .catch(err => toast.error(`❌ Something went wrong: ${err}`));
}

export const updateUserData = (userId, formData) => dispatch => {
  axios
    .put(`/api/user/${userId}/data`, formData)
    .then(res => {
      dispatch({
        type: UPDATE_USER_DATA,
        payload: res.data
      });
      toast.success(`✅ User ${res.data.name} updated.`)
    })
    .catch(err => {
      toast.error(`❌ Something went wrong: ${err.response.data.errors}`);
    });
}

export const updateAvatar = (userId, formData, options) => dispatch => {
  dispatch(setProgressPercent(0));
  axios.put(`/api/user/${userId}/avatar`, formData, options)
    .then(res => {
      setTimeout(() => {
        dispatch({
          type: UPDATE_USER_AVATAR,
          payload: res.data
        });
        toast.success(`👤 Avatar updated.`)
        dispatch(setProgressPercent(0));
      }, 1000)
    })
    .catch(err => {
      toast.error(`❌ Something went wrong: ${err}`);
      console.log(err) //debug
      setTimeout(() => {
        dispatch(setProgressPercent(0));
      }, 1000);
    });
}

export const addGalleryImage = (userId, formData, options) => dispatch => {
  axios.post(`/api/user/${userId}/galleryimage/add`, formData, options)
    .then(res => {
      setTimeout(() => {
        dispatch(setProgressPercent(0));
        dispatch({
          type: ADD_GALLERY_IMAGE,
          payload: res.data
        });
        toast.success(`🖼️ Image added.`)
      }, 2000);
    })
    .catch(err => {
      toast.error(`❌ Something went wrong: ${err}`);
      setTimeout(() => {
        dispatch(setProgressPercent(0));
      }, 1000)
    });
}

export const updateGalleryImage = (userId, imageIndex, formData, options) => dispatch => {
  dispatch(setProgressPercent(0));
  axios.put(`/api/user/${userId}/galleryimage/update/${imageIndex}`, formData, options)
    .then(res => {
      setTimeout(() => {
        dispatch({
          type: UPDATE_GALLERY_IMAGE,
          payload: res.data
        });
        dispatch(setProgressPercent(0));
      }, 2000)
    })
    .catch(err => {
      setTimeout(() => {
        dispatch(setProgressPercent(0));
      }, 2000)
    });
}

export const deleteGalleryImage = (userId, imageIndex) => dispatch => {
  axios.put(`/api/user/${userId}/galleryimage/delete/${imageIndex}`)
    .then(res => {
      dispatch({
        type: DELETE_GALLERY_IMAGE,
        payload: res.data
      });
      toast.success(`✨ Image deleted.`);
      setTimeout(() => {
        dispatch(setProgressPercent(0));
      }, 1000);
    })
    .catch(err => {
      toast.error(`❌ Something went wrong: ${err}`);
      setTimeout(() => {
        dispatch(setProgressPercent(0));
      }, 1000);
    });
}

export const setProgressPercent = value => dispatch => {
  dispatch({
    type: SET_PROGRESS_PERCENT,
    payload: value
  });
}