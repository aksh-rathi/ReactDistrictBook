import React, { useState } from "react";

import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      name: "",
      fatherName:"",
      motherName:"",
      tehsil: "",
      district: "",
      dob: new Date("1990-01-01").toISOString().split('T')[0],
      status: "married",
    }
  );
  const [errors, setErrors] = useState("");
  const validateForm = () => {
    if (formState.name && formState.fatherName && formState.motherName && formState.district && formState.dob && formState.status) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };

  const DOB = formState.dob ? new Date(formState.dob).toISOString().split('T')[0] : null;
  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}>
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input name="name" onChange={handleChange} value={formState.name} />
          </div>
          <div className="form-group">
            <label htmlFor="fatherName">FatherName</label>
            <input name="fatherName" onChange={handleChange} value={formState.fatherName} />
          </div>
          <div className="form-group">
            <label htmlFor="motherName">MotherName</label>
            <input name="motherName" onChange={handleChange} value={formState.motherName} />
          </div>
          <div className="form-group">
            <label htmlFor="tehsil">Tehsil</label>
            <input name="tehsil" onChange={handleChange} value={formState.tehsil} />
          </div>
          <div className="form-group">
            <label htmlFor="district">District</label>
            <input name="district" onChange={handleChange} value={formState.district} />
          </div>
          <div className="form-group">
            <label htmlFor="dob">DOB</label>
            <input
              name="dob"
              type="date"
              onChange={handleChange} value={DOB}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              onChange={handleChange}
              value={formState.status}
            >
              <option value="divorced">Divorced</option>
              <option value="married">Married</option>
              <option value="unmarried">Unmarried</option>
            </select>
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
