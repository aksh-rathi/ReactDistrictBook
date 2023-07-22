import React from "react";

import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "./ChildTable.css";

export const ChildTable = ({ rows, deleteRow, editRow }) => {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>FatherName</th>
            <th>MotherName</th>
            <th>Tehsil</th>
            <th>District</th>
            <th className="expand">DOB</th>
            <th>Status</th>
            <th>Actions</th>
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
                <td>{row.tehsil}</td>
                <td>{row.district}</td>
                <td className="expand" align="center">{age}</td>
                <td>
                  <span className={`label label-${row.status}`}>
                    {statusText}
                  </span>
                </td>
                <td className="fit">
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
