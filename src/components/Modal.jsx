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
      gotra: "",
      village: "",
      mvillage: "",
      mobilenumber: "",
      paddress: "",
      raddress: "",
      education: "",
      profession: "",
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
      <div className="modal-wrapper">
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
            <label htmlFor="gotra">Gotra</label>
            <input name="gotra" onChange={handleChange} value={formState.gotra} />
          </div>

          <div className="form-group">
            <label htmlFor="education">Education</label>
            <input name="education" onChange={handleChange} value={formState.education} />
          </div>
          <div className="form-group">
            <label htmlFor="profession">Profession</label>
            <input name="profession" onChange={handleChange} value={formState.profession} />
          </div>
          <div className="form-group">
            <label htmlFor="mobilenumber">Mobile Number</label>
            <input name="mobilenumber" onChange={handleChange} value={formState.mobilenumber} />
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
            <label htmlFor="paddress">Professional address</label>
            <textarea
              name="paddress"
              onChange={handleChange}
              value={formState.paddress}
              rows={3}
            />
          </div>
          <div className="form-group">
            <label htmlFor="raddress">Residential address</label>
            <textarea
              name="raddress"
              onChange={handleChange}
              value={formState.raddress}
              rows={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="mvillage">Main Village</label>
            <input name="mvillage" onChange={handleChange} value={formState.mvillage} />
          </div>
          <div className="form-group">
            <label htmlFor="village">Village</label>
            <input name="village" onChange={handleChange} value={formState.village} />
          </div>
          <div className="form-group">
            <label htmlFor="tehsil">Tehsil</label>
            <input name="tehsil" onChange={handleChange} value={formState.tehsil} />
          </div>
          <div className="form-group">
            <label htmlFor="district">District</label>
            <input name="district" onChange={handleChange} value={formState.district} />
          </div>

          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      
      </div>
      </div>
    </div>
  );
};
