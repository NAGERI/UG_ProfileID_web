import React, { useState } from "react";

const initialFormData = Object.freeze({
  age: "",
  address: "",
  lastName: "",
  firstName: "",
  nationality: "",
  residence: "",
  nin: ""
});

const FormData = ({
  onSubmit,
  captureImageFile,
  captureDocument,
  getResult
}) => {
  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = e => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
    getResult(formData);
  };

  return (
    <form onSubmit={onSubmit}>
      <br />
      <div className="row">
        <div className="col-md-3">
          <label id="firstName">First Name </label>
        </div>
        <div className="col-md-9">
          <input
            id="firstName"
            name="firstName"
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={handleChange}
          />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-3">
          <label id="lastName">Last Name </label>
        </div>

        <div className="col-md-9">
          <input
            id="lastName"
            name="lastName"
            type="text"
            className="form-control"
            placeholder="Last name"
            onChange={handleChange}
          />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-3">
          <label id="Nationality">Nationality </label>
        </div>
        <div className="col-md-9">
          <input
            id="Nationality"
            name="nationality"
            type="text"
            className="form-control"
            placeholder="Nationality"
            onChange={handleChange}
          />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-3">
          <label id="Nationality">National ID No </label>
        </div>
        <div className="col-md-9">
          <input
            type="text"
            name="nin"
            className="form-control"
            placeholder="NIN"
            onChange={handleChange}
          />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-3">
          <label id="age">Date of Birth</label>
        </div>
        <div className="col-md-9">
          <input
            type="date"
            name="age"
            className="form-control"
            placeholder="Date of Birth"
            onChange={handleChange}
          />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-3">
          <label for="exampleInputAddress">Email Address</label>
        </div>
        <div className="col-md-9">
          <input
            type="address"
            name="address"
            id="exampleInputAddress"
            className="form-control"
            placeholder="Enter address"
            onChange={handleChange}
          />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-3">
          <label id="residence">Residence</label>
        </div>
        <div className="col-md-9">
          <input
            id="residence"
            type="text"
            name="residence"
            className="form-control"
            placeholder="Residence"
            onChange={handleChange}
          />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-3">
          <label id="uploadDocumet">Upload Proof Document</label>
        </div>
        <div className="col-md-9">
          <input
            type="file"
            id="uploadDocument"
            className="form-control-inline"
            onChange={captureDocument}
          />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-3">
          <label id="uploadID">Upload User Photo</label>
        </div>

        <div className="col-md-9">
          <input
            type="file"
            id="uploadID"
            className="form-control-inline"
            onChange={captureImageFile}
          />
        </div>
      </div>
      <hr />
      <input type="submit" value="submit" />
    </form>
  );
};

export { FormData };
