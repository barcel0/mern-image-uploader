import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faImages } from '@fortawesome/free-solid-svg-icons';
import { getUser } from '../actions/userActions';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import Avatar from './Avatar';
import UserData from './UserData';
import AddImage from './AddImage';
import ImageGallery from './ImageGallery';

const User = (props) => {
  const { getUser } = props;
  const userId = '5f1d664e7d59c226362e3ecc';

  useEffect(() => {
    getUser(userId);
  }, [getUser]);

  return (
    <div>
      <Header />
      <div className="container" style={{ position: 'relative', marginTop: 100 }}>
        <div className="jumbotron bg-light shadow-sm pt-3">
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center "><FontAwesomeIcon size={"lg"} icon={faUser} /> <h2 className="ml-3">User Profile</h2></div>
            <div className="border-bottom mt-1 mb-3"></div>
            <div className="d-flex justify-content-around flex-wrap">
              <Avatar />
              <UserData />
            </div>
            <div className="d-flex flex-column mt-5">
              <div className="d-flex align-items-center "><FontAwesomeIcon size={"lg"} icon={faImages} /><h4 className="ml-3">Image Gallery</h4></div>
              <div className="border-bottom mt-1 mb-3"></div>
              <AddImage />
              <ImageGallery />
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div >

  );
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, { getUser })(User);