import React, { useState } from "react";
import { connect } from 'react-redux';
import { setProgressPercent } from '../../actions/userActions';

const ImageUpload = (props) => {
  const { handleSubmit, setProgressPercent, imageType } = props;
  const [formData, setFormData] = useState('');
  const [filename, setFilename] = useState('Choose image');

  const updateFormData = ({ target: { files } }) => {
    setFilename(files[0].name);
    let data = new FormData();
    data.append(imageType, files[0]);
    setFormData(data);
  };

  const options = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      console.log(`${loaded}kb of ${total}kb | ${percent}%`); //debug
      setProgressPercent(percent);
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, formData, options)} style={{ width: '280px' }} className="mt-3">
      <div className="input-group" style={{ width: '100%' }}>
        <div className="input-group-prepend">
          <button type='submit' className='btn btn-primary w-100'>Upload</button>
        </div>
        <div className="custom-file">
          <input type="file" className="custom-file-input " id="imageUpload" onChange={updateFormData} />
          <label className="custom-file-label " htmlFor="imageUpload">{filename}</label>
        </div>
      </div>
    </form>
  );
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, { setProgressPercent })(ImageUpload);