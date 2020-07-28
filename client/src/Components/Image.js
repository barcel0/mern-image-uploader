import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateGalleryImage, deleteGalleryImage } from '../actions/userActions';
import ImageUpload from './Forms/ImageUpload';

const Image = props => {
  const { imageIndex, handleImageClick, deleteGalleryImage, updateGalleryImage } = props;
  const { name, _id } = props.user;
  const [image, setImage] = useState();

  useEffect(() => {
    setImage(props.image);
  }, [props.image])

  const handleDelete = () => { deleteGalleryImage(_id, imageIndex) }

  const handleSubmit = (e, formData, options) => {
    e.preventDefault();
    updateGalleryImage(_id, imageIndex, formData, options);
  }
  return (
    <div className="d-flex flex-column align-items-center m-3">
      {image ? <img src={`${image}`} style={{ width: '280px', height: 'auto', cursor: 'pointer' }}
        className="shadow-sm p-3 bg-white rounded" alt={name} onClick={() => handleImageClick(imageIndex)} /> : null}
      <ImageUpload handleSubmit={handleSubmit} imageType={'userImage'} />
      <button type="button" className="btn btn-danger w-100 mt-2" onClick={handleDelete}>Delete</button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, { deleteGalleryImage, updateGalleryImage })(Image);