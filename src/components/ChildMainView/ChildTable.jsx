import React from "react";

import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "./ChildTable.css";

export const ChildTable = ({ rows, deleteRow, editRow }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>FatherName</th>
            <th>MotherName</th>
            <th>Age</th>
            <th>Relation</th>
            <th>Education</th>
            <th>Profession</th>
            <th>Status</th>
            {isLoggedIn ?(<th>Actions</th>):(<th/>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const statusText =
              row.status.charAt(0).toUpperCase() + row.status.slice(1);
            // const DOB =
            // row.dob ? new Date(row.dob).toLocaleString() : 'N/A';
            const DOB = row.dob ? new Date(row.dob) : null;
            const currentYear = new Date().getFullYear();
            const age = DOB ? currentYear - DOB.getFullYear() : 'N/A';
            return (
              <tr key={idx}>
                <td>{row.name}</td>
                <td>{row.fatherName}</td>
                <td>{row.motherName}</td>
                <td>{age}</td>
                <td>{row.relation}</td>
                <td>{row.education}</td>
                <td>{row.profession}</td>
                <td>
                  <span className={`label label-${row.status}`}>
                    {statusText}
                  </span>
                </td>
                <td className="fit">
                {isLoggedIn ? (
                    <span className="actions">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(idx)}
                    />
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => editRow(idx)}
                    />
                  </span>
                  ) : (
                    <p></p>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
