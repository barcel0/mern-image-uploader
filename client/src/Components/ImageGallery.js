import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { connect } from 'react-redux';
import Image from './Image';

const ImageGallery = props => {
  const { user } = props;
  const images = user.gallery;
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleImageClick = (imageIndex) => {
    setPhotoIndex(imageIndex);
    setIsOpen(true);
  }

  const serveImages = (imageList) => {
    if (imageList) {
      return imageList.map((image, imageIndex) => {
        return (
          <Image key={imageIndex} image={image} name={user.name} imageIndex={imageIndex} handleImageClick={handleImageClick} />
        )
      });
    }
  }

  return (
    <>
      <div className="d-flex flex-wrap justify-content-center mt-4">
        {serveImages(user.gallery)}
      </div>
      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}

        />
      )}
    </>

  );
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, {})(ImageGallery);