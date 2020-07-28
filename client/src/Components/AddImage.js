import React from 'react';
import { connect } from 'react-redux';
import { addGalleryImage } from '../actions/userActions';
import ImageUpload from './Forms/ImageUpload';

const AddImage = (props) => {
  const { addGalleryImage } = props;
  const { _id } = props.user;
  const handleSubmit = (e, formData, options) => {
    e.preventDefault();
    addGalleryImage(_id, formData, options);
  }

  return (
    <>
      <p>
        <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#addImage"
          aria-expanded="false" aria-controls="collapseExample">
          Add new Image
        </button>
      </p>
      <div className="collapse" style={{ width: '280px' }} id="addImage">
        <ImageUpload handleSubmit={handleSubmit} imageType={'userImage'} />
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, { addGalleryImage })(AddImage);
