import React from 'react';
import './Card.css';

export const Card = ({data}) => {
  return (
    <div className="card">
      <table>
        <tbody>
          <tr>
            <td>Name:</td>
            <td>{data.name}</td>
          </tr>
          <tr>
            <td>Father Name:</td>
            <td>{data.fatherName}</td>
          </tr>
          <tr>
            <td>Gotra:</td>
            <td>{data.gotra}</td>
          </tr>
          <tr>
            <td>Mobile Number:</td>
            <td>{data.mobilenumber}</td>
          </tr>
          <tr>
            <td>Main Village:</td>
            <td>{data.village}</td>
          </tr>
          <tr>
            <td>Tehsil:</td>
            <td>{data.tehsil}</td>
          </tr>
          <tr>
            <td>District:</td>
            <td>{data.district}</td>
          </tr>
          <tr>
            <td>Profession:</td>
            <td>{data.profession}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

