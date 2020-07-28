import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { updateUserData } from '../actions/userActions';
import UserDataUpdateForm from './Forms/UserDataUpdateForm';

const UserData = props => {
  const { updateUserData } = props;
  const { _id } = props.user;
  const handleSubmit = values => { updateUserData(_id, values); }

  return (
    <div className="ml-3 mt-3">
      <div className="d-flex align-items-center "><FontAwesomeIcon size={"lg"} icon={faAddressCard} /><h4 className="ml-3">Information</h4></div>
      <div className="border-bottom mt-1 mb-3"></div>
      <UserDataUpdateForm onSubmit={handleSubmit} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, { updateUserData })(UserData);