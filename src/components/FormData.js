import React, { useState } from "react";

const initialFormData = Object.freeze({
  name: "",
  age: "",
  address: ""
});

const FormData = ({ onSubmit, captureFile }) => {
  const [formData, updateFormData] = useState(initialFormData);
  //   const [buffer, setBuffer] = useState("");

  const handleChange = e => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
  };

  //   const handleSubmit = e => {
  //     e.preventDefault();
  //     console.log(formData);
  //     // ... submit to API or something
  //   };

  /*const captureFile = event => {
    event.preventDefault();
    console.log("file Uploaded");
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    try {
      reader.onloadend = () => {
        setBuffer(Buffer(reader.result));
        console.log("buffer:->", buffer);
      };
    } catch (error) {
      console.error(error);
    }
  };*/

  return (
    /* <>
      <button onClick={handleSubmit}>Submit</button>
    </> */
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="form-group">
        <label id="name">Name: </label>
        <input
          type="text "
          className="form-control-inline"
          name="name"
          id="name"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label for="age">Date of Birth: </label>
        <input
          type="date"
          name="age"
          id="age"
          className="form-control-inline"
          placeholder="Date of Birth"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label for="exampleInputAddress">Address: </label>
        <input
          type="email"
          className="form-control-inline"
          id="exampleInputAddress"
          name="address"
          onChange={handleChange}
          placeholder="Enter address"
        />
      </div>
      <div className="form-group">
        <input
          type="file"
          className="form-control-inline"
          onChange={captureFile}
        />
      </div>

      <input type="submit" value="submit" />
    </form>
  );
};

export { FormData };
