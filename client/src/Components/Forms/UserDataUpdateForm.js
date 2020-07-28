import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

const UserDataUpdateForm = props => {
  const { handleSubmit, _id, name, email, favouriteNumber } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">ID</div>
          </div>
          <Field name="_id" component="input" type="text" className="form-control" placeholder={_id} readOnly />
        </div>
      </div>
      <div className="form-group">

        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">Name</div>
          </div>
          <Field name="name" component="input" type="text" className="form-control" placeholder={name} />
        </div>
      </div>
      <div className="form-group">
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">Email</div>
          </div>
          <Field name="email" component="input" type="text" className="form-control" placeholder={email} />
        </div>
      </div>
      <div className="form-group">
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">Favourite Number</div>
          </div>
          <Field name="favouriteNumber" component="input" type="number" className="form-control" min={0} max={10} placeholder={favouriteNumber} />
        </div>
      </div>
      <div className="form-group">
        <Field name="colour" component="select" className="custom-select my-1 mr-sm-2">
          <option value="" >Select colour...</option>
          {["Red", "Green", "Blue"].map(colour => <option value={colour} key={colour}>{colour}</option>)}
        </Field>
      </div>
      <button type="submit" className="btn btn-primary w-100">Update</button>
    </form>
  );
}

const mapStateToProps = (state) => ({
  initialValues: {
    _id: state.user._id,
    name: state.user.name,
    email: state.user.email,
    favouriteNumber: state.user.favouriteNumber,
    colour: state.user.colour,
  }
})

export default connect(mapStateToProps)(reduxForm({ form: 'userDataUpdate', enableReinitialize: true })(UserDataUpdateForm))