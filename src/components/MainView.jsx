import { useState,useEffect } from "react";

import "./MainView.css";
import { Table } from "./Table";
import { Modal } from "./Modal";
import {HeaderView} from "./common/Header"

var apiUrl = process.env.REACT_APP_API_URL;
function MainView() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetch(`${apiUrl}/headrecords`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setRows(data))
      .catch((error) => console.error("Error fetching data:", error.message));
  }, []);
  
  const handleDeleteRow = (targetIndex) => {
    const idToDelete = rows[targetIndex].id;
    fetch(`${apiUrl}/records/${idToDelete}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete record");
        }
        return fetch(`${apiUrl}/headrecords`);
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => setRows(data))
      .catch((error) => console.error("Error deleting record:", error));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  // const handleSubmit = (newRow) => {
  //   rowToEdit === null
  //     ? setRows([...rows, newRow])
  //     : setRows(
  //         rows.map((currRow, idx) => {
  //           if (idx !== rowToEdit) return currRow;

  //           return newRow;
  //         })
  //       );
  // };
  const handleSubmit = (newRow) => {
    
    if (rowToEdit === null) {
      newRow.isHead=1;
      // Create a new record
      fetch(`${apiUrl}/records`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRow),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to save record");
          }
          // Refresh the rows after successfully saving the record
          return fetch(`${apiUrl}/headrecords`);
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then((data) => setRows(data))
        .catch((error) => console.error("Error saving record:", error));
    } else {
      // Update an existing record
      const idToUpdate = rows[rowToEdit].id;
      fetch(`${apiUrl}/records/${idToUpdate}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRow),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update record");
          }
          // Refresh the rows after successfully updating the record
          return fetch(`${apiUrl}/headrecords`);
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then((data) => setRows(data))
        .catch((error) => console.error("Error updating record:", error));
    }
  
    // Close the modal and reset rowToEdit after the API call
    setModalOpen(false);
    setRowToEdit(null);
  };
  

  return (
    <div className="App">
      <HeaderView title={"Family Heads Information"} />
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      {isLoggedIn ? (
        <button onClick={() => setModalOpen(true)} className="btn">
          Add
        </button>
      ) : (
        <p></p>
      )}
      {/* <button onClick={() => setModalOpen(true)} className="btn">
        Add
      </button> */}
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}
    </div>
  );
}

export default MainView;
