import React, { useState } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "./Table.css";
import { Link } from 'react-router-dom';
const initialSortConfig = {
  key: "",
  direction: "",
};

var itemsPerPage = 5

export const Table = ({ rows, deleteRow, editRow }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState(initialSortConfig);
  const [searchTerm, setSearchTerm] = useState("");

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = rows.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });
  // const handleSort = (key) => {
  //   let direction = "asc";
  //   if (sortConfig.key === key && sortConfig.direction === "asc") {
  //     direction = "desc";
  //   }
  //   setSortConfig({ key, direction });
  // };
  
  // const sortedData = React.useMemo(() => {
  //   if (!sortConfig.key) return rows;
  
  //   const sortedRows = [...rows].sort((a, b) => {
  //     if (a[sortConfig.key] < b[sortConfig.key]) {
  //       return sortConfig.direction === "asc" ? -1 : 1;
  //     }
  //     if (a[sortConfig.key] > b[sortConfig.key]) {
  //       return sortConfig.direction === "asc" ? 1 : -1;
  //     }
  //     return 0;
  //   });
  
  //   return sortedRows;
  // }, [rows, sortConfig]);
  
  const filteredData = sortedData.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRows = filteredData.slice(startIndex, endIndex);

  return (
    <div className="table-wrapper" align="center">
      <div className="table-header">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("fatherName")}>Father Name</th>
            <th onClick={() => handleSort("profession")}>Profession</th>
            <th onClick={() => handleSort("gotra")}>Gotra</th>
            <th onClick={() => handleSort("village")}>Village</th>
            <th onClick={() => handleSort("district")}>District</th>
            <th onClick={() => handleSort("raddress")}>Address</th>
            <th onClick={() => handleSort("dob")}>Age</th>
            <th>Mobile</th>
            {/* <th onClick={() => handleSort("status")}>Status</th> */}
            {isLoggedIn ?(<th>Actions</th>):(<th/>)}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, idx) => {
            const statusText =
              row.status.charAt(0).toUpperCase() + row.status.slice(1);
            const DOB = row.dob ? new Date(row.dob) : null;
            const currentYear = new Date().getFullYear();
            const age = DOB ? currentYear - DOB.getFullYear() : 'N/A';
            return (
              <tr key={idx}>
                <td ><Link to={`/dataTable/${row.id}`}>{row.name}</Link></td>
                <td>{row.fatherName}</td>
                <td>{row.profession}</td>
                <td>{row.gotra}</td>
                <td >{row.village}</td>
                <td >{row.district}</td>
                <td >{row.raddress}</td>
                <td>{age}</td>
                <td>{row.mobilenumber}</td>
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
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

// import React from "react";

// import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
// import { Link } from 'react-router-dom';
// import "./Table.css";

// export const Table = ({ rows, deleteRow, editRow }) => {
//   return (
//     <div className="table-wrapper">
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>FatherName</th>
//             <th>MotherName</th>
//             <th>Tehsil</th>
//             <th>District</th>
//             <th className="expand">DOB</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row, idx) => {
//             const statusText =
//               row.status.charAt(0).toUpperCase() + row.status.slice(1);
//             const DOB = row.dob ? new Date(row.dob) : null;
//             const currentYear = new Date().getFullYear();
//             const age = DOB ? currentYear - DOB.getFullYear() : 'N/A';
//             return (
              // <tr key={idx}>
              //   <td><Link to={`/dataTable/${row.id}`}>{row.name}</Link></td>
              //   <td>{row.fatherName}</td>
              //   <td>{row.motherName}</td>
              //   <td>{row.tehsil}</td>
              //   <td>{row.district}</td>
              //   <td className="expand" align="center">{age}</td>
              //   <td>
              //     <span className={`label label-${row.status}`}>
              //       {statusText}
              //     </span>
              //   </td>
              //   <td className="fit">
              //     <span className="actions">
              //       <BsFillTrashFill
              //         className="delete-btn"
              //         onClick={() => deleteRow(idx)}
              //       />
              //       <BsFillPencilFill
              //         className="edit-btn"
              //         onClick={() => editRow(idx)}
              //       />
              //     </span>
              //   </td>
              // </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };



