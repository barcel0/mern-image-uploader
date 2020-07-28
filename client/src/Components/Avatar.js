import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateAvatar } from '../actions/userActions';
import ImageUpload from './Forms/ImageUpload';

const Avatar = props => {
  const { updateAvatar } = props;
  const { name, _id } = props.user;
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    setAvatar(props.user.avatar);
  }, [props.user.avatar])

  const handleSubmit = (e, formData, options) => {
    e.preventDefault();
    updateAvatar(_id, formData, options);
  }
  return (
    <div className="d-flex flex-column align-items-center justify-content-center mr-3">
      {avatar ? <img src={`${avatar}`} className="shadow-sm p-3 mb-5 bg-white" alt={name} style={{ width: '200px', height: 'auto', borderRadius: '50%' }} /> : null}
      <span>Update avatar</span>
      <ImageUpload handleSubmit={handleSubmit} imageType={'userImage'} />
    </div >
  );
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, { updateAvatar })(Avatar);