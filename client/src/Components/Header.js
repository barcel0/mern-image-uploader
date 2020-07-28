import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrimace } from '@fortawesome/free-solid-svg-icons';

const Header = (props) => {
  const { progressPercent } = props.user;
  return (
    <div className="fixed-top" >
      <nav className="navbar navbar-dark bg-dark">
        <div className="float-center">
          <FontAwesomeIcon size={"lg"} icon={faGrimace} color={'white'} />
          <a href='http://localhost:3000/' className="navbar-brand text-light ml-2">Image Uploader </a>
        </div>
      </nav>
      <div className='progress w-100' style={{ borderRadius: 0, height: '5px' }}>
        <div className='progress-bar' role='progressbar' style={{ width: `${progressPercent}%` }} aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, {})(Header);